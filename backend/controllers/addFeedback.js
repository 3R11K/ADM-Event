const {getDatabase, ref, set, get} = require("firebase/database");
const db = getDatabase();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SESSION_SECRET;

function addFeedback(req, res){
    
    const decodedToken = verifyTokenFromCookie(req);
    const name = decodedToken.name;

    const feedback = req.body.feedback;
    console.log(feedback);

    const dbRef = ref(db, "feedbacks/" + name);
    set(dbRef, feedback).then(() => {
        res.status(200).send("Feedback enviado com sucesso!");
    }).catch((error) => {
        res.status(400).send("Erro ao enviar feedback");
    });

}

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

module.exports = addFeedback;