export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

type Dependencies = {
  secret: string;
  allowedOrigins: string[];
  fetch: typeof fetch;
  send: (message: ContactMessage) => Promise<void>;
};

const EMAIL = /^[^\s<>(),;:\\"\[\]]+@[^\s<>(),;:\\"\[\]]+\.[^\s<>(),;:\\"\[\]]+$/;
const MAX_BYTES = 24_000;

function deliveryDiagnostic(error: unknown) {
  const detail = error && typeof error === "object"
    ? error as Record<string, unknown> : {};
  // Only allow our own provider marker and an HTTP status into logs or responses.
  const provider = detail.provider === "RESEND" ? "RESEND" : "DELIVERY";
  const status = typeof detail.status === "number" && Number.isInteger(detail.status) &&
    detail.status >= 400 && detail.status <= 599 ? detail.status : null;
  const reference = provider === "RESEND"
    ? status ? `RESEND_HTTP_${status}` : "RESEND_NETWORK"
    : "DELIVERY_UNKNOWN";
  return { reference, status };
}

const reply = (status: number, error?: string) =>
  Response.json(error ? { error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export async function handleContact(request: Request, deps: Dependencies) {
  if (!deps.secret || !deps.allowedOrigins.length) {
    return reply(503, "Contato indisponível no momento. Tente novamente mais tarde.");
  }
  const origin = request.headers.get("origin");
  if (!origin || !deps.allowedOrigins.includes(origin)) {
    return reply(403, "Origem não autorizada.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply(415, "Formato inválido.");
  }

  let data: Record<string, unknown>;
  try {
    // Bound streamed bodies too, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "Preencha o formulário.");
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > MAX_BYTES) {
        await reader.cancel();
        return reply(413, "Mensagem muito longa.");
      }
      chunks.push(chunk.value);
    }
    const buffer = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(buffer));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return reply(400, "Dados inválidos.");
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return reply(400, "Dados inválidos.");
  }

  if (typeof data.website !== "string" || data.website !== "") {
    return reply(400, "Não foi possível enviar o formulário.");
  }
  const limits = { name: 120, email: 254, phone: 40, company: 160, message: 4000 };
  const contact = {} as ContactMessage;
  for (const key of Object.keys(limits) as (keyof ContactMessage)[]) {
    const value = data[key];
    if (typeof value !== "string" || value.length > limits[key] ||
        (key !== "message" && /[\r\n\x00]/.test(value))) {
      return reply(400, "Confira os campos do formulário.");
    }
    contact[key] = value.trim();
  }
  if (!contact.name || !EMAIL.test(contact.email) || !contact.message) {
    return reply(400, "Informe nome, e-mail válido e mensagem.");
  }
  const token = data.token;
  if (typeof token !== "string" || !token || token.length > 2048) {
    return reply(400, "Conclua a verificação de segurança.");
  }

  try {
    const verification = await deps.fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: deps.secret, response: token }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!verification.ok) throw new Error("Verification unavailable");
    const result = await verification.json();
    if (result.success !== true || result.action !== "contact" ||
        result.hostname !== new URL(origin).hostname) {
      return reply(403, "Verificação inválida ou expirada. Tente novamente.");
    }
  } catch {
    return reply(503, "Verificação indisponível. Tente novamente em instantes.");
  }

  try {
    await deps.send(contact);
    return reply(200);
  } catch (error) {
    const diagnostic = deliveryDiagnostic(error);
    console.error("contact_delivery_failed", diagnostic);
    return reply(502, `Não foi possível confirmar o envio. Tente mais tarde ou use nossos canais diretos. Referência: ${diagnostic.reference}.`);
  }
}
