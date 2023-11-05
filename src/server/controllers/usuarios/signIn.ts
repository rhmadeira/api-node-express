import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { usuariosProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { passwordCrypto } from "../../shared/utils/passwordCrypto";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const validateSignIn = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(6).email(),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signIn = async (
  req: Request<any, any, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;
  const result = await usuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: {
        default: "email ou senha incorretos",
      },
    });
  }
  const passwordMath = await passwordCrypto.verifyPassword(senha, result.senha);

  if (!passwordMath) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: {
        default: "email ou senha incorretos",
      },
    });
  } else {
    return res.status(StatusCodes.OK).json({
      accessToken: "123456789",
    });
  }
};
