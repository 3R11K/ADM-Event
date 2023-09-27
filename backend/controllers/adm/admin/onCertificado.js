const {getDatabase, ref, get, set} = require("firebase/database");
const db = getDatabase();

async function onCertificado(req,res, next){
    console.log("ativando certificados")
    const refDB = ref(db, "certificados");

    await get(refDB).then((snapshot) => {
        if(snapshot.val() == false){
            set(refDB, true);
            next();
        }
        else{
            res.status(400).send("certificados já ativados");
        }
    });
}

module.exports = onCertificado;