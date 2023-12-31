const { getDatabase, ref, get, set } = require("firebase/database");
const db = getDatabase();

async function checkOutAll(req, res) {
  let errors = [];
  try {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fDate = day + " " + month + " " + year;

    // Minutos até agora no dia
    const minutes = date.getHours() * 60 + date.getMinutes();

    let usersRef = ref(db, 'checkIn/');
    let data = {};

    // Obtenha os dados de check-in
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      return res.status(400).send("Nenhum dado de check-in encontrado");
    }

    for (let user in data) {
      const checkin = data[user][fDate];
      let difference = minutes - checkin;

      // Obtenha as acumuladas do usuário
      const acumuladasSnapshot = await get(ref(db, "users/" + user + "/acumuladas"));

      if (acumuladasSnapshot.exists()) {
        let acumuladas = acumuladasSnapshot.val();
        difference += acumuladas;
      }

      // Atualize as acumuladas do usuário
      await set(ref(db, "users/" + user + "/acumuladas"), difference);

      // Exclua o check-in
      await deleteCheckin(user);
    }
  } catch (err) {
    console.error(err);
    errors.push(err);
  }
  if (errors.length > 0) {
    return res.status(500).send(errors.length + " erros ocorreram");
  }else{
    return res.status(200).send("Check-out realizado com sucesso");
  }
}

async function deleteCheckin(user) {
  let refDb = ref(db, 'checkIn/' + user);
  await set(refDb, null);
  console.log("Check-in deletado");
}

module.exports = checkOutAll;
