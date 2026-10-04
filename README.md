# Site institucional — SIAC Engenharia Digital

Site institucional da SIAC (ERP Crítico, Resiliência Cibernética, Operação de TI), construído em Next.js.

**Site em produção:** https://siac-website-main.vercel.app

**Repositório:** https://github.com/Siac-Site/siac-website.

## Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) — tokens de marca (cores, espaçamento, sombras) em `tailwind.config.ts`
- [Framer Motion](https://www.framer.com/motion/) — animações
- [Swiper](https://swiperjs.com) — carrossel de depoimentos
- [next-themes](https://github.com/pacocoursey/next-themes) — modo claro/escuro
- Deploy: [Vercel](https://vercel.com), com deploy automático a cada `git push` na branch `main`

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros comandos úteis:

```bash
npm run build   # build de produção — sempre rode antes de subir uma mudança grande
npm run lint    # checagem de lint
npm run start   # roda o build de produção localmente
```

## Estrutura do projeto

```
src/
  app/
    page.tsx                      # monta a home a partir dos componentes de seção
    politica-de-privacidade/      # página de Política de Privacidade
  components/
    Nav.tsx, Footer.tsx           # navegação (com menu mobile) e rodapé
    Hero.tsx                      # seção inicial (título, vídeo, estatísticas, pilares)
    Manifesto.tsx                 # seção "Quem Somos" / manifesto de marca
    Solutions.tsx                 # seção "Nossas Soluções" (usa ui/elastic-gallery.tsx)
    CycleTimeline.tsx             # seção "Ciclo SIAC" (usa ui/method-cycle.tsx)
    SuccessStories.tsx            # seção "Casos de Sucesso" (usa ui/card-carousel.tsx)
    Partners.tsx                  # faixa de logos de parceiros
    Contact.tsx                   # formulário de contato
    WhatsAppButton.tsx            # botão flutuante do WhatsApp
    ui/                           # componentes menores e reutilizáveis
brand/
  SIAC_Briefing_para_Site.md      # briefing de marca (tom de voz, paleta, posicionamento)
  logo/, partners/, background/   # ativos de marca em SVG/PNG
public/images/placeholders/       # fotos de banco de imagens usadas como placeholder
```

## Pendências conhecidas (placeholders a substituir)

Alguns conteúdos ainda são placeholders temporários, aguardando material final da SIAC:

- **Vídeos institucionais** (Hero e Manifesto): hoje mostram uma imagem estática com um aviso "Vídeo institucional em produção" ao clicar em play (`src/components/ui/video-lightbox.tsx`). Quando o vídeo real existir, trocar o conteúdo desse componente por um `<video>`.
- **Vídeos de depoimentos** (Casos de Sucesso): mesma lógica — hoje mostram uma foto estática com aviso "Vídeo em produção" (`src/components/ui/card-carousel.tsx`). Os nomes de arquivo já esperados estão no array `testimonials` de `src/components/SuccessStories.tsx` (ex: `/videos/testimonials/glaucio-coelho.mp4`) — quando os vídeos existirem, basta colocá-los em `public/videos/testimonials/` e trocar o placeholder pelo `<video>`.
- **Fotos de banco de imagens** em `public/images/placeholders/`: usadas em Hero, Manifesto e nos cards de Soluções até a SIAC entregar fotografia própria.

## Deploy

O projeto já está conectado à Vercel via GitHub: qualquer `git push` na branch `main` gera automaticamente um novo deploy de produção. Não é necessário rodar nenhum comando manual de deploy.

## Segurança — atualização do Next.js recomendada

O projeto está no Next.js 14.2.35 (última versão da linha 14.x). Essa linha tem vulnerabilidades
conhecidas cuja correção só existe na versão 16 (`npm audit` lista os detalhes e CVEs). Na prática,
o risco atual é baixo porque o site é estático — não usa Server Actions, middleware, nem imagens
remotas otimizadas via next/image — que é onde a maioria dessas falhas se explora. Ainda assim, é
uma dívida técnica que vale planejar: atualizar para o Next.js 16 é uma mudança de versão maior
(breaking change), então precisa ser feita com calma e testada seção por seção antes de publicar.

## Manual de marca

Antes de alterar textos, cores ou tom de voz, vale revisar `brand/SIAC_Briefing_para_Site.md` — ele documenta a paleta oficial, tipografia, arquétipo de marca (Sábio) e os pilares de posicionamento (Específica, Responsável, Comprovável) usados em todo o site.
