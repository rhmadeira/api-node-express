import { Request, Response } from "express";
import { pessoasProvider } from "../../database/providers/pessoas";
import { IPessoa } from "../../database/models";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const updateByIdValidate = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0).required(),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
      sobreNome: yup.string().required(),
      email: yup.string().email().required(),
      cidadeId: yup.number().integer().moreThan(0).required(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamsProps, any, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "Id is required",
      },
    });
  }
  const result = await pessoasProvider.updateById(
    Number(req.params.id),
    req.body
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(StatusCodes.NO_CONTENT);
};
