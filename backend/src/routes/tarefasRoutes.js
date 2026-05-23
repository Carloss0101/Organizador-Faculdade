import express from "express";

import * as tarefasController from "../controllers/tarefasController.js";
import {validarLogin} from "../middlewares/validarLoginMiddleware.js"

const router = express.Router();

router.post("/criar", validarLogin, tarefasController.criarTarefa);

router.patch("/status/:id/:status", validarLogin, tarefasController.atualizarStatusTarefa);

router.get("/:mes", validarLogin, tarefasController.listarTarefaByMes);

router.delete("/:id", validarLogin, tarefasController.deletarTarefa);

router.put("/:id", validarLogin, tarefasController.editarTarefa);


export default router;

