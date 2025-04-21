import atualizarTarefas from "./atualizarTarefas.js";

export default async function alternarStatusConclusao(idTarefa, statusAtual, idUSer, dataMes) {
    console.log(idTarefa,statusAtual)
 
    try {
        const resposta = await fetch(
          `http://localhost:8080/tarefas/status/${idTarefa}/${!statusAtual}`
        );
        const resultado = await resposta.json();
        console.log(resultado.mensagem)
        
        atualizarTarefas(idUSer, dataMes);
    } catch(err) {
        console.log('Ocorreu um erro:', err);
    }   
    return !statusAtual
}

