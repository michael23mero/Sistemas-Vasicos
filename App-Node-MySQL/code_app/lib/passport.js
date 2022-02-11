const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../dbc')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    console.log(req.body)
    const rows = await pool.query('SELECT *FROM usuario WHERE username = ?', [username])
    if(rows.length > 0){
        const usuario = rows[0]
        const validacionPassword = await helpers.comparacion(password, usuario.password)
        if(validacionPassword){
            done(null, usuario, req.flash('success', `Bienvenido: ${usuario.username}`))
        }else{
            done(null, false, req.flash('mensaje', 'Incorrectos'))
        }
    }else{
        return done(null, false, req.flash('mensaje', 'Usuario no existe'))
    }
}))

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const { email } = req.body;
    const nuevoUsuario ={
        username,
        password,
        email
    }
    nuevoUsuario.password = await helpers.encriptacion(password);
    const result = await pool.query('INSERT INTO usuario SET ?', [nuevoUsuario])
    nuevoUsuario.id = result.insertId
    return done(null, nuevoUsuario)
}))

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser( async(id, done) =>{
    const rows = await pool.query('SELECT *FROM usuario WHERE id = ?', [id])
    done(null, rows[0])
})
