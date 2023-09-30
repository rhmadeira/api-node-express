import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";
import { cidadesProvider } from "../../database/providers/cidades";

interface IBodyProps extends Omit<ICidade, "id"> {}

export const createValidate = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

export const create = async (
  req: Request<any, any, ICidade>,
  res: Response
) => {
  const result = await cidadesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
