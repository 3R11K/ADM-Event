const { getDatabase, ref, get } = require("firebase/database");
const jwt = require('jsonwebtoken'); // Importe a biblioteca jsonwebtoken
const cookieParser = require('cookie-parser'); // Importe a biblioteca cookie-parser
require("dotenv").config();

const db = getDatabase();

// Chave secreta usada para verificar o token JWT
const secretKey = process.env.SESSION_SECRET;

async function profile(req, res) {
  // Verifique o token JWT a partir dos cookies
  const decodedToken = verifyTokenFromCookie(req);
  console.log(decodedToken)

  if (decodedToken !== null) {
    console.log("Token válido");
    // O token JWT é válido, você pode usar as informações decodificadas
    const name = decodedToken.name;
    console.log(name)
    const dbRef = ref(db, "users/" + name);

    try {
      const snapshot = await get(dbRef);
      const data = snapshot.val();
      console.log(data)

      if (data) {
        // Acessa o nó filho do usuário
        const node = Object.values(data)[0];
        const curso = node.Curso;
        const email = node.email;
        const miniCursos = node.miniCurso;

        // Retorna os dados para o front
        res.status(200).send({ name, email, miniCursos, curso });
      } else {
        // Não foram encontrados dados para o usuário
        res.status(400).send("Dados do usuário não encontrados");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do Firebase:", error);
      res.status(500).send("Erro ao buscar dados do Firebase");
    }
  } else {
    // Token não encontrado ou inválido, redirecionar para a página de login
    res.redirect("/");
  }
}

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

module.exports = profile;
