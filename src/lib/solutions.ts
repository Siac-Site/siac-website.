export interface Solution {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  includes: string[];
  outcome: string;
  context: string;
}

export const SOLUTIONS: Solution[] = [
  {
    id: "01",
    slug: "erp-critico",
    title: "ERP Crítico",
    description:
      "Quando o ERP para, a operação para. Cuidamos de banco de dados, infraestrutura e monitoramento para que ele nunca seja o motivo da parada.",
    image: "/images/placeholders/erp-dashboard.jpg",
    includes: [
      "Administração de banco de dados (DBA) e SysOps",
      "Infraestrutura e cloud dedicadas ao ERP",
      "Monitoramento contínuo do ambiente",
      "Continuidade operacional planejada",
    ],
    outcome:
      "Estabilidade e performance: o ERP deixa de ser o motivo da parada.",
    context:
      "Para empresas em que o ERP sustenta faturamento, produção ou distribuição, disponibilidade não é apenas uma meta técnica. É uma condição para o negócio continuar operando.",
  },
  {
    id: "02",
    slug: "resiliencia-cibernetica",
    title: "Resiliência Cibernética",
    description:
      "Reduzir exposição e tempo de recuperação é o que sustenta a confiança no sistema. Cuidamos do monitoramento, backup, proteção e melhoria contínua dos controles.",
    image: "/images/placeholders/cyber-resilience-server.jpg",
    includes: [
      "Monitoramento contínuo de ameaças",
      "Backup e recuperação de desastres (DR)",
      "Proteção e hardening de controles",
      "Melhoria contínua da postura de segurança",
    ],
    outcome:
      "Menos exposição e menos tempo de recuperação quando um incidente acontece.",
    context:
      "Resiliência combina prevenção, visibilidade e capacidade real de recuperação. O objetivo é reduzir o impacto operacional de incidentes e manter as decisões apoiadas em evidência.",
  },
  {
    id: "03",
    slug: "operacao-de-ti",
    title: "Operação de TI",
    description:
      "Para quem precisa de alguém cuidando continuamente, não apenas quando algo quebra. Suporte, NOC e governança com responsabilidade contínua sobre o ambiente.",
    image: "/images/placeholders/it-operations-noc.jpg",
    includes: [
      "Suporte e NOC com responsabilidade contínua",
      "Um único responsável pelo ambiente (owner)",
      "Governança e backlog tratado de forma proativa",
      "Atuação preventiva, não só corretiva",
    ],
    outcome:
      "Previsibilidade e foco: alguém cuidando do ambiente todos os dias, não só quando quebra.",
    context:
      "Uma operação crítica precisa de acompanhamento contínuo, prioridades claras e responsabilidade definida. A SIAC assume a jornada para que a equipe do cliente mantenha o foco no negócio.",
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
