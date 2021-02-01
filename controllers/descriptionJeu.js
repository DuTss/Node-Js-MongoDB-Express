const Post = require('../database/models/Jeu')

module.exports = async (req,res) => {
    const jeu = await Post.findById(req.params.id)
    res.render('descriptionJeu', {jeu})
}