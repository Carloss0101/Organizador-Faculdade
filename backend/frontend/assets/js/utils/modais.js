import { adicionarTarefa } from "../services/tarefasService.js";

export function abrirModalTarefa(idUser, tipo) {
  const existente = document.getElementById("modal-overlay");
  if (existente) existente.remove();

  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";

  const modal = document.createElement("div");
  modal.id = "modal";

  const titulo = document.createElement("h1");
  titulo.textContent = tipo === "prova" ? "Cadastrar Prova" : "Cadastrar Trabalho";

  const form = document.createElement("div");
  form.className = "modal-form";

  const inputMateria = document.createElement("input");
  inputMateria.type = "text";
  inputMateria.placeholder = "Nome da matéria";
  inputMateria.maxLength = 30;

  const inputTitulo = document.createElement("input");
  inputTitulo.type = "text";
  inputTitulo.placeholder = tipo === "prova" ? "Nome da prova" : "Nome do trabalho";
  inputTitulo.maxLength = 30;

  const inputData = document.createElement("input");
  inputData.type = "date";

  const btnContainer = document.createElement("div");
  btnContainer.className = "modal-buttons";

  const btnCancelar = document.createElement("button");
  btnCancelar.textContent = "Cancelar";

  const btnSalvar = document.createElement("button");
  btnSalvar.textContent = "Cadastrar";

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

    await adicionarTarefa(idUser, materia, titulo, tipo, data);

    overlay.remove();
  });

  btnContainer.append(btnCancelar, btnSalvar);
  form.append(inputMateria, inputTitulo, inputData);
  modal.append(titulo, form, btnContainer);
  overlay.appendChild(modal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}