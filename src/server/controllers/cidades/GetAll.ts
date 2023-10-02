import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";
import { cidadesProvider } from "../../database/providers/cidades";

interface IQueryParams {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidate = validation((getSchema) => ({
  query: getSchema<IQueryParams>(
    yup.object().shape({
      id: yup.number().integer().default(0),
      page: yup.number().min(1),
      limit: yup.number().min(1).max(100),
      filter: yup.string().max(100),
    })
  ),
}));

export const getAll = async (
  req: Request<any, any, ICidade, IQueryParams>,
  res: Response
) => {
  const result = await cidadesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || "",
    Number(req.query.id)
  );
  const count = await cidadesProvider.count(req.query.filter || "");

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: count.message,
      },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);
  return res.status(StatusCodes.OK).send(result);
};
