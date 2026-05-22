import { cadastro } from "../../api.js";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const { status, resultado } = await cadastro(data);

      if (status === 201) {
        window.location.href = "/login";
      } else {
        console.error(`[${status}] ${resultado.mensagem}`);
      }
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
    }
  });
});