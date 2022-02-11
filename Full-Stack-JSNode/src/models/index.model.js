const { Schema, model} = require('mongoose')

const esquemaUser = new Schema(
    {
        identificacion : {
            type: String,
            required: true
        },
        nombres :{
            type : String,
            required: true
        },
        apellidos : {
            type : String,
            required: true
        },
        imgpath:{
            type : String,
            required: true
        },
        
    },
    {
        timestamps: { createdAt: true, updatedAt: true}
    }
)

module.exports = model('collecionUser', esquemaUser)