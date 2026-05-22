import * as tarefasService from "../services/tarefasServices.js";

export async function criarTarefa(req, res) {
    const {status, mensagem} = await tarefasService.criarTarefa(req.body);
    console.log(status, mensagem);
    res.status(status).json({mensagem: mensagem});
}

export async function listarTarefaByMes(req, res) {
    const { mes } = req.params;
    const userId = req.userId

    const resultado = await tarefasService.listarTarefas({ id, mes });

    res.status(resultado.status).json({ mensagem: resultado.mensagem, tarefas: resultado.tarefas });
}

export async function atualizarStatusTarefa(req, res) {
    const { id, status } = req.params;
    const userId = req.userId

    const resultado = await tarefasService.AtualizarStatusTarefa(id, status, userId)

    res.status(resultado.status).json({ mensagem: resultado.mensagem});
}
