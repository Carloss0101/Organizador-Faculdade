import atualizarTarefas from "./atualizarTarefas.js";

const nomesDosMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const dataAtual = new Date();
let mes = dataAtual.getMonth(); // Retorna o mês (0 a 11)
let dia = dataAtual.getDate(); // Retorna o dia (1 a 31)
const ano = dataAtual.getFullYear(); // Ano atual

let mesAtual = mes;

export function passarMes(idUser) {
  mesAtual = (mesAtual + 1) % 12;  // Sempre será entre 0 e 11
  
  atualizarTarefas(idUser, mesAtual+1)
  return nomesDosMeses[mesAtual];
}

export function voltarMes(idUser) {
  mesAtual = (mesAtual - 1 + 12) % 12;  

  atualizarTarefas(idUser, mesAtual+1)
  return nomesDosMeses[mesAtual];
}

//Retorna a data atual no formato aaaa/mm/dd
export function calcularDataAtual() {
  const mesFormatado = String(mes + 1).padStart(2, "0");  
  const diaFormatado = String(dia).padStart(2, "0");  
  
  const dataAtualFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;

  return {numeroMes: mes + 1, nomeMes: nomesDosMeses[mes], dia, dataAtualFormatada};
}
