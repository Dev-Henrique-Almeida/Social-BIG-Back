import { FastifyReply, FastifyRequest } from "fastify";
import prismaClient from "../database/prismaClient";

type GenericParams = {
  id: string;
};

type GenericRequest = FastifyRequest & {
  params: GenericParams;
};

type BodyRequest = FastifyRequest & {
  params: GenericParams;
  body: {
    content: string;
    authorId: string;
    postId: string;
  };
};

export class CommentController {
  async create(request: BodyRequest, reply: FastifyReply) {
    const { content, authorId, postId } = request.body;

    try {
      const comment = await prismaClient.comment.create({
        data: {
          content,
          authorId,
          postId,
        },
      });

      return reply.status(200).send(comment);
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Error creating comment, try again!" });
    }
  }

  async update(request: BodyRequest, reply: FastifyReply) {
    const { id } = request.params;
    const { content } = request.body;

    try {
      const comment = await prismaClient.comment.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });

      return reply.status(200).send(comment);
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Error updating comment, try again!" });
    }
  }

  async delete(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    try {
      await prismaClient.comment.delete({
        where: {
          id,
        },
      });
      return reply.status(200).send({ message: "Comment deleted!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error deleting comment, try again!" });
    }
  }
}
