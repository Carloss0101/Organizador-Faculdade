import atualizarTarefas from "./atualizarTarefas.js";

export default async function alternarStatusConclusao(idTarefa, statusAtual, idUSer, dataMes) {
    console.log(idTarefa,statusAtual)
 
    try {
        const resposta = await fetch(
          `https://gerenciadorfaculdade.up.railway.app/tarefas/status/${idTarefa}/${!statusAtual}`
        );
        const resultado = await resposta.json();
        console.log(resultado.mensagem)
        
        atualizarTarefas(idUSer, dataMes);
    } catch(err) {
        console.log('Ocorreu um erro:', err);
    }   
    return !statusAtual
}

