//gerar qr code e enviar para o front
const {getAuth} = require("firebase/auth");
const auth = getAuth();

// Importe os módulos corretos do Firebase
const {getDatabase, ref, onValue} = require("firebase/database");
const db = getDatabase();

// Importe o módulo do QRCode
const QRCode = require('qrcode');

//função para gerar o qr code
function qrCode(req, res){

    console.log("Gerando QR Code");
    const user = auth.currentUser;
    //se o usuário estiver logado, pegar o nome e email dele e retornar para o front como um qr code
    if(user !== null){
        let name = "";
        let email = "";
        user.providerData.forEach((profile) => {
            name = profile.displayName;
            email = profile.email;
        })
        const dbRef = ref(db, "users/" + name)
        onValue(dbRef, (snapshot) => {

            const data = snapshot.val();
            const node = Object.values(data)[0];
            const userID = node.userID;
            const RG = node.RG;

            let dataQr = {

                name: name,
                userID: userID,
                email: email,
                RG: RG
            }
            //gerar o qr code
            QRCode.toDataURL(JSON.stringify(dataQr), function (err, url) {
                if(err){
                    res.status(400).send({message: "Erro ao gerar QR Code"});
                }
                console.log(url);
                res.status(200).send({url: url});
            })
        })
        
    }else{
        res.status(400).send({message: "Usuário não logado"});
    }
}

module.exports = qrCode;