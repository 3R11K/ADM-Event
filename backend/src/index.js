//requires
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser'); // Importe a biblioteca cookie-parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configurar o middleware cookie-parser
app.use(cookieParser());

// Rotas backend e frontend
app.use('/api', require(path.join(__dirname, '..', "controllers", "auth"))); // Uso da API
app.use('/', require(path.join(__dirname, "..", "routes", "pages"))); // Páginas

// Arquivos estáticos
app.use(express.static(path.join(__dirname,"..","..",'frontend')));

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
