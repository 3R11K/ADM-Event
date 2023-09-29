const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Importe os módulos corretos do Firebase
const firebase = require(path.join(__dirname, "..", "data", "firebase"));

const isLoggedin = require("../controllers/isLoggedin");

//verificar se evento está ocorrendo
const event = require(path.join(__dirname, "..", "controllers", "adm", "admin", "event.js"));

// Import das funções de login e logout
const {login, logout} = require(path.join(__dirname, "..", "controllers", "login.js"));
const profile = require(path.join(__dirname, "..", "controllers", "profile.js"));

//Funçoes adm
const loginADM = require(path.join(__dirname, "..", "controllers", "adm", "admin", "loginADM.js"));
const checkCredentials = require("../controllers/adm/admin/checkCredentials");

//import qrCode generator com dados do usuário
const qrCode = require(path.join(__dirname, "..", "controllers", "check-in", "qrCode.js"));
const checkIn = require(path.join(__dirname, "..", "controllers", "adm", "check-in", "check-in.js"));
const checkOut = require(path.join(__dirname, "..", "controllers", "adm", "check-in", "check-out.js"));
const checkOutAll = require(path.join(__dirname, "..", "controllers", "adm", "check-in", "check-out-all.js"));

//checar se feedback está ativado
const checkFeedback = require(path.join(__dirname, "..", "controllers", "checkFeedback.js"));
//turn on feedback
const onFeedback = require(path.join(__dirname, "..", "controllers", "adm", "admin", "onFeedback.js"));
//adc feedback
const addFeedback = require(path.join(__dirname, "..", "controllers", "addFeedback.js"));
//load feedback
const loadFeedback = require(path.join(__dirname, "..", "controllers", "adm", "admin", "loadFeedback.js"));

//turn on certificado
const onCertificado = require(path.join(__dirname, "..", "controllers", "adm", "admin", "onCertificado.js"));
const certificado = require(path.join(__dirname, "..", "controllers", "certificado.js"));

// Define as rotas de login e logout
router.post('/login',login);
router.get('/logout',logout);

//rota loginADM
router.post('/admin/login', loginADM);

//rota profile
router.get('/profile',isLoggedin,profile)

//rota check-in//checkout
router.post('/check-in',checkCredentials,checkIn)
router.post('/check-out',checkCredentials,checkOut)
//check-out em massa
router.get('/check-out-all',checkCredentials, (req,res)=>{checkOutAll(req,res)})

//rota qrCode
router.get('/qrCodeGet',isLoggedin, qrCode)

//check feedback
router.get("/check-feedback", isLoggedin, async (req,res)=>{
    let feedback = await checkFeedback(req,res);
    console.log(feedback)
    if(feedback){
        res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
})
//turn on feedback and certificado
router.get("/finish-event", checkCredentials, onFeedback, onCertificado,(req,res)=>{
    res.status(202).send("Feedbacks ativados");
})
//rota add feedback
router.post("/add-feedback", isLoggedin, (req,res)=>{
    let feedback = checkFeedback(req,res);
    if(feedback){
        addFeedback(req,res)
    }else{
        res.sendStatus(400)
    }
})
router.get('/download/cronograma', (req, res) => {
    const path = __dirname +"/../data/archives/cronograma.pdf"
    console.log(path)
    // Verifica se o arquivo existe
    if (fs.existsSync(path)) {
      res.download(path, "cronograma.pdf");
    } else {
      res.status(404).send('Arquivo não encontrado');
    }
});

//carregar feedbacks
router.get("/load-feedbacks", checkCredentials, ()=>{
    let feedback = checkFeedback(req,res);
    if(feedback){
        loadFeedback()
    }else{
        res.sendStatus(400)
    }
})

//rota event
router.get("/event", isLoggedin, event)

router.get("/download/certificado", isLoggedin ,certificado)

module.exports = router;
