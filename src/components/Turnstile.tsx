"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileAPI = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window { turnstile?: TurnstileAPI }
}

export function Turnstile({ onToken, resetKey }: {
  onToken: (token: string) => void;
  resetKey: number;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState<"compact" | "flexible">("compact");

  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect.width >= 300 ? "flexible" : "compact");
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [siteKey]);

  useEffect(() => {
    if (!ready || !siteKey || !container.current || !window.turnstile) return;
    const api = window.turnstile;
    let id: string | undefined;
    onToken("");
    setFailed(false);
    try {
      id = api.render(container.current, {
        sitekey: siteKey,
        action: "contact",
        theme: "auto",
        size,
        language: "pt-br",
        "response-field": false,
        callback: (token: string) => { setFailed(false); onToken(token); },
        "expired-callback": () => onToken(""),
        "timeout-callback": () => onToken(""),
        "error-callback": () => { onToken(""); setFailed(true); },
      });
    } catch {
      setFailed(true);
    }
    return () => { if (id) api.remove(id); };
  }, [ready, siteKey, onToken, resetKey, size]);

  if (!siteKey) {
    return <p role="status" className="text-sm">Formulário indisponível. Entre em contato pelo e-mail ou WhatsApp.</p>;
  }
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
        onError={() => { setFailed(true); onToken(""); }}
      />
      <div ref={container} className={`w-full ${size === "compact" ? "min-h-[140px]" : "min-h-[65px]"}`} />
      {failed && <p role="alert" className="text-sm">Não foi possível verificar sua conexão. Recarregue a página ou use nossos canais diretos.</p>}
    </>
  );
}
