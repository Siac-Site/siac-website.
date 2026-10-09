export const SITE_URL = "https://www.siac.tech";
export const SITE_NAME = "SIAC Engenharia Digital";
export const SITE_TITLE = "SIAC — Tecnologia crítica sob controle";
export const SITE_DESCRIPTION =
  "Engenharia e operação de tecnologia crítica para ERP, cibersegurança e operações de TI que não podem parar.";
export const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "SIAC — Tecnologia crítica sob controle",
};

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "SIAC Tecnologia",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/brand/logo/siac-logo-dark.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  email: "comercial@siactecnologia.com.br",
  telephone: "+55-27-4042-1758",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Av. Rosendo Serapião de Souza Filho, 595, Ed. Mata da Praia, salas 101 e 102",
    addressLocality: "Vitória",
    addressRegion: "ES",
    postalCode: "29065-020",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+55-27-4042-1758",
    email: "comercial@siactecnologia.com.br",
    availableLanguage: "Portuguese",
  },
  sameAs: ["https://www.linkedin.com/company/siactecnologia/"],
  knowsAbout: [
    "ERP crítico",
    "Banco de dados",
    "Cloud computing",
    "Resiliência cibernética",
    "Operação de TI",
    "Continuidade operacional",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: "SIAC",
  description: SITE_DESCRIPTION,
  inLanguage: "pt-BR",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd],
};
