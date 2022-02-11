const userModel = require('../models/index.model')
const { unlink } = require('fs-extra')
const path = require('path')

const createUser = async(req, res) => {
    const { identificacion, nombres, apellidos } = req.body;
    const imgpath = '/upload/' + req.file.filename
    
    const existeUser = await userModel.findOne({
        identificacion : identificacion
    })
    if(existeUser){
        return res.json({msg: `El usuario con identificacion ${identificacion} ya se encuentra registrado`})
    }

    const user = new userModel({identificacion, nombres, apellidos, imgpath})
    const userCreate = await user.save()
    res.status(200).send(userCreate)
}

const readUser = async(req, res) => {
    const data = await userModel.find()
    res.status(200).json(data)
    console.log(data)
}

const deleteUser = async (req, res) =>{
    const { id } = req.params;
    const userDelete = await userModel.findByIdAndDelete(id)
    await unlink(path.resolve('./src/public' + userDelete.imgpath))
    res.status(200).json({msg: `Usuario eliminado satisfactoriamente`})
}

module.exports = {
    createUser,
    readUser,
    deleteUser
}