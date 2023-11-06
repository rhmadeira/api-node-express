import { RequestHandler } from "express";

export const ensuresAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      erros: { default: "Token não informado" },
    });
  }

  const [, token] = authorization.split(" ");

  if (token !== "123456") {
    return res.status(401).json({
      erros: { default: "Token inválido" },
    });
  }

  return next();
};
