import * as planejamentoService from "../services/planejamentoServices.js";

export async function uploadPlanejamento(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ mensagem: "Nenhum arquivo enviado." });
    }

    const { materia } = req.body;

    if (!materia || materia.trim() === "") {
      return res.status(400).json({ mensagem: "O nome da disciplina é obrigatório." });
    }

    const userId = req.userId;
    
    const tarefas = await planejamentoService.processarPlanejamentoPdf(req.file.buffer, userId, materia);

    if (tarefas.length === 0) {
      return res.status(200).json({ 
        mensagem: "PDF processado, mas nenhuma avaliação ou trabalho evidente foi localizado." 
      });
    }

    return res.status(201).json({ 
      mensagem: `${tarefas.length} tarefas identificadas e salvas na disciplina ${materia}!`, 
      tarefas 
    });
  } catch (error) {
    console.error("Erro ao processar o planejamento:", error);
    return res.status(500).json({ mensagem: "Erro interno ao processar o arquivo PDF." });
  }
}