const rutas = require('express').Router()
const axios = require('axios')

rutas.get('/', (req, res) => {
    axios.get(url).then(resp => {
        console.log(resp.data)
        res.render('index', {
            candidato:  resp.data
        });
    })
})
module.exports = rutas