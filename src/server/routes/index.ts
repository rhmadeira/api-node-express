import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post("/teste", (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
