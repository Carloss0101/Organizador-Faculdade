const jwt = require("jsonwebtoken");
require("dotenv").config();

function checarToken(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect('/login');
    }
  
    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (err) {
      console.log('Token inválido:', err.message);
      return res.redirect('/login');
    }
  }

module.exports = checarToken