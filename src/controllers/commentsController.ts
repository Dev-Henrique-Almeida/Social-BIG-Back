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
    parentCommentId?: string;
    userId?: string;
  };
};

type LikeRequest = FastifyRequest & {
  params: GenericParams;
  body: {
    userId: string;
  };
};

export class CommentController {
  async create(request: BodyRequest, reply: FastifyReply) {
    const { content, authorId, postId, parentCommentId } = request.body;

    try {
      const comment = await prismaClient.comment.create({
        data: {
          content,
          authorId,
          postId,
          parentCommentId,
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

  async like(request: LikeRequest, reply: FastifyReply) {
    const { id: commentId } = request.params;
    const { userId } = request.body;

    const existingLike = await prismaClient.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (existingLike) {
      await prismaClient.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      const comment = await prismaClient.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });

      return reply.status(200).send(comment);
    } else {
      await prismaClient.commentLike.create({
        data: {
          userId,
          commentId,
        },
      });

      const comment = await prismaClient.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });

      return reply.status(200).send(comment);
    }
  }
}
