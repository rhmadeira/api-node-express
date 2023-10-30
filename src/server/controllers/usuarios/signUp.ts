import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { usuariosProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IUsuario, "id"> {}

export const validateSignUp = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().required().min(6).email(),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signUp = async (
  req: Request<any, any, IBodyProps>,
  res: Response
) => {
  const result = await usuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
