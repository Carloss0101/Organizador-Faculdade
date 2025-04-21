require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

const validarInformacoesCadastros = require("./src/components/validarCadastro");
const { verificarLogin, buscarTarefas, alterarStatusTarefa } = require("./db");
const checarToken = require('./src/components/checarToken')
const validarTarefa = require('./src/components/validarTarefa')
const htmlRoutes = require('./src/rotas/htmlRotas.js');


//Limite o limite de requisições por IP de usuário.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000, // limita cada IP a 100 requisições por janela
    message: "Muitas requisições vindas deste IP, tente novamente mais tarde."
  });
  
  app.use(limiter); //aplica em todas as rotas


//Aceita somente respostas em JSON
app.use(express.json()); 

//Adicione o middleware cookie-parser
app.use(cookieParser());

//Bloquea o acesso de outros sites
app.use(cors({ origin: "http://127.0.0.1:5500" })); 

//Rota Privada - acesso somente com token
app.get("/user/:id", checarToken, async (req, res) => {
    
    res.status(200).json({ mensagem: "Rota privada" });
})

app.post("/auth/register", async (req, res) => {
    
    const {status, mensagem} = await validarInformacoesCadastros(req.body)
    res.status(status).json({mensagem: mensagem})
});

app.post("/auth/login", async (req, res) => {
    
    const {email, senha} = req.body
    const {status, mensagem, idUser} = await verificarLogin(email, senha, res)
    res.status(status).json({mensagem: mensagem, idUser: idUser});
});

app.post("/tarefas/criar", async (req, res) => {
    const {status, mensagem} = await validarTarefa(req.body);
    console.log(status, mensagem);
    res.status(status).json({mensagem: mensagem});
});

app.get("/tarefas/:id/:data", async (req, res) => {
  const { id, data } = req.params;

  const resultado = await buscarTarefas({ id, data });

  res.status(resultado.status).json({ mensagem: resultado.mensagem, tarefas: resultado.tarefas });
});

app.get("/tarefas/status/:id/:status", async (req, res) => {
  const { id, status } = req.params;

  const resultado = await alterarStatusTarefa(id, status)

  res.status(resultado.status).json({ mensagem: resultado.mensagem});
});


//Rotas 
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'assets')));

app.get('/index', checarToken, (req, res) => {
    const filePath = path.join(__dirname, '..', 'frontend', 'index.html');
    res.sendFile(filePath);
  })
app.use('/', htmlRoutes);  

app.listen(port, () => {
  console.log(`Servidor Executando em http://localhost:${port}`);
});
