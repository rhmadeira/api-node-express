import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { pessoasProvider } from "../../database/providers/pessoas";

export const create = async (
  req: Request<any, any, IPessoa>,
  res: Response
) => {
  const result = await pessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(400).json({
      erros: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
