import { login } from "../../api/api.js";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const { status, resultado } = await login(data);

      if (status === 200) {
        localStorage.setItem("idUser", resultado.idUser);

        window.location.href = "/index";
      } else {
        console.error(`[${status}] ${resultado.mensagem}`);
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  });
});