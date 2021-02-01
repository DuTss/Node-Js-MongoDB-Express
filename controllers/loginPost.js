const User = require('../database/models/User')
const bcrypt = require('bcrypt')


module.exports = (req,res) => {
    const { pseudo, password } = req.body

    User.findOne({pseudo}, (error,user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error,same) => {
                if(same) {
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else {
                    res.redirect('/user/login')
                }
            }) 
        } else {
            return res.redirect('/user/login')
        }
    })
}