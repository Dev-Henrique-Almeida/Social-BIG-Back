import * as yup from "yup";

export const CreateCommentSchema = {
  body: yup
    .object({
      content: yup.string().required(),
      authorId: yup.string().required(),
      postId: yup.string().required(),
      parentCommentId: yup.string().optional(),
    })
    .required(),
};

export const UpdateCommentSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      content: yup.string(),
    })
    .required(),
};

export const LikeCommentSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      userId: yup.string().required(),
    })
    .required(),
};

export const UnlikeCommentSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      userId: yup.string().required(),
    })
    .required(),
};
