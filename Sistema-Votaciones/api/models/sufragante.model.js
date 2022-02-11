const { Schema, model } = require('mongoose')
const  bcryptjs = require('bcryptjs')

const esquemaUser = new Schema(
    {
        identificacion: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: true},
        versionKey: false,
    }
) 

esquemaUser.statics.encryptPassword = async (password) =>{
    const salt = await bcryptjs.genSalt(10)
    const hash = bcryptjs.hash(password, salt)
    return hash
};

esquemaUser.methods.comparePassword = async function (password){
    return await bcryptjs.compare(password, this.password)
}

module.exports = model('coleccionUser', esquemaUser)