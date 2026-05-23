import { adicionarTarefa, editarTarefa } from "../services/tarefasService.js";
import { calcularDataAtual } from "./controleMes.js";

export function abrirModalTarefa(idUser, tipo, tarefa = null) {
  const existente = document.getElementById("modal-overlay");
  if (existente) existente.remove();

  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";

  const modal = document.createElement("div");
  modal.id = "modal";

  const tituloModal = document.createElement("h1");
  tituloModal.textContent = tarefa
    ? "Editar Tarefa"
    : tipo === "prova"
      ? "Cadastrar Prova"
      : "Cadastrar Trabalho";

  const form = document.createElement("div");
  form.className = "modal-form";

  const inputMateria = document.createElement("input");
  inputMateria.type = "text";
  inputMateria.placeholder = "Nome da matéria";
  inputMateria.maxLength = 30;
  inputMateria.value = tarefa?.dados.materia || "";

  const inputTitulo = document.createElement("input");
  inputTitulo.type = "text";
  inputTitulo.placeholder =
    tipo === "prova" ? "Nome da prova" : "Nome do trabalho";
  inputTitulo.maxLength = 30;
  inputTitulo.value = tarefa?.dados.titulo || "";

  const inputData = document.createElement("input");
  inputData.type = "date";
  inputData.value = tarefa?.dados.data || "";

  const btnContainer = document.createElement("div");
  btnContainer.className = "modal-buttons";

  const btnCancelar = document.createElement("button");
  btnCancelar.textContent = "Cancelar";

  const btnSalvar = document.createElement("button");
  btnSalvar.textContent = tarefa ? "Salvar" : "Cadastrar";

  btnCancelar.addEventListener("click", () => {
    overlay.remove();
  });

  btnSalvar.addEventListener("click", async () => {
    const materia = inputMateria.value.trim();
    const titulo = inputTitulo.value.trim();
    const data = inputData.value;

    if (!materia || !titulo || !data) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    if (tarefa) {
      const { numeroMes } = calcularDataAtual();

      await editarTarefa(tarefa._id, { materia, titulo, data }, idUser, numeroMes);
    } else {
      await adicionarTarefa(idUser, materia, titulo, tipo, data);
    }

    overlay.remove();
  });

  btnContainer.append(btnCancelar, btnSalvar);
  form.append(inputMateria, inputTitulo, inputData);
  modal.append(tituloModal, form, btnContainer);
  overlay.appendChild(modal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}