const User = require('../database/models/User')

module.exports = (req,res, next) => {
    // CONNECTE TOI DANS LA BASE DE DONNEE
    User.findById(req.session.userId, (error,user) => {
        if(error || !user) {
            return res.redirect('/')
        }
        next()
    })    
    // VERIFIE L'UTILISATEUR DANS LA BASE DE DONNEE
    
    // SI IL EST DEDANS

    // SINON TU LE REDIRIGES
}