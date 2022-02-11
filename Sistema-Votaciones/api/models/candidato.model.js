const { Schema, model} = require('mongoose')

const esquemaCandidato = new Schema(
    {
        numDeLista : {
            type: String
        },
        nomDePartido :{
            type : String
        },
        liderPolitico : {
            type : String
        },
        votos : {
            type : Number,
            default : 0
        }
    }
)

module.exports = model('colecionCandidato', esquemaCandidato)