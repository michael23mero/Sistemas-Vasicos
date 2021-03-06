const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')

const { database } = require('./keys')

//INICIALIZACIONES
const app = express()
require('./lib/passport')

//CONFIGURACIONES
app.set('port', process.env.PORT || 3030)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

//MIDDLEWARES
app.use(flash())
app.use(session({
    secret: 'Yrpj0693',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


//VARIABLES GLOBALES
app.use((req, res, next) =>{
    app.locals.success = req.flash('success')
    app.locals.mensaje = req.flash('mensaje')
    app.locals.user = req.user
    next()
})

//RUTAS
app.use(require('./routes/index'))
app.use(require('./routes/auth'))
app.use('/tareas', require('./routes/task'))

//ARCHIVOS ESTATICOS

//SERVIDOR
app.listen(app.get('port'), () =>{
    console.log(`Soy el puerto que funciona, soy el puerto: ${app.get('port')}`)
})