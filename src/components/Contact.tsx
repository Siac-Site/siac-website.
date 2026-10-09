"use client";

import { ChevronDown, Headphones, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Turnstile } from "@/components/Turnstile";

export function Contact() {
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !token) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    inFlight.current = true;
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fields), token }),
        signal: AbortSignal.timeout(35000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a mensagem.");
      form.reset();
      setStatus("Mensagem enviada. Nossa equipe entrará em contato.");
    } catch (error) {
      setStatus(error instanceof Error && error.name !== "TimeoutError"
        ? error.message
        : "Não foi possível confirmar o envio. Use nossos canais diretos ou tente mais tarde.");
    } finally {
      inFlight.current = false;
      setSending(false);
      setToken("");
      setResetKey((value) => value + 1);
    }
  }
  return (
    <section
      id="contato"
      className="relative scroll-mt-28 overflow-hidden py-lg"
    >
      <div className="relative mx-auto grid max-w-[1200px] gap-2xl px-sm md:grid-cols-2 md:items-start md:px-lg">
        {/* Coluna esquerda */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-graphite/50 dark:text-brand-ice/50">
            ENTRE EM CONTATO
          </p>
          <h2 className="mt-sm text-2xl font-bold leading-tight text-brand-graphite dark:text-brand-ice md:text-4xl">
            Receba o contato de nossos especialistas
          </h2>
          <p className="mt-md max-w-md text-base text-brand-graphite/70 dark:text-brand-ice/70 md:text-lg">
            Não espere o próximo incidente. Preencha o formulário e nossa
            engenharia entrará em contato para estruturar a segurança e
            continuidade da sua operação.
          </p>
          <a
            href={`https://wa.me/552740421758?text=${encodeURIComponent("Olá, já sou cliente SIAC e preciso de suporte.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-md inline-flex items-center gap-xs text-sm font-semibold text-brand-primary transition-colors ease-brand hover:text-brand-primary-dark"
          >
            <Headphones size={17} aria-hidden="true" />
            Já é cliente? Fale com o suporte 24/7
          </a>
        </div>

        {/* Coluna direita — formulário */}
        <form
          onSubmit={submit}
          className="min-w-0 rounded-card-lg border border-white/60 bg-white/50 p-lg backdrop-blur-glass dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex flex-col gap-md">
            <Field label="Nome completo" htmlFor="name">
              <input
                id="name"
                name="name"
                required
                maxLength={120}
                autoComplete="name"
                type="text"
                placeholder="Seu nome"
                className={inputClasses}
              />
            </Field>

            <div className="grid gap-md sm:grid-cols-2">
              <Field label="E-mail" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={inputClasses}
                />
              </Field>
              <Field label="Telefone/WhatsApp (opcional)" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  maxLength={40}
                  autoComplete="tel"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className={inputClasses}
                />
              </Field>
            </div>

            <Field label="Empresa" htmlFor="company">
              <input
                id="company"
                name="company"
                required
                maxLength={160}
                autoComplete="organization"
                type="text"
                placeholder="Nome da empresa"
                className={inputClasses}
              />
            </Field>

            <Field label="Área de interesse" htmlFor="interest">
              <div className="relative">
                <select
                  id="interest"
                  name="interest"
                  required
                  defaultValue=""
                  className={`${inputClasses} appearance-none pr-xl`}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="ERP Crítico">ERP Crítico</option>
                  <option value="Resiliência Cibernética">Resiliência Cibernética</option>
                  <option value="Operação de TI">Operação de TI</option>
                  <option value="Diagnóstico ou projeto">Diagnóstico ou projeto</option>
                  <option value="Outro">Outro</option>
                </select>
                <ChevronDown
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-md top-1/2 -translate-y-1/2 text-brand-graphite/50 dark:text-brand-ice/50"
                />
              </div>
            </Field>

            <Field label="Desafio atual" htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                maxLength={4000}
                placeholder="Conte brevemente sobre seu ambiente, desafio ou risco atual."
                rows={5}
                className={`${inputClasses} resize-none`}
              />
            </Field>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <Turnstile onToken={setToken} resetKey={resetKey} />
            <p role="status" aria-live="polite" className="text-sm">{status}</p>

            <button
              type="submit"
              disabled={!token || sending}
              className="mt-sm flex items-center justify-center gap-xs rounded-button bg-brand-primary px-lg py-sm text-sm font-semibold text-white shadow-level-1 transition-colors ease-brand hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Enviando..." : "Enviar mensagem"}
              <Send size={16} />
            </button>

            <p className="text-center text-xs text-brand-graphite/50 dark:text-brand-ice/50">
              Ao enviar, você concorda com nossa{" "}
              <a
                href="/politica-de-privacidade"
                className="underline decoration-brand-graphite/30 underline-offset-4 transition-colors ease-brand hover:text-brand-primary dark:decoration-brand-ice/30"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

const inputClasses =
  "w-full rounded-input border border-brand-graphite/15 bg-white/80 px-md py-sm text-sm text-brand-graphite placeholder:text-brand-graphite/40 outline-none transition-colors ease-brand focus:border-brand-primary dark:border-white/10 dark:bg-black/30 dark:text-brand-ice dark:placeholder:text-brand-ice/30";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-xs">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-brand-graphite/60 dark:text-brand-ice/60"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
