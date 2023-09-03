import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { ICidade } from "../../types/cidades";
import { Request, Response } from "express";

interface IParams {
  id: number;
}

export const updateValidate = validation((getSchema) => ({
  params: getSchema<IParams>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().min(3).required(),
    })
  ),
}));

export const update = async (
  req: Request<any, any, ICidade>,
  res: Response
) => {
  return res.status(500).json("não implementado");
};
