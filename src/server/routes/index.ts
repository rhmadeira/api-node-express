import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesController, pessoasController } from "../controllers";

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

//teste de rota
router.get("/theme", (req, res) => {
  return res.status(StatusCodes.OK).json({
    mode: "light",
    primary: {
      main: "#2196f3",
      dark: "#1e88e5",
      light: "#eef2f6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#673ab7",
      dark: "#4527a0",
      light: "#ede7f6",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00e676",
      dark: "#388e3c",
      light: "#b9f6ca",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      dark: "#c62828",
      light: "#ffcdd2",
    },
    warning: {
      main: "#ffe57f",
      dark: "#ffc107",
      light: "#fff8e1",
    },
    grey: {
      "50": "#f8fafc",
      "100": "#eef2f6",
      "200": "#e3e8ef",
      "300": "#cdd5df",
      "500": "#697586",
      "600": "#4b5565",
      "700": "#364152",
      "900": "#121926",
    },
    background: {
      default: "#cdd5df",
      paper: "#ffffff",
    },
  });
});

export { router };
