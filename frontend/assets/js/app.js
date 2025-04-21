import {calcularDataAtual, passarMes, voltarMes } from "./controleMes.js";
import {criarEmbadTrabalhos, criarEmbadProvas} from './embads.js'
import atualizarTarefas from './atualizarTarefas.js'

// Acessa o idUser do localStorage
const idUser = localStorage.getItem('idUser');


document.addEventListener("DOMContentLoaded", async() => {
  const {nomeMes, numeroMes} = calcularDataAtual()
  document.getElementById('titulo-mes').innerHTML = nomeMes 
  
  await atualizarTarefas(idUser, numeroMes)
});

document.getElementById('passarMes').addEventListener('click', () => {
  document.getElementById('titulo-mes').innerHTML = passarMes(idUser)
})

document.getElementById('voltarMes').addEventListener('click', () => {
  document.getElementById('titulo-mes').innerHTML = voltarMes(idUser)
})

document.getElementById('adicionarTrabalho').addEventListener('click', () => {
  //Cria um formulario e envia a resposta dele para a função adicionarTarefa
  criarEmbadTrabalhos(idUser)
})

document.getElementById('adicionarProva').addEventListener('click', () => {
  //Cria um formulario e envia a resposta dele para a função adicionarTarefa
  criarEmbadProvas(idUser)
})



//Falta adicionar:
//Botão de conclído -- Criado :: Falta fazer a parte da api.
//Quando clicar com botao direito aparecer um botão para excluir. :: Falta fazer a parte da api