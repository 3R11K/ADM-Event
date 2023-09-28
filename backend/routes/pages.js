const express = require('express');
const router = express.Router();
const path = require("path");
const checkCredentials = require("../controllers/adm/admin/checkCredentials");
const isLoggedin = require("../controllers/isLoggedin");
const checkFeedback = require("../controllers/checkFeedback");


router.get('/', (req, res) => {
    //enviar o arquivo html para o front
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "ADM", "inicio.html"));
})

//rotas usuario

router.get("/home",isLoggedin, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "USUARIO", "home_usuario.html"));
});

router.get("/qrCode",isLoggedin, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "USUARIO", "qrcode.html"));
});

router.get("/profile",isLoggedin, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "USUARIO", "perfil.html"));
});

router.get("/feedback",isLoggedin, (req, res) => {
    if(checkFeedback){
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "USUARIO", "feedback_usuario.html"));
    }else{
        res.redirect("/home")
    }
});

router.get("/certificado",isLoggedin, async (req, res) => {
    let check = await checkFeedback();
    if(check){
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "USUARIO", "certificado.html"));
    }else{
        res.redirect("/home")
    }
});

//rotas adm
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "ADM", "login.html"));
});
router.get("/home-adm", checkCredentials, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "ADM", "home.html"));
})

router.get("/valid-checkin", checkCredentials, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "ADM", "checkin.html"));
})

router.get("/valid-checkout", checkCredentials, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "ADM", "checkout.html"));
})

router.get("/view-feedbacks", checkCredentials, (req, res) => {
    let binaryFeedback = checkFeedback();
    if(binaryFeedback){
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "html", "ADM", "feedback.html"));
    }else{
        res.redirect("/home-adm")
    }
})

module.exports = router;