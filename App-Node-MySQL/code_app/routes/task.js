const task = require('express').Router()

const pool = require('../dbc')
const { login } = require('../lib/helpers')

task.get('/createTask', login, (req, res) =>{
    res.render('tareas/createTask')
})

task.post('/createTask', login, async (req, res) =>{
    const { titulo, descripcion } = req.body
    const nuevaTarea = {
        titulo,
        descripcion,
        usuario_Id: req.user.id
    }
    console.log(nuevaTarea)
    
    await pool.query('INSERT INTO tarea set ?', [nuevaTarea])
    req.flash('success', 'Tarea creada satisfactoriamente')
    res.redirect('/tareas')
})

task.get('/', login, async (req, res) =>{
    const tareas = await pool.query('SELECT *FROM tarea WHERE usuario_Id = ?', [req.user.id]);
    //console.log(tareas)
    res.render('tareas/task', {tareas})
})

task.get('/deleteTask/:id', login, async (req, res) =>{
    const { id } = req.params
    await pool.query('DELETE FROM tarea WHERE id = ?', [id])
    req.flash('success', 'Tarea eliminada satisfactoriamente')
    res.redirect('/tareas')
})

task.get('/editTask/:id', login, async (req, res) =>{
    const { id } = req. params
    const tareas = await pool.query('SELECT *FROM tarea WHERE id = ?', [id])
    console.log(tareas[0])
    res.render('tareas/editTask', {tarea: tareas[0]})
})

task.post('/updateTask/:id', login, async (req, res) =>{
    const { id } = req.params
    const { titulo, descripcion } = req.body
    const nuevaTarea = {
        titulo,
        descripcion
    }
    await pool.query('UPDATE tarea set ? WHERE id = ?', [nuevaTarea, id])
    req.flash('success', 'Tarea actualizada satisfactoriamente')
    res.redirect('/tareas')
})

module.exports = task