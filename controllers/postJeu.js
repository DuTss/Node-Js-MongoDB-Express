const path = require('path');
const Post = require('../database/models/Jeu')

module.exports =  (req,res) => {
    const { image } = req.files

    const imageReceived = path.resolve(__dirname, 'public/imageReceived', image.name)

    image.mv(imageReceived, (error) => {
        Post.create(
            {
                ...req.body,
                image: `/imageReceived/${image.name}`
            },
            (error, post) => {
            res.redirect('/')
        })
    })
}