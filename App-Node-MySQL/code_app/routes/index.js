const rutas = require('express').Router()

rutas.get('/', (req, res) =>{
    res.render('index')
})

module.exports = rutas