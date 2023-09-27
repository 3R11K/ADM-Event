const {getDatabase, ref, get} = require("firebase/database");
const db = getDatabase();

async function event(req, res){
    const refDB = ref(db, "certificados");

    await get(refDB).then((snapshot) => {
        console.log(snapshot.val());
        if(snapshot.val() == false){
            res.status(400).send("Evento não finalizado")
        }else{
            res.status(200).send("Evento finalizado")
        }
    });
}

module.exports = event;