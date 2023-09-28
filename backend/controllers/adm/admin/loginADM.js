const { getAuth, signInWithEmailAndPassword, signOut, browserSessionPersistence } = require("firebase/auth");
const auth = getAuth();

const {getDatabase, ref, onValue} = require("firebase/database");
const db = getDatabase();

//login function
async function loginADM(req, res){
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password)
    setPersistence(auth, browserSessionPersistence)
    .then(async() => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        let email =user.email;
        let uid =user.uid;
        if(user !== null){
        
    
            const dbRef = ref(db, "admin/" + uid);
            get(dbRef, (snapshot) => {
                //verificar se email está cadastrado no banco de dados de admin e entao deslogar se nao encontrado
                if(snapshot.exists()){
                    if(snapshot.val().email === email){
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
    })
}

module.exports = loginADM;