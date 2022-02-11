const rutas = require('express').Router()

rutas.get('/', (req, res) =>{
    res.send('Hola')
})

module.exports = rutas