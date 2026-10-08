# Contato: Turnstile e SMTP

O formulario faz POST para /api/contact. O servidor valida campos, tamanho,
origem, honeypot e o token Turnstile antes de enviar pelo SMTP. O destinatario
e fixo: comercial@siactecnologia.com.br. O e-mail do visitante e usado somente
em Reply-To. Nao existe resposta automatica ao visitante.

## Cloudflare e Vercel

1. Criar um widget Turnstile no painel da Cloudflare, modo Managed. O plano
   gratuito atende este uso; nao e necessario mudar DNS ou hospedagem.
2. Cadastrar os hostnames reais utilizados: dominio proprio e endereco
   estavel do projeto Vercel. Nao cadastrar URLs com caminhos.
3. Cadastrar na Vercel as variaveis de .env.example. A site key e publica;
   a secret key e as credenciais SMTP sao somente do servidor.
4. CONTACT_ALLOWED_ORIGINS deve conter as origens EXATAS, por exemplo
   https://site.example,https://projeto.vercel.app (sem barra final).
   Cada origem precisa ter seu hostname autorizado no Turnstile.
5. SMTP_FROM deve ser uma caixa autorizada pelo SMTP. SMTP_PORT aceita 465
   com TLS imediato ou 587 com STARTTLS obrigatorio. Certificados invalidos
   nao sao aceitos. O SMTP deve ser acessivel a partir da Vercel.
6. Fazer um novo deploy apos configurar as variaveis. NEXT_PUBLIC_* e
   incorporado no build; trocar somente o valor sem rebuild nao basta.
7. Em Preview, usar configuracoes de teste isoladas; nao reutilizar SMTP de
   producao em testes automatizados. URLs temporarias nao sao automaticamente
   autorizadas. Sem configuracao, o envio fica bloqueado.

## Diagnostico SMTP

Falhas de envio exibem uma referencia limitada a codigos conhecidos, como
SMTP_EAUTH (autenticacao), SMTP_ETIMEDOUT (tempo esgotado), SMTP_EDNS (DNS),
SMTP_ETLS (TLS) e SMTP_EENVELOPE (remetente/destinatario). SMTP_UNKNOWN indica
uma falha nao classificada. A referencia orienta a investigacao, nao confirma
sozinha a causa. O log contact_delivery_failed inclui apenas essa referencia,
o comando SMTP permitido e um codigo numerico de rejeicao, quando disponivel.
Nunca registrar senha, token, dados do formulario ou resposta SMTP completa.
Conferir a caixa de destino antes de repetir um envio com falha ambigua.

## Limite de volume

Turnstile reduz automacao, mas nao define uma cota de mensagens. Complementar
com uma regra no Vercel Firewall para POST /api/contact, limitada por IP
(ponto inicial sugerido: 5 tentativas por minuto, ajustar para redes compartilhadas).
Consultar disponibilidade e cobranca no plano antes de ativar. Esta regra
e configurada no painel e NAO e criada por este patch. Para ataques distribuidos,
configurar tambem uma cota global de envio na conta SMTP e monitorar rejeicoes.
Nao usar contador em memoria como limite global em funcoes serverless.

## Validacao antes de publicar

- Executar `node --experimental-strip-types --test tests/contact.test.mjs`
  com Node 22.18+ ou 24, `npm run lint` e `npm run build`.
- Em ambiente de teste: concluir Turnstile, enviar mensagem e verificar
  recebimento e Reply-To na caixa comercial.
- Tentar token ausente, vencido e repetido: nenhum e-mail deve ser enviado.
- Testar falha do SMTP, widget bloqueado e celular: exibir erro, permitir
  nova verificacao e nao exibir confirmacao falsa.
- Confirmacao no site significa aceite pelo SMTP, nao entrega garantida
  na caixa de entrada. Em falhas de rede ambiguas, conferir a caixa antes
  de reenviar; nao ha fila nem deduplicacao persistente entre tokens diferentes.
- Revisar a politica de privacidade para informar o processamento tecnico
  antiautomacao pela Cloudflare e os fornecedores de comunicacao utilizados.

Os testes automatizados usam respostas simuladas, sem Cloudflare real ou
envio de e-mail. Chaves de teste oficiais nao devem ser usadas em producao.

## Referencias

- https://developers.cloudflare.com/turnstile/plans/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
- https://nodemailer.com/smtp
