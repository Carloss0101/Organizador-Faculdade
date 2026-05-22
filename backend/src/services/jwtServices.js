import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function gerarTokenJwt(id, res) {
    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({ id }, secret, { expiresIn: "1h"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/"
        });

        return {
            status: 200,
            mensagem: "Login e autenticação realizados com sucesso",
            token,
            idUser: id
        };

    } catch (error) {
        console.error(error);
        return {status: 500, mensagem: "Erro ao gerar token"};
    }
}

export function validarTokenJwt(token) {
    try {
        if (!token) {
            return {
                isTokenValido: false,
                mensagem: "Token não informado"
            };
        }

        const secret = process.env.SECRET;

        const decoded = jwt.verify(token, secret);
        return {
            isTokenValido: true,
            idUser: decoded.id
        };

    } catch (error) {
        return { isTokenValido: false, mensagem: "Token inválido" };
    }
}