const {getAuth} = require("firebase/auth");
const {getDatabase, ref, set, get} = require("firebase/database");
const auth = getAuth();
const db = getDatabase();

function addFeedback(req, res){
    
    const user = auth.currentUser;
    const name = user.displayName;

    const feedback = req.body.feedback;
    console.log(feedback);

    const dbRef = ref(db, "feedbacks/" + name);
    set(dbRef, {
        feedback: feedback
    }).then(() => {
        res.status(200).send("Feedback enviado com sucesso!");
    }).catch((error) => {
        res.status(400).send("Erro ao enviar feedback");
    });

}

module.exports = addFeedback;