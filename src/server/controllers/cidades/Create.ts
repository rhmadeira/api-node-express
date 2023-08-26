import { Request, Response } from "express";
import { ICidade } from "../../types/cidades";
import * as yup from "yup";

const schemaCreate: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const create = async (
  req: Request<any, any, ICidade>,
  res: Response
) => {
  let cidade: ICidade | undefined = req.body;

  try {
    cidade = await schemaCreate.validate(req.body, { abortEarly: false });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: { [key: string]: string } = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });
    return res.status(400).json({
      errors,
    });
  }

  return res.status(200).json(cidade);
};
