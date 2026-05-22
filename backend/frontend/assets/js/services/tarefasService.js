import { criarTarefa, buscarTarefas, alterarStatus } from "../api/api.js";
import gerarMensagemNaTela from "../services/mensagensService.js";
import { calcularDataAtual } from "../utils/controleMes.js";

export async function adicionarTarefa(id, nomeMateria, titulo, tipo, data) {
  const dados = { id, tipo, materia: nomeMateria, titulo, data };

  const { status } = await criarTarefa(dados);

  if (status === 201) {
    const { numeroMes } = calcularDataAtual();
    await atualizarTarefas(id, numeroMes);
  }
}

export async function alternarStatusConclusao(idTarefa, statusAtual, idUser, dataMes) {
  try {
    const { ok, resultado } = await alterarStatus(idTarefa, !statusAtual);

    if (ok) {
      console.log(resultado.mensagem);
      await atualizarTarefas(idUser, dataMes);
      return !statusAtual;
    }

    return statusAtual;
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return statusAtual;
  }
}

export async function atualizarTarefas(id, dataMes) {
  try {
    const { ok, resultado } = await buscarTarefas(dataMes);

    if (!ok) {
      gerarMensagemNaTela(`[ERRO] ${resultado.mensagem}`, "red");
      return;
    }

    gerarMensagemNaTela(resultado.mensagem, "green");

    document.getElementById("res-prova").innerHTML = "";
    document.getElementById("res-trabalho").innerHTML = "";

    const { dataAtualFormatada } = calcularDataAtual();

    resultado.tarefas.sort((a, b) =>
      new Date(a.dados.data.split("/").reverse().join("-")) -
      new Date(b.dados.data.split("/").reverse().join("-"))
    );

    resultado.tarefas.forEach((tarefa) => {
      const item = document.createElement("div");
      item.classList.add("item");

      if (tarefa.dados.concluido) item.classList.add("concluido-item");

      const titulo = document.createElement("p");
      titulo.textContent = `${tarefa.dados.materia}: ${tarefa.dados.titulo}`;
      item.appendChild(titulo);

      const infoDiv = document.createElement("div");

      const icon = document.createElement("i");
      icon.classList.add("bi", tarefa.dados.concluido ? "bi-check-square-fill" : "bi-square", "text-white", "fs-2");

      icon.addEventListener("click", async () => {
        const novoStatus = await alternarStatusConclusao(tarefa._id, tarefa.dados.concluido, id, dataMes);

        tarefa.dados.concluido = novoStatus;

        icon.classList.toggle("bi-check-square-fill", novoStatus);
        icon.classList.toggle("bi-square", !novoStatus);
      });

      infoDiv.appendChild(icon);

      const data = document.createElement("p");
      data.textContent = tarefa.dados.data;
      infoDiv.appendChild(data);

      if (new Date(tarefa.dados.data) < new Date(dataAtualFormatada) && !tarefa.dados.concluido) {
        item.classList.add("atrasado-item");
      }

      item.appendChild(infoDiv);
      document.getElementById(`res-${tarefa.tipo}`).appendChild(item);
    });
  } catch (error) {
    console.error("Algo deu errado na requisição:", error);
  }
}