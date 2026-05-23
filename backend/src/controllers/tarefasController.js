import * as tarefasService from "../services/tarefasServices.js";

export async function criarTarefa(req, res) {
    const {status, mensagem} = await tarefasService.criarTarefa(req.body);
    console.log(status, mensagem);
    res.status(status).json({mensagem: mensagem});
}

export async function listarTarefaByMes(req, res) {
    const { mes } = req.params;
    const userId = req.userId

    const resultado = await tarefasService.listarTarefas({ userId, mes });

    res.status(resultado.status).json({ mensagem: resultado.mensagem, tarefas: resultado.tarefas });
}

export async function atualizarStatusTarefa(req, res) {
    const { id, status } = req.params;
    const userId = req.userId

    const resultado = await tarefasService.AtualizarStatusTarefa(id, status, userId)

    res.status(resultado.status).json({ mensagem: resultado.mensagem});
}

export async function deletarTarefa(req, res) {
    const { id } = req.params;

    const resultado = await tarefasService.deletarTarefa(id, req.userId);

    return res.status(resultado.status).json({
        mensagem: resultado.mensagem
    });
}

export async function editarTarefa(req, res) {
    const { id } = req.params;

    const resultado = await tarefasService.editarTarefa(id, req.body, req.userId);

    return res.status(resultado.status).json({
        mensagem: resultado.mensagem
    });
}