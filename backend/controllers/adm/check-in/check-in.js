const { getDatabase, ref, get, set } = require("firebase/database");
const db = getDatabase();

function checkIn(req,res){
    try{
        const email = req.body.email;
        const name = req.body.name;
        const userID = req.body.userID;
        const RG = req.body.RG;

        //checar se usuario existe
        const dbRef = ref(db, "users/" + name);
        get(dbRef).then((snapshot) => {
            if(snapshot.exists()){
                //pegar dados do usuario no banco
                const userData = Object.values(snapshot.val())[0];
                const userRG = userData.RG;
                const userUserID = userData.userID;
                const userEmail = userData.email;
                //checar se dados batem
                if (userRG == RG && userUserID == userID && userEmail == email) {
                    //checar se ja fez check-in
                    const dbRef = ref(db, "checkIn/" + name);
                    get(dbRef, "checkIn/" + name).then((snapshot) => {
                        //se ja fez check-in
                        if(snapshot.exists()){
                            res.status(400).send("Usuario ja fez check-in");
                        //se nao fez check-in
                        }else{
                            //fazer check-in
                            const date = new Date();
                            //data do dia, mes e ano;
                            const day = date.getDate();
                            const month = date.getMonth() + 1;
                            const year = date.getFullYear();

                            const data = day + " " + month+ " " + year;

                            //pegar horario em minutos
                            const checkInTime = date.getHours()*60 + date.getMinutes();
                            const check = {
                                [data]: checkInTime
                            }
                            set(ref(db, "checkIn/" + name), check).then(() => {
                                res.status(200).send("Check-in realizado com sucesso");
                            });
                        }
                    });
                } else {
                    res.status(404).send("Usuario nao existe");
                }
            }
        });
    }catch(err){
        res.status(400).send("Erro ao realizar check-in");
    }
}

module.exports = checkIn;
