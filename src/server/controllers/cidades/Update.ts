import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";

interface IParams {
  id: number;
}

interface IBodyProps extends Omit<ICidade, "id"> {}

export const updateValidate = validation((getSchema) => ({
  params: getSchema<IParams>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().min(3).required(),
    })
  ),
}));

export const update = async (
  req: Request<IParams, any, IBodyProps>,
  res: Response
) => {
  return res.status(StatusCodes.OK).send(StatusCodes.NO_CONTENT);
};
