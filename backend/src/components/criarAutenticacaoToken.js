const jwt = require("jsonwebtoken");
require("dotenv").config();

function criarAutenticacaoToken(id, res) {
    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({ id }, secret, { expiresIn: '1h' });

        // Define o cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict',
            path: '/',
        });

        return {
            status: 200,
            mensagem: "Login e Autenticação realizados com sucesso",
            idUser: id
        };
    } catch (error) {
        console.log(error);

        return {
            status: 500,
            mensagem: "Ocorreu um erro no servidor, tente mais tarde!"
        };
    }
}


module.exports = criarAutenticacaoToken