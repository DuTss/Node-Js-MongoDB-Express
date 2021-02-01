const User = require('../database/models/User');

module.exports = (req,res) => {
    User.create (
        req.body, (error, user) => {
            if(error) {
                const registerError = (Object.keys(error.errors).map(key => error.errors[key].message))
                
                // AFFICHE MESSAGE D'ERREUR
                req.flash('registerError', registerError)
                // RE INSCRIS LES DONNEES RENTRER PAR L'UTILISATEUR
                req.flash('data', req.body)
                return res.redirect('/user/register')
            }
            res.redirect('/')
        }
    )
}