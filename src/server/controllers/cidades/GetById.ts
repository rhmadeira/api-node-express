import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/providers/cidades";

interface IQuery {
  id: number;
}

export const getByIdValidate = validation((getSchema) => ({
  params: getSchema<IQuery>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
}));

export const getById = async (
  req: Request<any, any, IQuery>,
  res: Response
) => {
  const result = await cidadesProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
