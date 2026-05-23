import { excluirTarefa } from "../services/tarefasService.js";
import { abrirModalTarefa } from "./modais.js";

export function abrirMenuTarefa(x, y, tarefa, idUser, dataMes) {
  const existente = document.getElementById("context-menu");

  if (existente) {
    existente.remove();
  }

  const menu = document.createElement("div");
  menu.id = "context-menu";

  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;

  const editar = document.createElement("button");
  editar.textContent = "Editar";

  const excluir = document.createElement("button");
  excluir.textContent = "Excluir";

  editar.addEventListener("click", () => {
    abrirModalTarefa(idUser, tarefa.tipo, tarefa);
    menu.remove();
  });

  excluir.addEventListener("click", async () => {
    await excluirTarefa(tarefa._id, idUser, dataMes);
    menu.remove();
  });

  menu.append(editar, excluir);

  document.body.appendChild(menu);

  setTimeout(() => {
    document.addEventListener(
      "click",
      () => menu.remove(),
      { once: true }
    );
  }, 0);
}