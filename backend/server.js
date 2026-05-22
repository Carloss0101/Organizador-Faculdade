import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import "./db.js";

import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/authRoutes.js";
import tarefasRoutes from "./src/routes/tarefasRoutes.js";
import pagesRoutes from "./src/routes/pagesRoutes.js";


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 1000, 
    message: "Muitas requisições vindas deste IP, tente novamente mais tarde."
});

const app = express();
const port = 8080;

app.use(limiter);
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:8080/" })); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));


app.use("/api/auth", authRoutes);
app.use("/api/tarefas", tarefasRoutes);
app.use("/", pagesRoutes);


app.listen(port, () => {
  console.log(`Servidor Executando em http://localhost:${port}`);
});
