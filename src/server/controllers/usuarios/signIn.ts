import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { usuariosProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { passwordCrypto } from "../../shared/utils/passwordCrypto";
import { JWTService } from "../../shared/utils/JWT";

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
  const usuario = await usuariosProvider.getByEmail(email);

  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: {
        default: "email ou senha incorretos",
      },
    });
  }
  const passwordMath = await passwordCrypto.verifyPassword(
    senha,
    usuario.senha
  );

  if (!passwordMath) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: {
        default: "email ou senha incorretos",
      },
    });
  } else {
    const accessToken = JWTService.signIn({ uid: usuario.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND")
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        erros: {
          default: "Erro ao gerar token",
        },
      });

    return res.status(StatusCodes.OK).json({
      accessToken,
    });
  }
};
