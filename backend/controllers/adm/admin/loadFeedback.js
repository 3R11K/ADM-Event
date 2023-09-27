const {getDatabase, ref, get} = require("firebase/database");
const db = getDatabase();

function loadFeedback(req, res) {
    const refDB = ref(db, "feedbacks");

    try {
        const snapshot = get(refDB);
        const feedbacks = snapshot.val();
        res.status(200).send(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro interno do servidor");
    }
}

module.exports = loadFeedback;