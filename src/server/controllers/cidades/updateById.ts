import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";
import { cidadesProvider } from "../../database/providers/cidades";

interface IParams {
  id?: number;
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

export const updateById = async (
  req: Request<IParams, any, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "Id is required",
      },
    });
  }

  const result = await cidadesProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).send(StatusCodes.NO_CONTENT);
};
