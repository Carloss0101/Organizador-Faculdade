import acessApi from './acessApi.js' 

window.addEventListener('DOMContentLoaded',  () => {

    const form = document.getElementById('form')

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); //Transforma em um objeto

        console.log('Dados enviados:', data); //teste
        const {status }= await acessApi('https://gerenciadorfaculdade.up.railway.app/auth/register', data)

        if (status == 201) { 
            //Se o cadastro for efetuado com sucesso, ele carrega a pagina para fazer o login
            window.location.href = "https://gerenciadorfaculdade.up.railway.app/login"; 
        }
          
    })
  });
  
