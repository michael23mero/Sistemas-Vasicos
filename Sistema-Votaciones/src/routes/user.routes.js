const rutasUser = require('express').Router()
const axios = require('axios')

url = 'http://localhost:3030/api/v1/candidatos'

const userHelpers = require('../helpers/user')
const { login, logout, isAuthenticated } = require('../controllers/auth.controller')

rutasUser.get('/index-user', isAuthenticated, (req, res) => {
    axios.get(url).then(resp => {
        res.render('client/index', {
            candidato: resp.data,
            user: req.body
        })
    })
})

//AUTH
rutasUser.get('/login', (req, res) => {
    res.render('client/login')
})
rutasUser.post('/login', login)
rutasUser.get('/logout', logout)

rutasUser.get('/votar/:id', userHelpers.votar)
rutasUser.get('/estado/:id', userHelpers.estado)

module.exports = rutasUser