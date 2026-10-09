import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade — SIAC",
  description:
    "Como a SIAC Engenharia Digital coleta, usa e protege os dados pessoais tratados neste site, em conformidade com a LGPD.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    url: "/politica-de-privacidade",
    title: "Política de Privacidade — SIAC",
    description:
      "Como a SIAC Engenharia Digital coleta, usa e protege os dados pessoais tratados neste site, em conformidade com a LGPD.",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade — SIAC",
    description:
      "Como a SIAC Engenharia Digital coleta, usa e protege os dados pessoais tratados neste site, em conformidade com a LGPD.",
    images: [SOCIAL_IMAGE.url],
  },
};

const SECTIONS = [
  {
    title: "1. Quem somos",
    body: (
      <>
        <p>
          Esta Política de Privacidade se aplica ao site institucional da{" "}
          <strong className="font-semibold">SIAC Engenharia Digital</strong>{" "}
          (&ldquo;SIAC&rdquo;, &ldquo;nós&rdquo;), empresa especializada em
          infraestrutura crítica e continuidade operacional, com sede em
          Vitória/ES. Somos os controladores dos dados pessoais tratados por
          meio deste site, nos termos da Lei nº 13.709/2018 (LGPD).
        </p>
      </>
    ),
  },
  {
    title: "2. Quais dados coletamos",
    body: (
      <>
        <p>Coletamos dados pessoais nas seguintes situações:</p>
        <ul className="mt-sm list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold">Formulário de contato:</strong>{" "}
            nome completo, e-mail, telefone, empresa e o conteúdo da mensagem
            enviada, quando você preenche o formulário na seção &ldquo;Entre
            em Contato&rdquo;.
          </li>
          <li>
            <strong className="font-semibold">Canais diretos:</strong> dados
            que você nos fornece ao entrar em contato por e-mail, telefone ou
            WhatsApp.
          </li>
          <li>
            <strong className="font-semibold">Dados de navegação:</strong>{" "}
            informações técnicas de uso do site (como páginas visitadas e
            preferência de tema claro/escuro), coletadas de forma
            automatizada para o funcionamento e a melhoria da experiência.
          </li>
          <li>
            <strong className="font-semibold">Proteção contra envios automatizados:</strong>{" "}
            usamos o Cloudflare Turnstile no formulário de contato para verificar
            sinais técnicos do navegador e da conexão. A Cloudflare processa
            esses sinais para identificar automação e abuso. O conteúdo dos
            campos do formulário é encaminhado à nossa equipe por e-mail;
            nossa integração não envia esse conteúdo à API de validação do Turnstile.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Para que usamos esses dados",
    body: (
      <>
        <p>Usamos os dados coletados para:</p>
        <ul className="mt-sm list-disc space-y-2 pl-5">
          <li>Responder às solicitações enviadas pelo formulário de contato;</li>
          <li>
            Estruturar e apresentar propostas comerciais sobre nossas
            soluções (ERP Crítico, Resiliência Cibernética e Operação de TI);
          </li>
          <li>Manter contato comercial com clientes e prospects;</li>
          <li>
            Cumprir obrigações legais e regulatórias aplicáveis à nossa
            operação.
          </li>
        </ul>
        <p className="mt-sm">
          Não utilizamos seus dados para finalidades incompatíveis com as
          descritas acima, nem os submetemos a decisões automatizadas que
          afetem seus interesses sem possibilidade de revisão humana.
        </p>
      </>
    ),
  },
  {
    title: "4. Com quem compartilhamos",
    body: (
      <p>
        Não vendemos nem alugamos dados pessoais a terceiros. Podemos
        compartilhar dados estritamente necessários com prestadores de
        serviço que apoiam nossa operação (por exemplo, hospedagem e
        ferramentas de comunicação), sempre sob obrigação contratual de
        confidencialidade e segurança, ou quando exigido por lei, ordem
        judicial ou autoridade competente.
      </p>
    ),
  },
  {
    title: "5. Por quanto tempo guardamos seus dados",
    body: (
      <p>
        Mantemos os dados pessoais pelo tempo necessário para cumprir as
        finalidades descritas nesta política, incluindo eventuais
        obrigações legais, contratuais ou de prestação de contas a
        autoridades, sendo descartados de forma segura quando essa
        necessidade deixar de existir.
      </p>
    ),
  },
  {
    title: "6. Segurança da informação",
    body: (
      <p>
        Como especialistas em infraestrutura crítica, tratamos a proteção de
        dados como parte central da nossa própria atuação: adotamos medidas
        técnicas e organizacionais razoáveis para proteger os dados pessoais
        sob nossa responsabilidade contra acessos não autorizados,
        vazamento, alteração ou destruição indevida.
      </p>
    ),
  },
  {
    title: "7. Seus direitos como titular de dados",
    body: (
      <>
        <p>Nos termos da LGPD, você pode, a qualquer momento, solicitar:</p>
        <ul className="mt-sm list-disc space-y-2 pl-5">
          <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Anonimização, bloqueio ou eliminação de dados desnecessários ou
            tratados em desconformidade com a lei;
          </li>
          <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
          <li>Informação sobre com quem compartilhamos seus dados;</li>
          <li>Revogação do consentimento e eliminação dos dados tratados com base nele.</li>
        </ul>
        <p className="mt-sm">
          Para exercer qualquer um desses direitos, entre em contato pelos
          canais listados na seção 9.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies e tema do site",
    body: (
      <p>
        Este site usa o armazenamento local do seu navegador apenas para
        lembrar sua preferência de modo claro/escuro entre visitas. Essa
        informação fica salva unicamente no seu dispositivo, não é enviada
        aos nossos servidores e pode ser apagada a qualquer momento limpando
        os dados de navegação do seu navegador.
      </p>
    ),
  },
  {
    title: "9. Como falar conosco",
    body: (
      <>
        <p>
          Para dúvidas sobre esta política ou para exercer seus direitos
          como titular de dados, entre em contato:
        </p>
        <ul className="mt-sm space-y-1">
          <li>
            E-mail:{" "}
            <a
              href="mailto:comercial@siactecnologia.com.br"
              className="underline decoration-brand-graphite/30 underline-offset-4 transition-colors ease-brand hover:text-brand-primary dark:decoration-brand-ice/30"
            >
              comercial@siactecnologia.com.br
            </a>
          </li>
          <li>Telefone: (27) 4042-1758</li>
          <li>
            Endereço: Av. Rosendo Serapião de Souza Filho, 595 – Ed. Mata da
            Praia, Salas 101 e 102 – Mata da Praia, Vitória/ES – CEP
            29065-020
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Alterações desta política",
    body: (
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente para
        refletir mudanças em nossas práticas ou na legislação aplicável. A
        data da última atualização é indicada no início desta página.
      </p>
    ),
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="relative scroll-mt-28 px-sm pb-2xl pt-2xl md:px-lg">
        <div className="mx-auto max-w-[760px]">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-graphite/50 dark:text-brand-ice/50">
            SIAC ENGENHARIA DIGITAL
          </p>
          <h1 className="mt-sm text-3xl font-bold text-brand-graphite dark:text-brand-ice md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-sm text-sm text-brand-graphite/60 dark:text-brand-ice/60">
            Última atualização: 7 de outubro de 2026
          </p>

          <div className="mt-2xl flex flex-col gap-xl text-base leading-relaxed text-brand-graphite/80 dark:text-brand-ice/80 md:text-lg">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-bold text-brand-graphite dark:text-brand-ice md:text-xl">
                  {section.title}
                </h2>
                <div className="mt-sm">{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
