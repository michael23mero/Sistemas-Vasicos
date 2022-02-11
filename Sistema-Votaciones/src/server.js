const express = require('express')
const path = require('path')

const cookieParser = require('cookie-parser')

class Servidor{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3030

        require('./config/dbc').dbc()
        this.middlewares()
        this.routes()
        this.views()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(express.static(path.join(__dirname, 'assets')))

        this.app.use(cookieParser())
        this.app.use(function(req, res, next) {
            if (!req.user)
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            next();
        });
    }

    routes(){
        this.app.use(require('./routes/index.routes'))
        this.app.use(require('./routes/admin.routes'))
        this.app.use(require('./routes/user.routes'))

        this.app.use('/api/v1/candidatos', require('../api/routes/candidato.routes'))
        this.app.use('/api/v1/sufragantes', require('../api/routes/sufragante.routes'))
    }

    views(){
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto ${this.port}`)
        })
    }
}

module.exports = Servidor