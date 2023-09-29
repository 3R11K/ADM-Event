const { getAuth, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } = require("firebase/auth");
const auth = getAuth();

const { getDatabase, ref, onValue } = require("firebase/database");
const db = getDatabase();
const jwt = require('jsonwebtoken'); // Importe a biblioteca jsonwebtoken
const cookieParser = require('cookie-parser'); // Importe a biblioteca cookie-parser
require('dotenv').config();

// Chave secreta para assinar o token JWT
const secretKey = process.env.SESSION_SECRET;

// Função para configurar um cookie com o token JWT
function setTokenCookie(res, token) {
  res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Tempo de vida de 1 hora
}

// login function
function loginADM(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          let email = user.email;
          let uid = user.uid;

          if (user !== null) {
            const dbRef = ref(db, "admin/" + uid);
            onValue(dbRef, (snapshot) => {
              // Verificar se o email está cadastrado no banco de dados de admin e então configurar o cookie se encontrado
              if (snapshot.exists() && snapshot.val().email === email) {
                // Gere um token JWT após o login bem-sucedido
                const token = jwt.sign({ userId: uid, email: email, admin: true }, secretKey, { expiresIn: '1h' });

                // Configure um cookie seguro para armazenar o token e envie-o no cabeçalho da resposta
                setTokenCookie(res, token);

                res.status(200).send("Login realizado com sucesso como administrador");
              } else {
                // Logout
                signOut(auth)
                  .then(() => {
                    res.status(400).send("Email não cadastrado como administrador");
                  })
                  .catch((error) => {
                    // Um erro ocorreu durante o logout
                    console.error(error);
                    res.status(500).send("Erro durante o logout");
                  });
              }
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          res.status(500).send(errorMessage);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      res.status(500).send(errorMessage);
    });
}

module.exports = loginADM;
