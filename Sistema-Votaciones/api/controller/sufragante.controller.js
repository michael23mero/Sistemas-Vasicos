const { ModeloSufragante } = require('../../src/models/')

const createSufragante = async(req, res) => {
    const { identificacion, username, password } = req.body;
    const newUser = new ModeloSufragante({
        identificacion,
        username,
        password: await ModeloSufragante.encryptPassword(password)
    })
    const existeSufragante = await ModeloSufragante.findOne({
        identificacion : identificacion
    })
    if(existeSufragante){
        return res.json({msg: `El usuario ${identificacion} ya se encuentra registrado como lista`})
    }
    const sufraganteCreate = await newUser.save()
    res.status(200).send(sufraganteCreate)
}

const readSufragante = async(req, res) => {
    const data = await ModeloSufragante.find()
    res.status(200).json(data)
    console.log(data)
}

const updateSufragante = async (req, res) =>{
    const { id } = req.params;
    const { ...data } = req.body;
    const sufraganteUpdate = await ModeloSufragante.findByIdAndUpdate(id, data, {new: true})
    res.status(200).json({msg: `El usuario fue actualizado satisfactoriamente`})
}

const deleteSufragante = async (req, res) =>{
    const { id } = req.params;
    const sufraganteDelete = await ModeloSufragante.findByIdAndRemove(id)
    res.status(200).json({msg: `El usuario fue eliminado satisfactoriamente`})
}

const readOneCandidato = async (req, res) =>{
    const { id } = req.params
    const data = await ModeloSufragante.findById(id)
    res.status(200).send(data)
}

module.exports = {
    createSufragante,
    readSufragante,
    deleteSufragante
}