const { getDatabase, ref, get, set } = require("firebase/database");
const db = getDatabase();

async function checkOutAll(req,res){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const fDate = day + " " + month + " " + year;

    //minutos até agora no dia
    const minutes = date.getHours()*60 + date.getMinutes();

    let usersRef = ref(db, 'checkIn/');

    let data = {}
    await get(usersRef).then((snapshot) => {
        if (snapshot.exists()){
            data = snapshot.val();
        }else{
            res.sendStatus(400);
        }
    });

    try{

        for(let user in data){
            const checkin = data[user][fDate]
            let diference = minutes - checkin;
            await get(ref(db,"users/"+ user+"/acumuladas")).then((snapshot) => {
                //se a snapshot existir
                if(snapshot.exists()){
                    let acumuladas = snapshot.val();
                    diference += acumuladas;
                    set(ref(db,"users/"+ user+"/acumuladas"), diference).then(()=>{
                        console.log("acumuladas setadas");
                        deleteCheckin(user);
                    }).catch((err)=>{
                        console.log(err, "erro ao setar acumuladas de "+ user);
                    })
                }else{
                    set(ref(db,"users/"+ user+"/acumuladas"), diference).then(()=>{
                        console.log("acumuladas setadas");
                        deleteCheckin(user);

                    }).catch((err)=>{
                        console.log(err, "erro ao setar acumuladas de "+ user);
                    })
                }
            });
        };
        res.status(200).send("Check-out de todos os usuários realizado com sucesso");
    }catch(err){
        console.log(err);
        res.status(400).send("Erro ao fazer check-out de todos os usuários");
    }
}

async function deleteCheckin(user){
    let refDb = ref(db, 'checkIn/'+user);
    await set(refDb, null).then(()=>{
        console.log("checkin deletado");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = checkOutAll;