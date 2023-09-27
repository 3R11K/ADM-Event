const { getDatabase, ref, get } = require("firebase/database");
const db = getDatabase();

async function checkFeedback(req, res) {
    const refDB = ref(db, "addFeedback");

    try {
        const snapshot = await get(refDB);
        let check = snapshot.val();
        if (check) {
            return true;
        }else{
            return false;
        };
    } catch (error) {
        console.error(error);
        return false; // Em caso de erro, retorne false
    }
}

module.exports = checkFeedback;
