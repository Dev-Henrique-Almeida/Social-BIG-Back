import cors from "@fastify/cors";
import "dotenv/config";
import Fastify from "fastify";
import { Auth, Comments, MarketItems, Posts, Users } from "./routes";
import { AuthMiddleware } from "./middleware/auth";

export const server = Fastify({
  logger: true,
});

// Configuração CORS
server.register(cors, {
  origin: "*",
});

// Adiciona logs para cada requisição
server.addHook("onRequest", (req, reply, done) => {
  req.log.info(
    { body: req.body, headers: req.headers, params: req.params },
    "received request"
  );
  done();
});

// Middleware de Autenticação
server.addHook("onRequest", AuthMiddleware);

// Adiciona logs para cada resposta
server.addHook("onSend", (req, reply, payload, done) => {
  req.log.info({ payload, statusCode: reply.raw.statusCode }, "response sent");
  done();
});

// Tratamento de erros
server.setErrorHandler((error, req, reply) => {
  reply.send(error);
});

// Rota principal
server.get("/", (request, reply) => {
  return reply.send("Social Compass API");
});

// Registro de rotas
server.register(Auth, { prefix: "/auth" });
server.register(Users, { prefix: "/users" });
server.register(Posts, { prefix: "/posts" });
server.register(Comments, { prefix: "/comments" });
server.register(MarketItems, { prefix: "/market" });

const port = parseInt(process.env.PORT || "3001");

server.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
