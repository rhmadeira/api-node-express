import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  cidadesController,
  pessoasController,
  usuariosController,
} from "../controllers";

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
  cidadesController.updateByIdValidate,
  cidadesController.updateById
);
router.delete(
  "/cidades/:id",
  cidadesController.deleteValidate,
  cidadesController.deleteById
);

router.post(
  "/pessoas",
  pessoasController.createValidate,
  pessoasController.create
);
router.get(
  "/pessoas",
  pessoasController.getAllValidate,
  pessoasController.getAll
);
router.get(
  "/pessoas/:id",
  pessoasController.getByIdValidate,
  pessoasController.getById
);
router.put(
  "/pessoas/:id",
  pessoasController.updateByIdValidate,
  pessoasController.updateById
);
router.delete(
  "/pessoas/:id",
  pessoasController.deleteByIdValidade,
  pessoasController.deleteById
);

router.post(
  "/entrar",
  usuariosController.validateSignIn,
  usuariosController.signIn
);
router.post(
  "/cadastrar",
  usuariosController.validateSignUp,
  usuariosController.signUp
);

export { router };
