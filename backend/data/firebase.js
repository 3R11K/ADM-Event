const { initializeApp } = require("firebase-admin/app");


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


// Exporte a função de inicialização do Firebase
module.exports = app;
