import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { pessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IQueryParams {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidate = validation((getSchema) => ({
  params: getSchema<IQueryParams>(
    yup.object().shape({
      page: yup.number().integer().moreThan(0).default(1),
      limit: yup.number().integer().moreThan(0).default(7),
      filter: yup.string().default(""),
    })
  ),
}));

export const getAll = async (
  req: Request<any, any, IPessoa, IQueryParams>,
  res: Response
) => {
  const result = await pessoasProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || ""
  );
  const count = await pessoasProvider.count(req.query.filter || "");

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
