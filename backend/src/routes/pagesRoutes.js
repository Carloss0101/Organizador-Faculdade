import express from "express";
import { renderPage } from "../controllers/pagesController.js";
import {validarLoginIndex} from "../middlewares/validarLoginMiddleware.js";

const router = express.Router();

//Rotas Públicas
router.get("/", (req, res) => {
  res.redirect("/index");
});

router.get("/login", renderPage);
router.get("/cadastro", renderPage);

//Rotas Privadas
router.get("/index", validarLoginIndex, renderPage);

export default router;