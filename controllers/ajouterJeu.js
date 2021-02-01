module.exports = (req,res) => {
    if(req.session.userId) {
        return res.render('jeux/ajouter')
    }
    res.redirect('/user/login')
}