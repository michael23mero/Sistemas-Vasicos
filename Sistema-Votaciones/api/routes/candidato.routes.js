const { createCandidato, readCandidato, updateUser, deleteUser, readOneUser } = require('../controller/candidato.controller')

const candidatos = require('express').Router()

candidatos.get('/', readCandidato)
candidatos.post('/', createCandidato)
candidatos.put('/:id', updateUser)
candidatos.delete('/:id', deleteUser)

candidatos.get('/:id', readOneUser)

module.exports = candidatos