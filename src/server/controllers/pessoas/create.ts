import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { pessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const createValidate = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
      sobreNome: yup.string().required(),
      email: yup.string().required().email(),
      cidadeId: yup.number().integer().moreThan(0).required(),
    })
  ),
}));

export const create = async (
  req: Request<any, any, IPessoa>,
  res: Response
) => {
  const result = await pessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(400).json({
      erros: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
