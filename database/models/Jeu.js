const mongoose = require('mongoose');

const JeuSchema = new mongoose.Schema({
    name: String,
    genre: String,
    description: String,
    author: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})

const Jeu = mongoose.model('Jeu', JeuSchema)

module.exports = Jeu