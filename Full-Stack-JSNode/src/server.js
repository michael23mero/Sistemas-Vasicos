const express = require('express')
const path = require('path')
const conn = require('./config/dbc')
const cors = require('cors')
const { uploadImage } = require('./middlewares/upload.middleware')

class Servidor{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3031

        conn.dbc()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(cors())
        this.app.use(uploadImage)
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    routes(){
        this.app.use('/api/v1/user', require('./routes/index.routes'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor a su servicio en el puerto ${this.port}`)
        })
    }
}

module.exports = Servidor