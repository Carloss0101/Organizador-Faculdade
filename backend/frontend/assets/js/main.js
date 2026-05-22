import { calcularDataAtual, passarMes, voltarMes } from "./utils/controleMes.js";
import { abrirModalTarefa } from "./utils/modais.js";
import { atualizarTarefas } from "./services/tarefasService.js";

const idUser = localStorage.getItem("idUser");

document.addEventListener("DOMContentLoaded", async () => {
  const { nomeMes, numeroMes } = calcularDataAtual();

  document.getElementById("titulo-mes").textContent = nomeMes;

  await atualizarTarefas(idUser, numeroMes);
});

document.getElementById("passarMes").addEventListener("click", () => {
  document.getElementById("titulo-mes").textContent = passarMes(idUser);
});

document.getElementById("voltarMes").addEventListener("click", () => {
  document.getElementById("titulo-mes").textContent = voltarMes(idUser);
});

document.getElementById("adicionarTrabalho").addEventListener("click", () => {
  abrirModalTarefa(idUser, "trabalho");
});

document.getElementById("adicionarProva").addEventListener("click", () => {
  abrirModalTarefa(idUser, "prova");
});