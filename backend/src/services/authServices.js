import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function login(email, senha) {
    if(!email || !senha) {
        return { isLoginValido: false, userId: null};
    }

    const usuario = await User.findOne({ email: email })
    if(!usuario) {
        return { isLoginValido: false, userId: null};
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
        return { isLoginValido: false, userId: null};
    }

    console.log('Login válido:', email, senha)
    return { isLoginValido: true, userId: usuario.userId};
}

export async function cadastro(data) {
    if (!data || typeof data !== "object") {
        return { status: 400, mensagem: "Campos inválidos" };
    }
    
    if (!data.nome || !data.email || !data.senha) {
        return { status: 422, mensagem: "Dados incompletos" };
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

    if (!emailValido) {
        return { status: 422, mensagem: "Email inválido" };
    }

    if (!data.senha || data.senha.length > 20) {
        return { status: 422, mensagem: "Senha inválida" };
    }

    const usuarioExistente = await User.findOne({ email: dado.email });

    if (usuarioExistente) {
        return { status: 401, mensagem: "Usuário já cadastrado." };
    }

    //Informações válidas, salva o usuario no banco.

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(dado.senha, salt);

    const usuario = new User({
        nome: dado.nome,
        email: dado.email,
        senha: passwordHash,
    });

    try {
        await usuario.save();

        return { status: 201, mensagem: "Usuário criado com sucesso." }
    } catch (error) {
        console.log("Erro na criação de usuário:", error)
        return {status: 500, mensagem:"Ocorreu um erro no servidor, tente novamente mais tarde!"} 
    }
}