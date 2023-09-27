const {getAuth} = require("firebase/auth");

const auth = getAuth();
const user = auth.currentUser;

const {getDatabase, ref, set, onValue} = require("firebase/database");

const db = getDatabase();

function profile(req, res){

    const user = auth.currentUser;

    //se o usuário estiver logado, pegar o nome e email dele e retornar para o front
    if(user !== null){
        let name = "";
        let email = "";
        let miniCursos = "";

        //pega o nome e email do usuário
        user.providerData.forEach((profile) => {
            name = profile.displayName;
            email = profile.email;
        })
        //pegar os minicursos do banco de dados, acessar o nó filho do usuário e pegar os minicursos
        const dbRef = ref(db, "users/" + name)
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            //acessa nó filho do usuário
            const node = Object.values(data)[0];
            const curso = node.Curso;
            miniCursos = node.miniCurso;
            //retorna os dados para o front
            res.status(200).send({name: name, email: email, miniCursos: miniCursos, curso: curso});
        })
    }else{
        res.redirect("/");
    }
}

module.exports = profile;