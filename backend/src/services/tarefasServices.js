import mongoose from "mongoose";
import Tarefa from "../models/tarefa.js";
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
    console.log(data)
    if(!data || !data.userId || !data.mes) {
        return {status:401, mensagem:"dados inválidos."}
    }

    if(data.mes < 1 || data.mes > 12) {
        return {status:401, mensagem:"Mês inválido."}
    }

    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        return {status:401, mensagem:"ID inválido."}
    }

    try {
        const tarefas = await Tarefa.find({
        userId: data.userId,
        "dados.data": {
            $regex: `^\\d{4}-${String(data.mes).padStart(2, "0")}-`,
        },
        });
        return { status: 200, mensagem:'Tarefas atualizadas.', tarefas };
    } catch (erro) {
        console.error("Erro ao buscar tarefas:", erro);
        return { status: 500, mensagem: "Ocorreu um erro no servidor, tente novamente mais tarde!" };
    }
}

export async function AtualizarStatusTarefa(idTarefa, status, userId) {
    console.log(status, typeof status);
    try {
        if (!mongoose.Types.ObjectId.isValid(idTarefa)) {
            return {
                status: 400,
                mensagem: "ID inválido."
            };
        }
        if (status != "true" && status != "false") {
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

export async function deletarTarefa(idTarefa, userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(idTarefa)) {
            return {status: 400, mensagem: "ID inválido."};
        }

        const tarefa = await Tarefa.findOneAndDelete({_id: idTarefa, userId});

        if (!tarefa) {
            return {status: 404,mensagem: "Tarefa não encontrada."};
        }

        return {status: 200, mensagem: "Tarefa excluída com sucesso."};

    } catch (error) {
        console.error(error);
        return {status: 500, mensagem: "Erro interno."};
    }
}

export async function editarTarefa(idTarefa, dados, userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(idTarefa)) {
            return {status: 400, mensagem: "ID inválido."};
        }

        const tarefa = await Tarefa.findOneAndUpdate(
            {
                _id: idTarefa,
                userId
            },
            {
                "dados.materia": dados.materia,
                "dados.titulo": dados.titulo,
                "dados.data": dados.data
            },
            {
                new: true
            }
        );

        if (!tarefa) {
            return {status: 404,mensagem: "Tarefa não encontrada."};
        }

        return {status: 200,mensagem: "Tarefa atualizada com sucesso."};

    } catch (error) {
        console.error(error);
        return {status: 500,mensagem: "Erro interno."};
    }
}