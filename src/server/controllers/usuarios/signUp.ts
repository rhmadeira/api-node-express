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
      nome: yup.string().required(),
      email: yup.string().required().email(),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signUp = async (
  req: Request<any, any, IUsuario>,
  res: Response
) => {
  const result = await usuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(400).json({
      erros: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).send();
};
