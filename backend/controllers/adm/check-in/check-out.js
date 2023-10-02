const { getDatabase, ref, get, set } = require("firebase/database");
const db = getDatabase();

function checkOut(req,res){

    try{
        let email = req.body.email;
        email = email.replace(/\s/g, '');
        email = email.toLowerCase();
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
                let userEmail = userData.email;
                userEmail = userEmail.replace(/\s/g, '');
                userEmail = userEmail.toLowerCase();
                //checar se dados batem
                if (userRG == RG && userEmail == email) {
                    //checar se ja fez check-in
                    const dbRef = ref(db, "checkIn/" + name);
                    get(dbRef, "checkIn/" + name).then((snapshot) => {
                        //se ja fez check-in
                        if(snapshot.exists()){
                            //fazer check-out
                            const date = new Date();
                            //minutos do dia ate o momento
                            const checkOutTime = date.getHours()*60 + date.getMinutes();
                            //pegar hora do check-in
                            const checkInTime = Object.values(snapshot.val())[0];
                            const diference = checkOutTime - checkInTime;
                            //ver se ja tem horas acumuladas
                            const dbRef = ref(db, "users/" + name);
                            get(dbRef, snapshot).then((snapshot) => {
                                const userData = Object.values(snapshot.val())[0];
                                if(userData.acumulados){
                                    const acumulados = userData.acumulados;
                                    acumulados= acumulados + diference
                                    set(ref(db, "users/" + name +"/acumuladas"), acumulados).then(() => {
                                        set(ref(db, "checkIn/" + name), null).then(() => {
                                            res.status(200).send("Check-out realizado com sucesso");
                                        });
                                    });
                                }else{
                                    set(ref(db, "users/" + name+"/acumuladas"), diference).then(() => {
                                        set(ref(db, "checkIn/" + name), null).then(() => {
                                            res.status(200).send("Check-out realizado com sucesso");
                                        });
                                    });
                                }
                            })
                            
                        //se nao fez check-in
                        }else{
                            res.status(400).send("Usuario nao fez check-in");
                        }
                    });
                } else {
                    res.status(404).send("Usuario nao existe");
                }
            }
        });
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = checkOut;
