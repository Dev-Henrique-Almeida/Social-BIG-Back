# Social BIG - Back

Este é um projeto backend desenvolvido para uma rede social, utilizando Node.js, TypeScript e Prisma, com funcionalidades para autenticação, criação de posts, comentários e mais.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
SOCIAL-BIG-BACK
├── prisma
├── src
│   ├── controllers
│   ├── database
│   ├── middleware
│   ├── storage
└── └── validateSchemas
```

A pasta `controllers` contém os arquivos responsáveis por lidar com as requisições HTTP e controlar o fluxo de dados entre o cliente e o servidor.

A pasta `database` contém os arquivos relacionados à configuração e interação com o banco de dados, incluindo as migrações do Prisma e as sementes do banco de dados.

A pasta `middleware` contém os arquivos que implementam middlewares, que são funções que são executadas antes ou depois das requisições HTTP, permitindo a execução de lógica adicional.

A pasta `storage` contém o arquivo relacionado as rotas do projeto, onde você pode importa-las no Insomnia para testar a API.

A pasta `validateSchemas` contém os arquivos responsáveis por validar os esquemas de dados antes de serem salvos no banco de dados.

## Configuração do Ambiente

Antes de iniciar o projeto, é necessário criar um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
DATABASE_URL="postgresql://your-username:your-password@localhost:5432/your-database"
JWT_SECRET=your-jwt-secret
```

> Certifique-se de substituir `your-username`, `your-password` e `your-database` com as suas próprias informações de banco de dados.

## Instalação

Para instalar e executar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/Dev-Henrique-Almeida/Social-Big-Back.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd Social-Big-Back
   ```

3. Crie o arquivo `.env` com as variáveis de ambiente conforme descrito acima.

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Execute as migrações do Prisma para configurar o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

6. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Scripts

- `npx prisma migrate dev`: Executa as migrações do Prisma para configurar o banco de dados.
- `npx prisma studio`: Abre o Prisma Studio, uma interface visual para explorar e gerenciar os dados do banco de dados.
- `npx prisma generate`: Gera o código TypeScript com base no schema do Prisma.
- `npx prisma db seed`: Executa as sementes do banco de dados definidas no arquivo `prisma/seed.ts`.
