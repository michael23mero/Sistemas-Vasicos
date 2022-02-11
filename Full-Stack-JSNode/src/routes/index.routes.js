const rutas = require('express').Router()

const { createUser, readUser, deleteUser } = require('../controllers/index.controller')

rutas.post('/', createUser)
rutas.get('/', readUser)
rutas.delete('/:id', deleteUser)

module.exports = rutas