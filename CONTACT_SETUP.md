# Contato: Turnstile e Resend

O formulario faz POST para /api/contact. O servidor valida campos, tamanho,
origem, honeypot e o token Turnstile antes de enviar pela API do Resend. O destinatario
e fixo: comercial@siactecnologia.com.br. O e-mail do visitante e usado somente
em Reply-To. Nao existe resposta automatica ao visitante.

## Cloudflare e Vercel

1. Criar um widget Turnstile no painel da Cloudflare, modo Managed. O plano
   gratuito atende este uso; nao e necessario mudar DNS ou hospedagem.
2. Cadastrar os hostnames reais utilizados: dominio proprio e endereco
   estavel do projeto Vercel. Nao cadastrar URLs com caminhos.
3. Cadastrar na Vercel as variaveis de .env.example. A site key e publica;
   a secret key do Turnstile e RESEND_API_KEY sao somente do servidor.
4. CONTACT_ALLOWED_ORIGINS deve conter as origens EXATAS, por exemplo
   https://site.example,https://projeto.vercel.app (sem barra final).
   Cada origem precisa ter seu hostname autorizado no Turnstile.
5. Verificar envios.siac.tech no Resend e usar um remetente desse dominio.
   O padrao e Site SIAC <contato@envios.siac.tech>; RESEND_FROM permite alterar
   esse valor sem mudar o codigo.
6. Fazer um novo deploy apos configurar as variaveis. NEXT_PUBLIC_* e
   incorporado no build; trocar somente o valor sem rebuild nao basta.
7. Em Preview, usar configuracoes de teste isoladas; nao reutilizar a chave do
   Resend de producao em testes automatizados. URLs temporarias nao sao automaticamente
   autorizadas. Sem configuracao, o envio fica bloqueado.

## Diagnostico de entrega

Falhas da API exibem referencias como RESEND_HTTP_401, RESEND_HTTP_422,
RESEND_HTTP_429 ou RESEND_NETWORK. DELIVERY_UNKNOWN indica uma falha nao
classificada. A referencia orienta a investigacao, nao confirma sozinha a causa.
O log contact_delivery_failed inclui apenas essa referencia e o status HTTP,
quando disponivel. Nunca registrar chave, token, dados do formulario ou a
resposta completa do provedor.
Conferir a caixa de destino antes de repetir um envio com falha ambigua.

## Limite de volume

Turnstile reduz automacao, mas nao define uma cota de mensagens. Complementar
com uma regra no Vercel Firewall para POST /api/contact, limitada por IP
(ponto inicial sugerido: 5 tentativas por minuto, ajustar para redes compartilhadas).
Consultar disponibilidade e cobranca no plano antes de ativar. Esta regra
e configurada no painel e NAO e criada por este patch. Para ataques distribuidos,
configurar tambem uma cota global de envio na conta Resend e monitorar rejeicoes.
Nao usar contador em memoria como limite global em funcoes serverless.

## Validacao antes de publicar

- Executar `node --experimental-strip-types --test tests/contact.test.mjs`
  com Node 22.18+ ou 24, `npm run lint` e `npm run build`.
- Em ambiente de teste: concluir Turnstile, enviar mensagem e verificar
  recebimento e Reply-To na caixa comercial.
- Tentar token ausente, vencido e repetido: nenhum e-mail deve ser enviado.
- Testar falha do Resend, widget bloqueado e celular: exibir erro, permitir
  nova verificacao e nao exibir confirmacao falsa.
- Confirmacao no site significa aceite pelo Resend, nao entrega garantida
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
- https://resend.com/docs/api-reference/emails/send-email
