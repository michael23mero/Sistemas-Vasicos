const bcryptjs = require('bcryptjs')
const helpers = {}

helpers.encriptacion = async (password) =>{
    const salt = await bcryptjs.genSalt(8)
    const hash = await bcryptjs.hash(password, salt)
    return hash
}

helpers.comparacion = async (password, savePassword) =>{
    try{
        return await bcryptjs.compare(password, savePassword)
    }
    catch(e){
        console.log(e)
    }
}

helpers.login = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/signin')
}

module.exports = helpers