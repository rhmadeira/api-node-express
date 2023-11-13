import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../utils/JWT";

export const ensuresAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      erros: { default: "Token não informado" },
    });
  }

  const [, token] = authorization.split(" ");
  const jwtData = JWTService.verify(token);
  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res.status(401).json({
      erros: { default: "Error ao verificar token" },
    });
  } else if (jwtData === "Invalid token") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: { default: "Token inválido" },
    });
  }

  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};
