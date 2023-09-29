const { getDatabase, ref, get } = require("firebase/database");
const db = getDatabase();

function loadFeedback(req, res) {
    const refDB = ref(db, "feedbacks");

    get(refDB)
        .then((snapshot) => {
            const feedbackData = snapshot.val();
            if (feedbackData !== null) { // Verifique se os dados não são nulos
                res.status(200).send(feedbackData);
            } else {
                res.status(400).send("Nenhum feedback encontrado");
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Erro interno do servidor");
        });
}

module.exports = loadFeedback;
