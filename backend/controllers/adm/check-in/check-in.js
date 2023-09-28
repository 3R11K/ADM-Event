const { getDatabase, ref, get, set } = require("firebase/database");
const db = getDatabase();

// Criar um objeto de cache vazio para armazenar os resultados das verificações
const cache = {};

function checkIn(req, res) {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const userID = req.body.userID;
        const RG = req.body.RG;

        console.log(email);
        console.log(name);
        console.log(userID);
        console.log(RG);

        // Verificar se os resultados da verificação já estão em cache
        const cacheKey = `${name}_${email}_${userID}_${RG}`;
        if (cache[cacheKey]) {
            // Se estiver em cache, use o resultado do cache
            const cachedResult = cache[cacheKey];
            res.status(cachedResult.status).send(cachedResult.message);
            return;
        }

        // Checar se o usuário existe
        const dbRef = ref(db, "users/" + name);
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                // Pegar dados do usuário no banco
                const userData = Object.values(snapshot.val())[0];
                const userRG = userData.RG;
                const userUserID = userData.userID;
                const userEmail = userData.email;
                // Checar se os dados batem
                if (userRG == RG && userUserID == userID && userEmail == email) {
                    // Checar se já fez check-in
                    const checkInDbRef = ref(db, "checkIn/" + name);
                    get(checkInDbRef).then((snapshot) => {
                        // Se já fez check-in
                        if (snapshot.exists()) {
                            cache[cacheKey] = { status: 404, message: "Usuario ja fez check-in" };
                            res.status(404).send("Usuario ja fez check-in");
                        } else {
                            // Fazer check-in
                            const date = new Date();
                            // Data do dia, mes e ano
                            const day = date.getDate();
                            const month = date.getMonth() + 1;
                            const year = date.getFullYear();
                            const data = day + " " + month + " " + year;

                            // Pegar horario em minutos
                            const checkInTime = date.getHours() * 60 + date.getMinutes();
                            const check = {
                                [data]: checkInTime
                            };
                            set(ref(db, "checkIn/" + name), check).then(() => {
                                cache[cacheKey] = { status: 200, message: "Check-in realizado com sucesso" };
                                res.status(200).send("Check-in realizado com sucesso");
                            });
                        }
                    });
                } else {
                    cache[cacheKey] = { status: 404, message: "Usuario nao existe" };
                    res.status(404).send("Usuario nao existe");
                }
            }
        });
    } catch (err) {
        cache[cacheKey] = { status: 400, message: "Erro ao realizar check-in" };
        res.status(400).send("Erro ao realizar check-in");
    }
}

module.exports = checkIn;