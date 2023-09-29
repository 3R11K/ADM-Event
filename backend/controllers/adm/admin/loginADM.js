const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const auth = getAuth();
const jwt = require('jsonwebtoken'); // Importe a biblioteca jsonwebtoken

const {getDatabase, ref, onValue} = require("firebase/database");
const db = getDatabase();
const secretKey = process.env.SESSION_SECRET;
//login function
function loginADM(req, res){
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        let email =user.email;
        let uid =user.uid;
        if(user !== null){
        
    
            const dbRef = ref(db, "admin/" + uid);
            onValue(dbRef, (snapshot) => {
                //verificar se email está cadastrado no banco de dados de admin e entao deslogar se nao encontrado
                if(snapshot.exists()){
                    if(snapshot.val().email === email){
                        const token = jwt.sign({ userId: user.uid, email: user.email, name:user.displayName , admin: true}, secretKey, { expiresIn: '1h' });
                        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
                        res.status(200).send("Login realizado com sucesso como administrador");
                    }else{
                        //logout
                        signOut(auth).then(() => {
                            res.status(400).send("Email não cadastrado como administrador");
                        }).catch((error) => {
                            // An error happened.
                            throw error;
                        });
    
                    }
                }else{
                    signOut(auth).then(() => {
                        res.status(400).send("Email não cadastrado como administrador");
                    }).catch((error) => {
                        // An error happened.
                        throw error;
                    });
                }
            });
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

}


module.exports = loginADM;