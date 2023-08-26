import { Request, RequestHandler, Response } from "express";
import { ICidade } from "../../types/cidades";
import * as yup from "yup";
import { Ifilter } from "../../types/default";
import { validation } from "../../shared/middlewares";

export const createValidate = validation((getSchema) => ({
  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<any, any, ICidade>,
  res: Response
) => {
  return res.status(200).json(req.body);
};
