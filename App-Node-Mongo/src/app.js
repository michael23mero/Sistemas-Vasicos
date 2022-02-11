const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

const app = express()

//Configuraciones
app.set('port', process.env.PORT || 3030)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: true
}))

//Variables globales

//Rutas
app.use(require('./routes/index.routes'))
// app.use(require('./routes/tasks.routes'))
// app.use(require('./routes/users.routes'))

//Archivos estaticos


//Servidor
app.listen(app.get('port'), () =>{
    console.log(`Servidor a su servicio en el puerto ${app.get('port')}`)
})