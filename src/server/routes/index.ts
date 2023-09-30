import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "Hello World" });
});

router.post(
  "/cidades",
  cidadesController.createValidate,
  cidadesController.create
);
router.get(
  "/cidades",
  cidadesController.getAllValidate,
  cidadesController.getAll
);
router.get(
  "/cidades/:id",
  cidadesController.getByIdValidate,
  cidadesController.getById
);
router.put(
  "/cidades/:id",
  cidadesController.updateValidate,
  cidadesController.updateById
);
router.delete(
  "/cidades/:id",
  cidadesController.deleteValidate,
  cidadesController.deleteById
);

export { router };
