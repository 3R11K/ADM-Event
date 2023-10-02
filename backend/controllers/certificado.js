const jwt = require("jsonwebtoken");

const secretKey = process.env.SESSION_SECRET;

const {getDatabase, ref, onValue} = require("firebase/database");
const db = getDatabase();

async function createCertificado(req, res) {
    const decodedToken = verifyTokenFromCookie(req);

    const userName = decodedToken.name;
    //alertar a respostta que deve ser o numero de horas
    const horas = await getHours(userName);
    console.log(horas);
    
    if(horas !== null && horas !== undefined && horas > 1100){
        const RG = await getRG(userName);
        await createPDF(req, res, userName, RG);
    }else{
        res.status(400).send("Você não tem horas acumuladas");
    }
}

async function getRG(userName){
    const dbRef = ref(db, "users/" + userName);
    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            const node = Object.values(snapshot.val())[0];
            const RG = node.RG;
            resolve(RG);
        }, (error) => {
            reject(error);
        });
    });
}

async function getHours(userName) {
    const dbRef = ref(db, "users/" + userName + "/acumuladas");
    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            resolve(snapshot.val());
        }, (error) => {
            reject(error);
        });
    });
}

async function createPDF(req, res, userName, RG) {
    try{
        res.status(200).send({userName: userName, RG: RG});
    }catch(err){
        console.log(err);
        res.status(400).send("Erro ao criar o certificado");
    }
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

module.exports = createCertificado;