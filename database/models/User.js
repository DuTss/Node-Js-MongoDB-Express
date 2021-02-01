const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, 'Pseudo obligatoire']
    },
    email: {
        type: String,
        required: [true, 'Email obligatoire'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Mot de passe obligatoire']
    }
})

UserSchema.pre('save', function(next)  {
    const user = this 

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)