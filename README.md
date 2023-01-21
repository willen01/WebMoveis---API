## webmoveis api: Serviço principal

Aplicação backend para o e-commerce webmoveis--api

### requisitos

- nodejs
- docker compose
- postgres sql

#### incializando aplicação

- instalando dependências: `yarn install`
- rodando migrations: `yarn migrate dev`
- rodando comando de seed: `yarn prisma db seed`

#### endpoints de requisição

| endpoint                   | verbo HTTP | Descrição                              |
| -------------------------- | ---------- | -------------------------------------- |
| /docs                      | GET        | Lista completa de endpoints no swagger |
| /customers/register        | POST       | cadastro de usuário usuáiro            |
| /customers/login           | POST       | login de usuário cadastrado            |
| /customers/update-profile  | PUT        | atualiza nome do usuário               |
| /customers/update-password | PUT        | atualiza senha do usuário              |
| /customers/orders          | GET        | busca pedidos do usuário               |
| /customers/orders/:id      | GET        | busca pedidos do usuário por id        |
| /products                  | GET        | busca produtos cadastrados             |
| /products/:id              | GET        | busca produtos cadastrados por id      |
| /categories                | GET        | busca categorias cadastradas           |
| /orders                    | POST       | cadastra pedido                        |

### Desafios

- [x] Deve calcular o valor de frete direto no backend
- [x] Deve calcular valor da compra no backend
- [X] Deve pedir senha anterior ao trocar de senha
- [x] Deve adcionar novos status de compra além de WaitingForPayment e Paid
- [x] No endpoint de detalhes de pedido deve exibir o link de pagamento caso o pedido ainda não tenha sido pago
- [x] Deve enviar um email quando a senha do usuário é trocada
- [x] Deve remover o próprio produto da lista de produtos relacionados

### Observações
Os trechos de código comentados com `desafio` referem-se a resolução dos desafios propostos
