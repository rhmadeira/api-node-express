import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

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
  return res.status(StatusCodes.OK).json({
    id: 1,
    nome: "São Paulo",
  });
};
