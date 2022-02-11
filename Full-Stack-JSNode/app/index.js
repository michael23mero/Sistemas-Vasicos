import UserService from "./services/user.service"
const userService = new UserService()

class Main{

    async addUser(user){
        await userService.postUser(user)
        this.cleanForm()
        this.renderUser()
    }

    async renderUser(){
        const users = await userService.getUser()
        const containerCardUser = document.getElementById('card-user')
        containerCardUser.innerHTML = ''
        users.forEach((user) =>{
            const div = document.createElement('card')
            div.innerHTML = `
                <div class="col-md-5 py-2">
                    <div class="card text-center p-2">
                        <img src="${user.imgpath}" alt="" class="card-img"> <!--http://localhost:3031/-->
                        <h5>${user.nombres} ${user.apellidos}<h5>
                        <a href="#" class="btn btn-danger delete" _id=${user._id}>Remove</a>
                    </div>
                </div>`
            containerCardUser.appendChild(div)
        })
        //console.log(users)
    }

    async removeUser(id){
        await userService.deleteUser(id)
        this.renderUser()
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');

        div.className = `alert alert-${colorMessage} message text-center`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const userForm = document.querySelector('#form-user');

        container.insertBefore(div, userForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

    cleanForm(){
        document.getElementById('form-user').reset()
    }
}

export default Main