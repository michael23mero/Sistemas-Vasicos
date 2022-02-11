const { ModeloCandidato } = require('../models/index')

const user = {}

user.votar = async (req, res) => {
    const { id } = req.params
    const votox = await ModeloCandidato.findById(id)
    Number(votox.votos++)
    await votox.save()
    res.clearCookie('jwt')
    return res.redirect('/')
}

user.estado = async (req, res) =>{
    const { id } = req.params;
    const estado = await ModeloCandidato.findById(id)
    estado.status = !estado.status
    await esado.save()
    res.redirect('/')
}

module.exports = user