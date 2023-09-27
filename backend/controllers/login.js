// login module
const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const auth = getAuth();

// Configurar a persistência de sessão como "local"
async function setLocalPersistence () {
  return await new Promise((resolve, reject) => {
    auth
      .setPersistence("local")
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// login function
function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  setLocalPersistence() // Configurar a persistência como "local"
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      res.status(200).send(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.status(400).send(errorMessage);
    });
}

// logout function
function logout(req, res) {
  signOut(auth)
    .then(() => {
      res.status(200).send("Logout realizado com sucesso");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { login, logout };
