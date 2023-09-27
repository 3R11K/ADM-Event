//requires
require('dotenv').config()
//import job com cron
const job = require('./job/deleteCheckin')

const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//rotas backend e frontend
app.use('/api', require(path.join(__dirname, '..', "controllers", "auth"))); //uso da api
app.use('/', require(path.join(__dirname, "..", "routes", "pages"))); //paginas

//arquivos estaticos
app.use(express.static(path.join(__dirname,"..","..",'frontend')));

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})