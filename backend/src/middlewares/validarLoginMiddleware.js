import { validarTokenJwt } from "../services/jwtServices.js";

export async function validarLogin(req, res, next) {
    try {
        const token = req.cookies.token;

        const resultado = validarTokenJwt(token);

        if (!resultado.isTokenValido) {
            return res.status(401).json({mensagem: "Token inválido."});
        }
        
        req.userId = resultado.idUser;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({mensagem: "Token inválido."});
    }
}


export async function validarLoginIndex(req, res, next) {
    try {
        const token = req.cookies.token;

        const resultado = validarTokenJwt(token);

        if (!resultado.isTokenValido) {
            return res.redirect("/login");
        }
        
        next();
    } catch (error) {
        console.error(error);
        return res.redirect("/login");
    }
}