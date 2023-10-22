import { Request, Response } from "express";
import { pessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IParams {
  id?: number;
}

export const deleteByIdValidade = validation((getSchema) => ({
  params: getSchema<IParams>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
}));

export const deleteById = async (req: Request<IParams>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "Id is required",
      },
    });
  }
  const result = await pessoasProvider.deleteById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(404).send(result.message);
  }

  return res.status(StatusCodes.OK).send(result);
};
