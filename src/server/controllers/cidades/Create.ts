import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Created" });
};

export const teste = async (req: Request, res: Response) => {
  return;
};
