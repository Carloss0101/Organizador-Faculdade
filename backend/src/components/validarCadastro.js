const { verificarCadastroExistente } = require("../../db");

function validarInformacoesCadastros(dado) {
  console.log("Tipo de dado:", typeof dado);
  console.log("Valor de dado:", dado);

  //Só permite a entrada de objetos preenchidos
  if (!dado || typeof dado !== "object") {
    return { status: 400, mensagem: "Dados inválidos" };
  }
  //Valida se todos os itens são strings e foram preenchidos
  if (!dado.nome || !dado.email || !dado.senha) {
    return { status: 422, mensagem: "Dados incompletos" };
  }
  //Confere o formato do email: true ou false;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dado.email);

  if (!emailValido) {
    return { status: 422, mensagem: "Email inválido" };
  }
  if (!dado.senha || dado.senha.length > 20) {
    return { status: 422, mensagem: "Senha inválida" };
  }

  return verificarCadastroExistente(dado);
}

module.exports = validarInformacoesCadastros;
