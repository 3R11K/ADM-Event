require('dotenv').config()
const CronJob = require('cron').CronJob;
const { getDatabase, ref, get, set, remove } = require("firebase/database");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyA6SF48fF2yigdY8NeRGzhNgfJIJNh4SbY",
    authDomain: "check-in-seaupp.firebaseapp.com",
    databaseURL: "https://check-in-seaupp-default-rtdb.firebaseio.com/",
    projectId: "check-in-seaupp",
    storageBucket: "check-in-seaupp.appspot.com",
    messagingSenderId: "834060723287",
    appId: "1:834060723287:web:e8d93a8c06e5e3d8b96f12",
    measurementId: "G-LXEXGS0FDN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const job = new CronJob('59 23 * * *', async function() {
    try {
        // Faz login no Firebase
        await signInWithEmailAndPassword(auth, process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD);

        // Obtém a data atual
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const today = day + ' ' + month + ' ' + year;
        
        // Realiza a operação no banco de dados Firebase
        const dbRef = ref(db, 'checkIn');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);
            for(const key of keys) {
                //apanha o check-in do dia seguindo a seguinte estrutura checkIn/key/today
                const checkInRef = ref(db, 'checkIn/' + key + '/' + today);
                const checkInSnapshot = await get(checkInRef);
                if (checkInSnapshot.exists()) {
                    await remove(checkInRef);
                    console.log('Check-in de ' + key + ' no dia ' + today + ' removido com sucesso.');
                }
                
            }
        }
    } catch (error) {
        console.error('Erro ao fazer login no Firebase ou acessar o banco de dados:', error);
    }
});

job.start();

module.exports = job;
