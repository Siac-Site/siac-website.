import { handleContact } from "@/lib/contact";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM?.trim() || "Site SIAC <contato@envios.siac.tech>";
  if (!apiKey) {
    return Response.json({ error: "Contato indisponível no momento. Use nossos canais diretos." }, {
      status: 503, headers: { "Cache-Control": "no-store" },
    });
  }
  return handleContact(request, {
    secret: process.env.TURNSTILE_SECRET_KEY ?? "",
    allowedOrigins: (process.env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    fetch,
    send: async (contact) => {
      let response: Response;
      try {
        response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: ["comercial@siactecnologia.com.br"],
            reply_to: contact.email,
            subject: `Novo contato SIAC - ${contact.interest}`,
            text: `Nome: ${contact.name}\nE-mail: ${contact.email}\nTelefone: ${contact.phone || "Não informado"}\nEmpresa: ${contact.company}\nÁrea de interesse: ${contact.interest}\n\nDesafio atual:\n${contact.message}`,
          }),
          signal: AbortSignal.timeout(10000),
          cache: "no-store",
        });
      } catch {
        throw { provider: "RESEND" };
      }
      if (!response.ok) {
        throw { provider: "RESEND", status: response.status };
      }
    },
  });
}
