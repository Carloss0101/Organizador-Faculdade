import express from "express";
import multer from "multer";
import * as tarefasController from "../controllers/tarefasController.js";
import { uploadPlanejamento } from "../controllers/planejamentoController.js"; 
import { validarLogin } from "../middlewares/validarLoginMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/criar", validarLogin, tarefasController.criarTarefa);

router.patch("/status/:id/:status", validarLogin, tarefasController.atualizarStatusTarefa);

router.get("/:mes", validarLogin, tarefasController.listarTarefaByMes);

router.delete("/:id", validarLogin, tarefasController.deletarTarefa);

router.put("/:id", validarLogin, tarefasController.editarTarefa);

router.post("/upload-planejamento", validarLogin, upload.single("planejamento"), uploadPlanejamento);

export default router;

