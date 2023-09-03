import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "Hello World" });
});

router.post(
  "/cidades",
  CidadesController.createValidate,
  CidadesController.create
);
router.get(
  "/cidades",
  CidadesController.getAllValidate,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  CidadesController.getByIdValidate,
  CidadesController.getById
);
router.put(
  "/cidades/:id",
  CidadesController.updateValidate,
  CidadesController.update
);
router.delete(
  "/cidades/:id",
  CidadesController.deleteValidate,
  CidadesController.deleteById
);

export { router };
