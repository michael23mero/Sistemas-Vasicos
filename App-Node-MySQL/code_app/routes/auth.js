const auth = require('express').Router()

const passport = require('passport')

const { login } = require('../lib/helpers')

auth.get('/signup', (req, res) =>{
    res.render('auth/signup')
})

auth.post('/createUser', passport.authenticate('local.signup',  {
        successRedirect: '/perfil',
        failureRedirect: '/signup',
        failureFlash: true
}))

auth.get('/signin', (req, res) =>{
    res.render('auth/signin')
})

auth.post('/signin', (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/perfil',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

auth.get('/perfil', login, (req, res) =>{
    res.render('perfil')
})

auth.get('/salir', (req, res) =>{
    req.logOut()
    res.redirect('/signin')
})

module.exports = auth