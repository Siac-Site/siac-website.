import assert from "node:assert/strict";
import { test } from "node:test";
import { handleContact } from "../src/lib/contact.ts";

const origin = "https://site.example";
const fields = { name: "Teste SIAC", email: "visitor@example.com", phone: "", company: "", message: "Mensagem de teste", website: "", token: "test-token" };
function request(data = fields, headers = {}) {
  return new Request(`${origin}/api/contact`, {
    method: "POST", headers: { origin, "content-type": "application/json", ...headers }, body: JSON.stringify(data),
  });
}
function dependencies(result = { success: true, hostname: "site.example", action: "contact" }) {
  const sent = [];
  const calls = [];
  return {
    secret: "test-only-secret", allowedOrigins: [origin], sent, calls,
    fetch: async (url, init) => { calls.push({ url, init }); return Response.json(result); },
    send: async (data) => { sent.push(data); },
  };
}

test("validates token before sending; ignores injected recipient and extra fields", async () => {
  const deps = dependencies();
  const response = await handleContact(request({ ...fields, to: "attacker@example.com" }), deps);
  assert.equal(response.status, 200);
  assert.equal(deps.calls.length, 1);
  assert.equal(deps.sent.length, 1);
  assert.deepEqual(JSON.parse(deps.calls[0].init.body), { secret: deps.secret, response: fields.token });
  assert.deepEqual(Object.keys(deps.sent[0]), ["name", "email", "phone", "company", "message"]);
});

for (const [label, value] of [
  ["missing token", { token: "" }], ["oversized token", { token: "x".repeat(2049) }],
  ["honeypot", { website: "https://spam.example" }], ["header injection", { email: "a@example.com\r\nBcc: victim@example.com" }],
  ["invalid email", { email: "no-email" }], ["empty name", { name: " " }],
  ["oversized message", { message: "a".repeat(4001) }], ["wrong field type", { phone: [] }],
]) {
  test(`rejects ${label} without verification or SMTP`, async () => {
    const deps = dependencies();
    assert.equal((await handleContact(request({ ...fields, ...value }), deps)).status, 400);
    assert.equal(deps.calls.length, 0);
    assert.equal(deps.sent.length, 0);
  });
}

for (const result of [
  { success: false, "error-codes": ["timeout-or-duplicate"] },
  { success: true, hostname: "attacker.example", action: "contact" },
  { success: true, hostname: "site.example", action: "login" },
]) {
  test(`blocks failed or mismatched verification ${JSON.stringify(result)}`, async () => {
    const deps = dependencies(result);
    assert.equal((await handleContact(request(), deps)).status, 403);
    assert.equal(deps.sent.length, 0);
  });
}

test("missing server configuration fails closed", async () => {
  const deps = dependencies();
  deps.secret = "";
  assert.equal((await handleContact(request(), deps)).status, 503);
  assert.equal(deps.sent.length, 0);
});
test("untrusted origin and wrong content type are rejected before verification", async () => {
  const deps = dependencies();
  assert.equal((await handleContact(request(fields, { origin: "https://attacker.example" }), deps)).status, 403);
  assert.equal((await handleContact(request(fields, { "content-type": "text/plain" }), deps)).status, 415);
  assert.equal(deps.calls.length, 0);
});
test("body size is limited even without Content-Length", async () => {
  const deps = dependencies();
  assert.equal((await handleContact(request({ ...fields, padding: "a".repeat(25000) }), deps)).status, 413);
  assert.equal(deps.calls.length, 0);
});
test("malformed JSON is rejected", async () => {
  const req = new Request(`${origin}/api/contact`, { method: "POST", headers: { origin, "content-type": "application/json" }, body: "{" });
  assert.equal((await handleContact(req, dependencies())).status, 400);
});
test("Cloudflare network failure does not send email", async () => {
  const deps = dependencies();
  deps.fetch = async () => { throw new Error("timeout"); };
  assert.equal((await handleContact(request(), deps)).status, 503);
  assert.equal(deps.sent.length, 0);
});
test("Cloudflare HTTP failure does not send email", async () => {
  const deps = dependencies();
  deps.fetch = async () => new Response("unavailable", { status: 503 });
  assert.equal((await handleContact(request(), deps)).status, 503);
  assert.equal(deps.sent.length, 0);
});
test("SMTP failure never reports success or leaks provider details", async (t) => {
  const log = t.mock.method(console, "error", () => {});
  const deps = dependencies();
  deps.send = async () => { throw new Error("sensitive SMTP detail"); };
  const res = await handleContact(request(), deps);
  assert.equal(res.status, 502);
  assert.doesNotMatch(await res.text(), /sensitive SMTP detail/);
  assert.deepEqual(log.mock.calls[0].arguments, ["contact_delivery_failed", {
    reference: "SMTP_UNKNOWN", command: "UNKNOWN", responseCode: null,
  }]);
});

for (const code of ["EAUTH", "EDNS", "ECONNECTION", "ESOCKET", "ETIMEDOUT", "ETLS", "EENVELOPE", "EMESSAGE", "ESTREAM", "EREQUIRETLS"]) {
  test(`SMTP ${code} exposes only an allowlisted reference`, async (t) => {
    const log = t.mock.method(console, "error", () => {});
    const deps = dependencies();
    deps.send = async () => { throw Object.assign(new Error("private-password"), {
      code, command: "AUTH PLAIN", responseCode: 535, response: "private-address@example.com",
    }); };
    const res = await handleContact(request(), deps);
    assert.equal(res.status, 502);
    const body = await res.text();
    assert.match(body, new RegExp(`SMTP_${code}`));
    assert.doesNotMatch(body, /private-|535|AUTH PLAIN/);
    assert.deepEqual(log.mock.calls[0].arguments, ["contact_delivery_failed", {
      reference: `SMTP_${code}`, command: "AUTH PLAIN", responseCode: 535,
    }]);
  });
}

test("unrecognized SMTP diagnostic fields cannot leak into responses or logs", async (t) => {
  const log = t.mock.method(console, "error", () => {});
  const deps = dependencies();
  deps.send = async () => { throw {
    code: "private-password", command: "AUTH PLAIN private-token", responseCode: "private-response",
  }; };
  const res = await handleContact(request(), deps);
  assert.equal(res.status, 502);
  assert.doesNotMatch(await res.text(), /private-/);
  assert.deepEqual(log.mock.calls[0].arguments, ["contact_delivery_failed", {
    reference: "SMTP_UNKNOWN", command: "UNKNOWN", responseCode: null,
  }]);
});
