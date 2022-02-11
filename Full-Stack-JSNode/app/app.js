import './style/style.css'
import Main from './index'

const main = new Main()

document.addEventListener('DOMContentLoaded', e =>{
    e.preventDefault()
    main.renderUser()
}) 


document.getElementById('form-user')
    .addEventListener('submit', e =>{
        const identificacion = document.getElementById('identificacion').value;
        const nombre = document.getElementById('nombres').value;
        const apellido = document.getElementById('apellidos').value;
        const image = document.getElementById('image').files;

        const formData = new FormData()
        formData.append('identificacion', identificacion)
        formData.append('nombres', nombre)
        formData.append('apellidos', apellido)
        formData.append('image', image[0])

        main.addUser(formData)
        main.renderMessage('Usuario create son exito', 'success', 3000)
        e.preventDefault()

        //console.log(identificacion, nombre, apellido, image)
    })

document.getElementById('card-user')
    .addEventListener('click', e =>{
        if(e.target.classList.contains('delete')){
            main.removeUser(e.target.getAttribute('_id'))
            main.renderMessage('Usuario delete son exito', 'danger', 3000)
        }
        e.preventDefault()
    })