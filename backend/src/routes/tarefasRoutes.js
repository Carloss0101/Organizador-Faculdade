import express from "express";

import * as tarefasController from "../controllers/tarefasController.js";
import {validarLogin} from "../middlewares/validarLoginMiddleware.js"

const router = express.Router();

router.post("/", validarLogin, tarefasController.criarTarefa);

router.put("/status/:id/:status", validarLogin, tarefasController.atualizarStatusTarefa);

router.get("/:mes", validarLogin, tarefasController.listarTarefaByMes);


export default router;

