const { getDatabase, ref, get } = require("firebase/database");
const db = getDatabase();

const jwt = require('jsonwebtoken'); // Importe a biblioteca jsonwebtoken
const cookieParser = require('cookie-parser'); // Importe a biblioteca cookie-parser

// Chave secreta usada para verificar o token JWT
const secretKey = process.env.SESSION_SECRET;

// Função para verificar o token JWT a partir dos cookies
function verifyTokenFromCookie(req) {
  const token = req.cookies.token;

  if (!token) {
    return null; // Token não encontrado nos cookies
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; // Token inválido
  }
}

async function checkCredentials(req, res, next) {
  const decodedToken = verifyTokenFromCookie(req);
  console.log(decodedToken)

  if (decodedToken !== null) {
    const dbRef = ref(db, "admin/" + decodedToken.userId);

    try {
      const snapshot = await get(dbRef);

      if (snapshot.exists() && snapshot.val().email === decodedToken.email && decodedToken.admin == true) {
        // O usuário está autenticado e é um administrador, pode continuar
        next();
      } else {
        // Não é um administrador, fazer logout e redirecionar para a página de login
        res.clearCookie('token'); // Limpa o cookie do token
        res.redirect("/login");
      }
    } catch (error) {
      console.error("Erro ao verificar credenciais:", error);
      res.status(500).send("Erro interno do servidor");
    }
  } else {
    // Token não encontrado ou inválido, redirecionar para a página de login
    res.redirect("/login");
  }
}

module.exports = checkCredentials;