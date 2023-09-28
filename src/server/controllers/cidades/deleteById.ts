import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
interface IParams {
  id: number;
}
export const deleteValidate = validation((getSchema) => ({
  params: getSchema<IParams>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
}));

export const deleteById = async (
  req: Request<any, any, IParams>,
  res: Response
) => {
  return res.status(StatusCodes.NO_CONTENT).send();
};
