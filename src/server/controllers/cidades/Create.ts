import { Request, Response } from "express";
import { ICidade } from "../../types/cidades";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

export const createValidate = validation((getSchema) => ({
  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

export const create = async (
  req: Request<any, any, ICidade>,
  res: Response
) => {
  return res.status(StatusCodes.CREATED).json(1);
};
