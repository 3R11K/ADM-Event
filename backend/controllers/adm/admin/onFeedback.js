const {getDatabase, ref, get, set} = require("firebase/database");
const db = getDatabase();

async function onFeedback(req,res, next){
    console.log("ativando feedback")
    const refDB = ref(db, "addFeedback");

    await get(refDB).then((snapshot) => {
        if(snapshot.val() == false){
            set(refDB, true);
            next();
        }
        else{
            res.status(200).send("Feedbacks já ativados");
        }
    });
}

module.exports = onFeedback;