import { Request, Response } from "express";
import { ICidade } from "../../types/cidades";

export const create = async (
  req: Request<any, any, ICidade>,
  res: Response
) => {
  const data = req.body;

  return res.status(200).json({ message: "Created" });
};
