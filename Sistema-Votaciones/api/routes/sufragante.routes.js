const { readSufragante, createSufragante, deleteSufragante } = require('../controller/sufragante.controller')

const sufrangtes = require('express').Router()

sufrangtes.get('/', readSufragante)
sufrangtes.post('/', createSufragante)
sufrangtes.delete('/:id', deleteSufragante)

module.exports = sufrangtes