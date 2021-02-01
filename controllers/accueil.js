const Post = require('../database/models/Jeu')

module.exports = async (req, res) => {
    const posts = await Post.find({}).sort({_id: -1}).limit(3)
    res.render('index', {posts})
}