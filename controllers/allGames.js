const Post = require('../database/models/Jeu')


module.exports = async (req,res) => {
    const posts = await Post.find({}).sort({_id: -1})
    res.render('jeux/all', {posts})
}