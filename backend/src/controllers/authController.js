import * as authService from "../services/authServices.js";
import { gerarTokenJwt } from "../services/jwtServices.js";

export async function login(req, res) {
    const {email, senha} = req.body
    
    const {isLoginValido, userId} = await authService.login(email, senha);

    if(isLoginValido !== null && userId !== null) {
        const token = gerarTokenJwt(userId, res);

        return res.status(200).json({mensagem: "Login efetuado com sucesso.", idUser: userId});
    }

    return res.status(401).json({mensagem: "Email ou senha incorretos."});
}


export async function register(req, res) {
    const {status, mensagem} = await authService.Cadastro(req.body)
    return res.status(status).json({mensagem: mensagem})
}