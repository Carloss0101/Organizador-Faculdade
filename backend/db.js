const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const criarAutenticacaoToken = require('./src/components/criarAutenticacaoToken')

// Credenciais
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// URI do MongoDB Atlas
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

//Models
const User = require("./src/models/user");
const Tarefa = require("./src/models/Tarefa");


// Função para verificar se o usuário já está cadastrado
async function verificarCadastroExistente(dado) {
  const usuarioExistente = await User.findOne({ email: dado.email });

  if (!usuarioExistente) {
    return criarNovoUsuario(dado);
  }

  return {
    status: 422,
    mensagem: "Por favor, utilize outro email!",
  };
}

async function criarNovoUsuario(dado) {
  //Criando a senha criptografada
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(dado.senha, salt);

  //Criando usuário
  const usuario = new User({
    nome: dado.nome,
    email: dado.email,
    senha: passwordHash,
  });

  try {
    await usuario.save();

    return { status: 201, mensagem: "Usuário criado com sucesso." }
  } catch (error) {
    console.log("Erro na criação de usuário:", error)
    return {status:500, mensagem:"Ocorreu um erro no servidor, tente novamente mais tarde!"} 
  }
}

async function verificarLogin(email, senha,res) {
  console.log(email, senha)
  
  if(!email || !senha) {
    return {status: 422, mensagem: "Email e senha são obrigatórios!"}
  }

  //checa se o usuário existe
  const usuario = await User.findOne({ email: email })
  if(!usuario) {
    return {status: 422, mensagem: "Email ou senha inválido"}
  }

  //checa se a senha está correta
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
  if (!senhaCorreta) {
    {return {status: 422, mensagem: "Email ou senha inválido"}}
  }

  //Se senha e email estão correto o token é criado.
  return criarAutenticacaoToken(usuario.id, res)
}

async function criarTarefa(dado) {
  const novaTarefa = new Tarefa({
    userId: dado.id,
    tipo: dado.tipo, // 'prova' ou 'trabalho'   
    dados: {
      materia: dado.materia,
      titulo: dado.titulo || '',
      data: dado.data,
      concluido: false //por padrao é false
    }
  });
  
  try {
    await novaTarefa.save();
  
    return {status:201, mensagem:"Tarefa criada com sucesso."}
  } catch (error) {
    console.log("Erro ao criar a tarefa:", error)
  
    return {status:500, mensagem:"Ocorreu um erro no servidor, tente novamente mais tarde!"}
  }
}

async function buscarTarefas(dado) {
  if(!dado || !dado.id || !dado.data) {
    return {status:401, mensagem:"Dados inválidos."}
  }
  console.log(dado)
  if(dado.data < 1 || dado.data > 12) {
    return {status:401, mensagem:"Mês inválido."}
  }
  if (!mongoose.Types.ObjectId.isValid(dado.id)) {
    return {status:401, mensagem:"ID inválido."}
  }

  try {
    const tarefas = await Tarefa.find({
      userId: dado.id,
      "dados.data": {
        $regex: `^\\d{4}-${String(dado.data).padStart(2, "0")}-`,
      },
    });
    return { status: 200, mensagem:'Tarefas atualizadas.', tarefas };
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
    return { status: 500, mensagem: "Ocorreu um erro no servidor, tente novamente mais tarde!" };
  }

}

async function alterarStatusTarefa(idTarefa, status) {
  if (!mongoose.Types.ObjectId.isValid(idTarefa)) {
    return {status:401, mensagem:"ID inválido."}
  }
  if(status != 'true' && status != 'false') {
    return {status:401, mensagem:"status inválido."}
  }
  const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
    idTarefa,
    { "dados.concluido": status }, // atualiza o campo
  );

  if(!tarefaAtualizada) {
    return {status: 401, mensagem:"Tarefa não localizada"}
  }

  return {status: 200, mensagem:"Status alterado"}
}


module.exports = { verificarCadastroExistente, verificarLogin, criarTarefa, buscarTarefas, alterarStatusTarefa };
