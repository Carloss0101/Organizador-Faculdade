import acessApi from './acessApi.js'
import atualizarTarefas from './atualizarTarefas.js'
import {calcularDataAtual} from './controleMes.js'



export default async function adicionarTarefa(id, nomeMateria, titulo, tipo, data) {
    const dados = {
        id: id,
        tipo: tipo,
        materia: nomeMateria,
        titulo: titulo,
        data: data,
    }

     const {status} = await acessApi('http://localhost:8080/tarefas/criar', dados)

     if(status == 201) {
        const {numeroMes} = calcularDataAtual()
        atualizarTarefas(id,numeroMes)
     }
}
