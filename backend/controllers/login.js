const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const jwt = require('jsonwebtoken'); // Importe a biblioteca jsonwebtoken
require('dotenv').config(); // Importe a biblioteca dotenv

const auth = getAuth();

// Chave secreta para assinar o token JWT
const secretKey = process.env.SESSION_SECRET;

// login function
async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Gere um token JWT após o login bem-sucedido
    const token = jwt.sign({ userId: user.uid, email: user.email, name:user.displayName , admin: false}, secretKey, { expiresIn: '1h' });

    // Configure um cookie seguro para armazenar o token e envie-o no cabeçalho da resposta
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Tempo de vida de 1 hora

    // Envie uma resposta vazia (ou outra resposta conforme necessário)
    res.status(200).send();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode);
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
}

// logout function
async function logout(req, res) {
  try {
    await signOut(auth);

    // Limpe o cookie do token
    res.clearCookie('token');
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro durante o logout");
  }
}

module.exports = { login, logout };
