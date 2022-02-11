class UserService{
    constructor(){
        this.URI = '/api/v1/user'
    }

    async getUser(){
        const resp = await fetch(this.URI)
        const users = await resp.json()
        return users
    }

    async postUser(users){
        const resp = await fetch(this.URI, {
            method: 'POST',
            body: users,
        })
        const data = await resp.json()
        console.log(data)
    }

    async deleteUser(id){
        const resp = await fetch(`${this.URI}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        console.log(data)
    }
}

export default UserService