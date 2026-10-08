import nodemailer from "nodemailer";
import { handleContact } from "@/lib/contact";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  const port = Number(SMTP_PORT);
  if (!SMTP_HOST || ![465, 587].includes(port) || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
    return Response.json({ error: "Contato indisponível no momento. Use nossos canais diretos." }, {
      status: 503, headers: { "Cache-Control": "no-store" },
    });
  }
  return handleContact(request, {
    secret: process.env.TURNSTILE_SECRET_KEY ?? "",
    allowedOrigins: (process.env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    fetch,
    send: async (contact) => {
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: true,
        auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 10000,
        dnsTimeout: 5000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      try {
        const result = await transport.sendMail({
          from: { name: "Site SIAC", address: SMTP_FROM },
          to: "comercial@siactecnologia.com.br",
          replyTo: { name: contact.name, address: contact.email },
          subject: "Novo contato pelo site SIAC",
          text: `Nome: ${contact.name}\nE-mail: ${contact.email}\nTelefone: ${contact.phone}\nEmpresa: ${contact.company}\n\n${contact.message}`,
        });
        if (!result.accepted.length) throw new Error("Recipient rejected");
      } finally {
        transport.close();
      }
    },
  });
}
