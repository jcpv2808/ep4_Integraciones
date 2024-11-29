const express = require("express")
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
conectarDB()

app.use(cors())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.send("api funcionando")
})

app.use('/api/categoria', require('./routes/categoria'))
app.use('/api/cliente', require('./routes/cliente'))
app.use('/api/mesero', require('./routes/mesero'))
app.use('/api/orden', require('./routes/orden'))
app.use('/api/platillo',require('./routes/platillo'))

function generateAccessToken(mesero) {
    return jwt.sign(mesero, process.env.SECRET, { expiresIn: '10m' });
}

function validateToken (req, res, next){
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).send('Acceso denegado');

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).send('Token inválido o expirado');
        req.user = user;
        next();
    });
}

app.listen(config.port, ()=>{
    console.log(`Escuchando en el puerto: ${config.port} - http://localhost:${config.port}`)
})