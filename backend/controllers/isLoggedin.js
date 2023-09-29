const jwt = require('jsonwebtoken'); // Importe a biblioteca jsonwebtoken
const cookieParser = require('cookie-parser'); // Importe a biblioteca cookie-parser
require('dotenv').config(); // Importe a biblioteca dotenv

// Chave secreta usada para verificar o token JWT
const secretKey = process.env.SESSION_SECRET;

function isLoggedin(req, res, next) {
  // Verifique se o token JWT está presente nos cookies
  const token = req.cookies.token;

  if (!token) {
    // Se o token não estiver presente, redirecione o usuário ou retorne um erro 400
    return res.status(400).redirect("/");
  }

  try {
    // Verifique se o token é válido usando a chave secreta
    const decoded = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    // Se ocorrer um erro ao verificar o token, redirecione o usuário ou retorne um erro 400
    return res.status(400).redirect("/");
  }
}

module.exports = isLoggedin;