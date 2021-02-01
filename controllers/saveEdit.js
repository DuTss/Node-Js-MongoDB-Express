const Jeu = require('../database/models/Jeu')

module.exports = async (req,res) => {
        try {
            let jeu =  await Jeu.findById(req.params.id);

            jeu.name = req.body.name
            jeu.genre = req.body.genre
            jeu.description = req.body.description
            jeu.author = req.body.author

            await jeu.save();

            res.redirect(`${jeu.id}`);
    } catch {
        res.redirect('/')
    }
    
}