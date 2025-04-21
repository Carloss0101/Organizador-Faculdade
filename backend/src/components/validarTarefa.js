const {criarTarefa }= require('../../db');

function validarTarefa(dado) {
    if(!dado) {
        return {status:422, mensagem:"Dados inválidos."}
    }

    if( !dado.id || !dado.tipo || !dado.materia || !dado.data ) {
        return {status:422, mensagem:"Dados incompletos."}
    }

    if(dado.tipo != 'prova' && dado.tipo != 'trabalho') {
        return {status:422, mensagem:"O tipo deve ser prova ou trabalho"}
    }

    //Se todos os dados estiverem validados, a tarefa é criada.
    return criarTarefa(dado);
}


module.exports = validarTarefa