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
    text: string;
    location: string;
    image?: string;
    authorId: string;
  };
};

type LikeRequest = FastifyRequest & {
  params: GenericParams;
  body: {
    userId: string;
  };
};

export class PostController {
  async create(request: BodyRequest, reply: FastifyReply) {
    const { text, location, image, authorId } = request.body;

    const post = await prismaClient.post.create({
      data: {
        text,
        location,
        image,
        authorId,
      },
    });

    return reply.status(201).send(post);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const posts = await prismaClient.post.findMany({
      include: {
        author: {
          select: {
            image: true,
            name: true,
            id: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                image: true,
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return reply.status(200).send(posts);
  }

  async getById(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    try {
      const post = await prismaClient.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              image: true,
              name: true,
              id: true,
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  image: true,
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      if (!post) {
        return reply.status(404).send({ message: "Post not found!" });
      }
      return reply.status(200).send(post);
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error fetching post, try again!" });
    }
  }

  async update(request: BodyRequest, reply: FastifyReply) {
    const { id } = request.params;
    const { text, location, image } = request.body;

    const post = await prismaClient.post.update({
      where: {
        id,
      },
      data: {
        text,
        location,
        image,
      },
    });

    return reply.status(200).send(post);
  }

  async like(request: LikeRequest, reply: FastifyReply) {
    const { id: postId } = request.params;
    const { userId } = request.body;

    const existingLike = await prismaClient.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await prismaClient.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      const post = await prismaClient.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return reply.status(200).send(post);
    } else {
      await prismaClient.postLike.create({
        data: {
          userId,
          postId,
        },
      });

      const post = await prismaClient.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return reply.status(200).send(post);
    }
  }

  async delete(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    try {
      await prismaClient.$transaction([
        prismaClient.comment.deleteMany({
          where: {
            postId: id,
          },
        }),
        prismaClient.postLike.deleteMany({
          where: {
            postId: id,
          },
        }),
        prismaClient.post.delete({
          where: {
            id,
          },
        }),
      ]);
      return reply.status(200).send({ message: "Post deleted!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error deleting post, try again!" });
    }
  }
}
