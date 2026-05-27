import express from "express";

import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/cadastro", authController.register);

router.post("/login", authController.login);

export default router;