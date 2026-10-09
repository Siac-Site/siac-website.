/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: "/sobre",
        destination: "/#manifesto",
        permanent: true,
      },
      {
        source: "/servicos",
        destination: "/solucoes",
        permanent: true,
      },
      {
        source: "/servicos/siac-cloud",
        destination: "/solucoes/erp-critico",
        permanent: true,
      },
      {
        source: "/servicos/siac-dba-sysops",
        destination: "/solucoes/erp-critico",
        permanent: true,
      },
      {
        source: "/servicos/siac-it-services",
        destination: "/solucoes/operacao-de-ti",
        permanent: true,
      },
      {
        source: "/servicos/siac-drive-cloud",
        destination: "/solucoes/resiliencia-cibernetica",
        permanent: true,
      },
      {
        source: "/servicos/:path*",
        destination: "/solucoes",
        permanent: true,
      },
      {
        source: "/cases",
        destination: "/#casos-de-sucesso",
        permanent: true,
      },
      {
        source: "/cases/:path*",
        destination: "/#casos-de-sucesso",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
