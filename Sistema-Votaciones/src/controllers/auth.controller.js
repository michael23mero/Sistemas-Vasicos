const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const { ModeloSufragante } = require('../models')

const login = async (req, res) => {
    const { identificacion, password } = req.body
    const existeUser = await ModeloSufragante.findOne({
        identificacion: identificacion
    })
    if(!existeUser){
        res.render('client/login', {
            alert: true, alertMessage: 'Usuario no encontrado', alertIcon: 'info',time: 1500, ruta: 'login'
        })
    }else{
        const comparacion = await existeUser.comparePassword(password)
        if(!comparacion){
            res.render('client/login', {
                alert: true, alertMessage: 'Contraseña incorrecta', alertIcon: 'warning',time: 1500, ruta: 'login'
            })
        }else{
            const token = jwt.sign({id: existeUser._id}, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
            const cookie_ = {
                expires: new Date(Date.now()+process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookie_)
            console.log(token)
            res.render('client/login', {
                alert: true, alertMessage: 'Bienvenido', alertIcon: 'success',time: 1500, ruta: 'index-user'
            })
        }
    }
}

const isAuthenticated = async (req, res, next) => {
    if(req.cookies.jwt){
        try{
            const decode = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            //req.id = decode._id
            const user = await ModeloSufragante.findById(decode._id)
            if (!user) {
                return next();
            }
            req.user = user
            next()

        }catch(err){
            console.log(err)
        }
    }else{
        res.redirect('/login')
    }
}

const logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}

module.exports = {
    login,
    isAuthenticated,
    logout
}