const jwt = require("jsonwebtoken");
//gerar qr code e enviar para o front

// Importe os módulos corretos do Firebase
const {getDatabase, ref, onValue} = require("firebase/database");
const db = getDatabase();

const secretKey = process.env.SESSION_SECRET;

// Importe o módulo do QRCode
const QRCode = require('qrcode');

//função para gerar o qr code
async function qrCode(req, res){
    try{
    const decodedToken = verifyTokenFromCookie(req);

    console.log(decodedToken);

    //se o usuário estiver logado, pegar o nome e email dele e retornar para o front como um qr code
    if(decodedToken !== null){
        let name = decodedToken.name;
        let email = decodedToken.email;
        
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
    }}catch(error){
        console.error("Erro ao buscar dados do Firebase:", error);
        res.status(500).send("Erro ao buscar dados do Firebase");
    }
}

function verifyTokenFromCookie(req) {
    const token = req.cookies.token;
  
    if (!token) {
      return null; // Token não encontrado nos cookies
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
        console.log(error)
      return null; // Token inválido
    }
  }

module.exports = qrCode;