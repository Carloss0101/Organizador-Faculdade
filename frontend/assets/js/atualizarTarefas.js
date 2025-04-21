import gerarMensagemNaTela from "./mensagens.js";
import { calcularDataAtual } from "./controleMes.js";
import alternarStatusConclusao from "./alterarStatus.js";

export default async function atualizarTarefas(id, dataMes) {

  console.log('Atualizar:' + id, dataMes)
  try {
    const resposta = await fetch(
      `http://localhost:8080/tarefas/${id}/${dataMes}`
    );
    const resultado = await resposta.json();

    if (resposta.ok) {
      console.log("Resposta da api recebida: ", resultado.mensagem);
      gerarMensagemNaTela(resultado.mensagem, "green");

      console.log(resultado);

      //Limpa o conteúdo dos itens anteriores
      document.getElementById("res-prova").innerHTML = "";
      document.getElementById("res-trabalho").innerHTML = "";

      const { dataAtualFormatada } = calcularDataAtual();

      // Ordenar as tarefas pela data 
      resultado.tarefas.sort(
        (a, b) =>
          new Date(a.dados.data.split("/").reverse().join("-")) -
          new Date(b.dados.data.split("/").reverse().join("-"))
      );

      // Adicionar as tarefas ordenadas ao DOM
      resultado.tarefas.forEach((tarefa) => {
        const trabalhoItem = document.createElement("div");
        trabalhoItem.classList.add("item");

        //Verifica se o item foi concluído
        if (tarefa.dados.concluido) {
          trabalhoItem.classList.add("concluido-item");
        }
        
        const titulo = document.createElement("p");
        titulo.textContent = `${tarefa.dados.materia}: ${tarefa.dados.titulo}`;
        trabalhoItem.appendChild(titulo);

        const infoDiv = document.createElement("div");

        const icon = document.createElement("i");
        icon.classList.add(
          "bi",
          tarefa.dados.concluido ? "bi-check-square-fill" : "bi-square",
          "text-white",
          "fs-2"
        );
        icon.addEventListener('click',() => {
            const NovoStatus = alternarStatusConclusao(tarefa._id, tarefa.dados.concluido, id, dataMes)
            tarefa.dados.concluido = NovoStatus

            if(NovoStatus) {//true
              icon.classList.remove("bi-square")
              icon.classList.add("bi-check-square-fill")
            } else {
              icon.classList.remove("bi-check-square-fill")
              icon.classList.add("bi-square")
            }
        })
        infoDiv.appendChild(icon);

        const data = document.createElement("p");
        data.textContent = tarefa.dados.data;
        infoDiv.appendChild(data);

        //Verifica se o item está atrasado
        if (new Date(tarefa.dados.data) < new Date(dataAtualFormatada) && !tarefa.dados.concluido) {
          console.log('1 item atrasado')
          trabalhoItem.classList.add("atrasado-item");
        }
        trabalhoItem.appendChild(infoDiv);
        document.getElementById(`res-${tarefa.tipo}`).appendChild(trabalhoItem);
      });
    } else {
      gerarMensagemNaTela(`[ERRO] ${resultado.mensagem}`, "red");
      console.log(resposta);
    }
  } catch (error) {
    console.error("Algo deu errado na requisição: ", error);
  }
}
