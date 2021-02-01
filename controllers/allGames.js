const Post = require('../database/models/Jeu')


module.exports = async (req,res) => {
    const posts = await Post.find({}).limit(4)
    res.render('jeux/all', {posts})
}