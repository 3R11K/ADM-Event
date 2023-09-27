const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const auth = getAuth();

// Configurar a persistência de sessão como "local"
async function setLocalPersistence() {
  try {
    await auth.setPersistence("local");
  } catch (error) {
    throw error; // Propaga o erro
  }
}

// login function
async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    await setLocalPersistence();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).send(user);
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
    res.status(200).send("Logout realizado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro durante o logout");
  }
}

module.exports = { login, logout };
