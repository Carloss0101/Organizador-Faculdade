import { criarTarefa, buscarTarefas, alterarStatus, deletarTarefaApi, editarTarefaApi } from "../api/api.js";
import gerarMensagemNaTela from "../services/mensagensService.js";
import { calcularDataAtual } from "../utils/controleMes.js";
import { abrirMenuTarefa } from "../utils/contextMenu.js";

export async function adicionarTarefa(id, nomeMateria, titulo, tipo, data) {
  const dados = { id, tipo, materia: nomeMateria, titulo, data };

  const { status } = await criarTarefa(dados);

  if (status === 201) {
    const { numeroMes } = calcularDataAtual();
    await atualizarTarefas(id, numeroMes);
  }
}

export async function alternarStatusConclusao(idTarefa, statusAtual, idUser, dataMes) {
  const novoStatus = !statusAtual;

  try {
    const { ok, resultado } = await alterarStatus(idTarefa, novoStatus);

    if (!ok) {
      gerarMensagemNaTela(`[ERRO] ${resultado.mensagem}`, "red");
      return statusAtual;
    }

    await atualizarTarefas(idUser, dataMes);
    return novoStatus;
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return statusAtual;
  }
}

export async function editarTarefa(idTarefa, dados, idUser, dataMes) {
  try {
    const { ok, resultado } = await editarTarefaApi(idTarefa, dados);

    if (!ok) {
      gerarMensagemNaTela(`[ERRO] ${resultado.mensagem}`, "red");
      return false;
    }

    gerarMensagemNaTela(resultado.mensagem, "green");

    await atualizarTarefas(idUser, dataMes);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function excluirTarefa(idTarefa, idUser, dataMes) {
  try {
    const { ok, resultado } = await deletarTarefaApi(idTarefa);

    if (!ok) {
      gerarMensagemNaTela(`[ERRO] ${resultado.mensagem}`, "red");
      return false;
    }

    gerarMensagemNaTela(resultado.mensagem, "green");

    await atualizarTarefas(idUser, dataMes);

    return true;
  } catch (error) {
    console.error(error);
    return false;
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

      const materia = document.createElement("h3");
      materia.textContent = tarefa.dados.materia;

      const descricao = document.createElement("p");
      descricao.textContent = tarefa.dados.titulo;

      item.appendChild(materia);
      item.appendChild(descricao);

      const infoDiv = document.createElement("div");

      const icon = document.createElement("i");
      icon.classList.add("bi", tarefa.dados.concluido ? "bi-check-square-fill" : "bi-square", "text-white", "fs-2");

      let carregando = false;

      icon.addEventListener("click", async () => {
        if (carregando) return;

        carregando = true;

        const novoStatus = !tarefa.dados.concluido;
        tarefa.dados.concluido = novoStatus;

        icon.classList.toggle("bi-check-square-fill", novoStatus);
        icon.classList.toggle("bi-square", !novoStatus);
        item.classList.toggle("concluido-item", novoStatus);

        try {
          await alternarStatusConclusao(tarefa._id, !novoStatus, id, dataMes);
        } finally {
          carregando = false;
        }
      });

      item.addEventListener("contextmenu", (e) => {
        e.preventDefault();
  
        abrirMenuTarefa(e.clientX, e.clientY, tarefa, id, dataMes);
      });

      infoDiv.appendChild(icon);

      const data = document.createElement("p");
      const dataFormatada = new Date(tarefa.dados.data).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      data.textContent = dataFormatada;

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