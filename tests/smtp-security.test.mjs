import assert from "node:assert/strict";
import { test } from "node:test";
import { smtpSecurity } from "../src/lib/smtp-security.ts";

const now = Date.parse("2026-10-08T17:00:00Z");
const secure587 = { secure: false, requireTLS: true, ignoreTLS: false };

for (const expiry of [undefined, "", "invalid", "2026-10-08T16:59:59Z", "2026-10-08T17:00:00Z"]) {
  test(`requires STARTTLS with absent, invalid or expired override: ${expiry}`, () => {
    assert.deepEqual(smtpSecurity(587, expiry, now), secure587);
  });
}

test("explicit temporary override disables STARTTLS only before its deadline", () => {
  const expiry = "2026-10-08T17:15:00Z";
  assert.deepEqual(smtpSecurity(587, expiry, now), {
    secure: false, requireTLS: false, ignoreTLS: true,
  });
  assert.deepEqual(smtpSecurity(587, expiry, now + 15 * 60_000), secure587);
});

test("port 465 always uses TLS even with a temporary override", () => {
  assert.deepEqual(smtpSecurity(465, "2026-10-08T17:15:00Z", now), {
    secure: true, requireTLS: true, ignoreTLS: false,
  });
});
