import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPass}@projetofaculdade.pgwgeav.mongodb.net/meu_banco?retryWrites=true&w=majority&appName=ProjetoFaculdade`;

// Conexão com o MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
