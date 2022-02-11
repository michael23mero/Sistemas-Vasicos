const rutasAdmin = require('express').Router()
const axios = require('axios')

url = 'http://localhost:3030/api/v1/candidatos'

rutasAdmin.get('/index-admin', (req, res) => {
    axios.get(url).then(resp => {
        console.log(resp.data)
        res.render('admin/index', {
            candidato:  resp.data
        });
    })
})

/*CRUD CANDIDATO - ROUTES*/

rutasAdmin.get('/admin-candidato', (req, res) => {
    axios.get(url).then(resp => {
        console.log(resp.data)
        res.render('admin/admin-candidato', {
            candidato:  resp.data
        });
    })
})

rutasAdmin.get('/candidato-form', (req, res) => {
    res.render('admin/form-candidato', {})
})

rutasAdmin.get('/update-candidato/:id', (req, res) => {
    axios.get(`${url}/${req.params.id}`).then(resp => {
        res.render('admin/form-candidato', {
            candidato: resp.data
        })
    })
})

rutasAdmin.get('/delete-candidato/:id', (req, res) => {
    axios.delete(`${url}/${req.params.id}`).then(resp => {
        res.redirect('/admin-candidato')
    })
})

rutasAdmin.post('/candidato-accion', (req, res) => {
    console.log(req.body)
    if(req.body._id === ''){
        axios.post(url, {
            numDeLista: req.body.numDeLista,
            nomDePartido: req.body.nomDePartido,
            liderPolitico: req.body.liderPolitico,
        }).then(resp => {
            res.redirect('/admin-candidato')
        })
    }else{
        axios.put(`${url}/${req.body._id}`, {
            numDeLista: req.body.numDeLista,
            nomDePartido: req.body.nomDePartido,
            liderPolitico: req.body.liderPolitico,
        }).then(resp => {
            res.redirect('/admin-candidato')
        })
    }
})

module.exports = rutasAdmin