const Jeu = require('../database/models/Jeu')

module.exports = async (req,res) => {
    try {
        const jeu = await Jeu.findById(req.params.id)
        return res.render('edit', {jeu: jeu})
    } catch {
        res.redirect('/')
    }
}