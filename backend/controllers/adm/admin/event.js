const {getDatabase, ref, get} = require("firebase/database");
const db = getDatabase();

async function event(req, res){
    const refDB = ref(db, "certificados");

    await get(refDB).then((snapshot) => {
        console.log(snapshot.val());
        if(snapshot.val() == false){
            return false
        }else{
            return true
        }
    });
}

module.exports = event;