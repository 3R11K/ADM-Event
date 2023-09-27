const { getDatabase, ref, get } = require("firebase/database");
const db = getDatabase();

const { getAuth, signOut } = require("firebase/auth");
const auth = getAuth();

async function checkCredentials(req, res, next) {
    const user = auth.currentUser;

    if (user !== null) {
        const dbRef = ref(db, "admin/" + user.uid);

        try {
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                // O usuário está autenticado e é um administrador, pode continuar
                next();
            } else {
                // Não é um administrador, fazer logout e redirecionar para a página de login
                await signOut(auth);
                res.redirect("/login");
            }
        } catch (error) {
            console.error("Erro ao verificar credenciais:", error);
            res.status(500).send("Erro interno do servidor");
        }
    } else {
        // Não há usuário autenticado, redirecionar para a página de login
        res.redirect("/login");
    }
}

module.exports = checkCredentials;
