import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/providers/cidades";

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

export const getById = async (req: Request<IParams>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "Id is required",
      },
    });
  }

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
