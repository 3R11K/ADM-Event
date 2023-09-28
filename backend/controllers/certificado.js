const { getAuth} = require("firebase/auth");
const auth = getAuth();

const {getDatabase, ref, onValue} = require("firebase/database");
const db = getDatabase();

async function createCertificado(req, res) {
    const userName = auth.currentUser.displayName;
    //alertar a respostta que deve ser o numero de horas
    const horas = await getHours(userName);
    console.log(horas);
    
    if(horas !== null && horas !== undefined && horas > 0){
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

module.exports = createCertificado;