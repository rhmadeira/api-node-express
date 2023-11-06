import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  cidadesController,
  pessoasController,
  usuariosController,
} from "../controllers";
import { ensuresAuthenticated } from "../shared/middlewares";

const router = Router();

router.get("/", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "Hello World" });
});

router.post(
  "/cidades",
  ensuresAuthenticated,
  cidadesController.createValidate,
  cidadesController.create
);
router.get(
  "/cidades",
  ensuresAuthenticated,
  cidadesController.getAllValidate,
  cidadesController.getAll
);
router.get(
  "/cidades/:id",
  ensuresAuthenticated,
  cidadesController.getByIdValidate,
  cidadesController.getById
);
router.put(
  "/cidades/:id",
  ensuresAuthenticated,
  cidadesController.updateByIdValidate,
  cidadesController.updateById
);
router.delete(
  "/cidades/:id",
  ensuresAuthenticated,
  cidadesController.deleteValidate,
  cidadesController.deleteById
);

router.post(
  "/pessoas",
  ensuresAuthenticated,
  pessoasController.createValidate,
  pessoasController.create
);
router.get(
  "/pessoas",
  ensuresAuthenticated,
  pessoasController.getAllValidate,
  pessoasController.getAll
);
router.get(
  "/pessoas/:id",
  ensuresAuthenticated,
  pessoasController.getByIdValidate,
  pessoasController.getById
);
router.put(
  "/pessoas/:id",
  ensuresAuthenticated,
  pessoasController.updateByIdValidate,
  pessoasController.updateById
);
router.delete(
  "/pessoas/:id",
  ensuresAuthenticated,
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
