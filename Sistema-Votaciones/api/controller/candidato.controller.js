const { ModeloCandidato } = require('../../src/models/')

const createCandidato = async(req, res) => {
    const { ...data } = req.body;
    const existeCandidato = await ModeloCandidato.findOne({
        numDeLista : data.numDeLista
    })
    if(existeCandidato){
        return res.json({msg: `El numero ${data.numDeLista} ya se encuentra registrado como lista`})
    }
    const candidato = new ModeloCandidato(data)
    const candidatoCreate = await candidato.save()
    res.status(200).send(candidatoCreate)
}

const readCandidato = async(req, res) => {
    const data = await ModeloCandidato.find()
    res.status(200).json(data)
    console.log(data)
}

const updateUser = async (req, res) =>{
    const { id } = req.params;
    const { ...data } = req.body;
    const userUpdate = await ModeloCandidato.findByIdAndUpdate(id, data, {new: true})
    res.status(200).json({msg: `El usuario fue actualizado satisfactoriamente`})
}

const deleteUser = async (req, res) =>{
    const { id } = req.params;
    const userDelete = await ModeloCandidato.findByIdAndRemove(id)
    res.status(200).json({msg: `El usuario fue eliminado satisfactoriamente`})
}

const readOneUser = async (req, res) =>{
    const { id } = req.params
    const data = await ModeloCandidato.findById(id)
    res.status(200).send(data)
}

module.exports = {
    createCandidato,
    readCandidato,
    updateUser,
    deleteUser,
    readOneUser
}