import acessApi from "./acessApi.js";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); //Transforma em um objeto

    const { status, resultado } = await acessApi(
      "http://localhost:8080/auth/login",
      data
    );
    console.log(resultado);

    if (status == 200) {
      //Salva o token nos cookies.
      document.cookie = `token=${data.token}; path=/; Secure; HttpOnly`;

      //Salva o id do usuário
      localStorage.setItem('idUser', resultado.idUser);
      
      //Redireciona para index após o login de sucesso
      window.location.href = 'http://localhost:8080/index';
    } else {
        console.error(`[${status}] Ocorreu um erro no login.`);
    }
  });
});
