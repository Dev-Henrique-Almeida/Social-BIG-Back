import * as yup from "yup";

export const LikePostSchema = {
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

export const CreatePostSchema = {
  body: yup
    .object({
      text: yup.string().required(),
      location: yup.string(),
      image: yup.string(),
      authorId: yup.string().required(),
    })
    .required(),
};

export const UpdatePostSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      text: yup.string(),
      location: yup.string(),
      image: yup.string(),
    })
    .required(),
};

export const GetPostSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
};
