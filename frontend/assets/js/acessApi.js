import gerarMensagemNaTela from "./mensagens.js";

export default async function acessApi(url, data, method = "POST") {
  try {
    const resposta = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json", // avisa que está mandando JSON
      },
      body: JSON.stringify(data), // transforma o objeto em JSON
    });
    const resultado = await resposta.json();

    if (resposta.ok) {
      console.log("Resposta da api recebida: ", resultado.mensagem);
      gerarMensagemNaTela(resultado.mensagem, "green");
      
      return {status: resposta.status, resultado: resultado}; 

    } else {
      gerarMensagemNaTela(`[ERRO] ${resultado.mensagem}`, "red");
      console.log(resposta);
    }
  } catch (error) {
    console.error("Algo deu errado na requisição: ", error);
  }
}
