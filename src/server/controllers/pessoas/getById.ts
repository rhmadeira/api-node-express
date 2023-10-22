import { Request, Response } from "express";
import { pessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";

interface IParams {
  id?: number;
}

export const getByIdValidate = validation((getSchema) => ({
  params: getSchema<IParams>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
}));

export const getById = async (
  req: Request<IParams, any, IPessoa, any>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "Id is required",
      },
    });
  }

  const result = await pessoasProvider.getById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(404).send(result.message);
  }

  return res.status(StatusCodes.OK).send(result);
};
