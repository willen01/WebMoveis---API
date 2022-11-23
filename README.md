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

| endpoint              | verbo HTTP | Descrição                                                      |
| --------------------- | ---------- | -------------------------------------------------------------- |
| /docs                | GET       | Lista completa de endpoints no swagger                                 |
| /customers/register                  | POST       | cadastro de usuário usuáiro                   |
|/customers/login| POST        | login de usuário cadastrado                         |
| /customers/update-profile | PUT        | atualiza nome do usuário |
| /customers/update-password | PUT        | atualiza senha do usuário |
| /customers/orders | GET        | busca pedidos do usuário |
| /customers/orders/:id | GET        | busca pedidos do usuário por id |
| /products | GET        | busca produtos cadastrados |
| /products/:id | GET        | busca produtos cadastrados por id |
| /categories | GET        | busca categorias cadastradas |
| /orders | POST        | cadastra pedido |

