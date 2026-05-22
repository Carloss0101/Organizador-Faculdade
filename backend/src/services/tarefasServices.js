import User from "../models/user.js";

export async function criarTarefa(data) {
    if(!data) {
        return {status:422, mensagem:"Dados inválidos."}
    }

    if( !data.id || !data.tipo || !data.materia || !data.data ) {
        return {status:422, mensagem:"Dados incompletos."}
    }

    if(data.tipo != 'prova' && data.tipo != 'trabalho') {
        return {status:422, mensagem:"O tipo deve ser prova ou trabalho"}
    }

    const novaTarefa = new Tarefa({
        userId: data.id,
        tipo: data.tipo, // 'prova' ou 'trabalho'   
        dados: {
            materia: data.materia,
            titulo: data.titulo || '',
            data: data.data,
            concluido: false //por padrao é false
        }
    });
  
    try {
        await novaTarefa.save();
        return {status: 201, mensagem:"Tarefa criada com sucesso."}
    } catch (error) {
        console.log("Erro ao criar a tarefa:", error)
        return {status: 500, mensagem:"Ocorreu um erro no servidor, tente novamente mais tarde!"}
    }
}

export async function listarTarefas(data) {
    if(!data || !data.id || !data.data) {
        return {status:401, mensagem:"datas inválidos."}
    }

    if(data.data < 1 || data.data > 12) {
        return {status:401, mensagem:"Mês inválido."}
    }

    if (!mongoose.Types.ObjectId.isValid(data.id)) {
        return {status:401, mensagem:"ID inválido."}
    }

    try {
        const tarefas = await Tarefa.find({
        userId: data.id,
        "dados.data": {
            $regex: `^\\d{4}-${String(data.data).padStart(2, "0")}-`,
        },
        });
        return { status: 200, mensagem:'Tarefas atualizadas.', tarefas };
    } catch (erro) {
        console.error("Erro ao buscar tarefas:", erro);
        return { status: 500, mensagem: "Ocorreu um erro no servidor, tente novamente mais tarde!" };
    }
}

export async function AtualizarStatusTarefa(idTarefa, status, userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(idTarefa)) {
            return {
                status: 400,
                mensagem: "ID inválido."
            };
        }
        if (status !== true && status !== false) {
            return {
                status: 400,
                mensagem: "Status inválido."
            };
        }

        const tarefaAtualizada = await Tarefa.findOneAndUpdate(
                {_id: idTarefa, userId: userId },
                { "dados.concluido": status},
                {new: true}
            );

        if (!tarefaAtualizada) {
            return { status: 403, mensagem: "Usuário sem permissão." };
        }

        return { status: 200, mensagem: "Status alterado com sucesso." };

    } catch (error) {
        console.error(error);
        return { status: 500, mensagem: "Erro interno no servidor."};
    }
}