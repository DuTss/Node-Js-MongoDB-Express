const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const MomentHandler = require("handlebars.moment");
const moment = require('helper-moment');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectFlash = require('connect-flash');
const methodOverride = require('method-override');

// POST
const Post = require('./database/models/Jeu');
console.log(moment("DD-MM-YYYY HH:mm:ss"));
MomentHandler.registerHelpers(Handlebars);



//CONTROLLERS
const ajouterJeuController = require('./controllers/ajouterJeu');
const accueilController = require('./controllers/accueil');
const descriptionJeuController = require('./controllers/descriptionJeu');
const postJeuController = require('./controllers/postJeu');
const editController = require('./controllers/edit');
const saveEditController = require('./controllers/saveEdit');
const allGamesController = require('./controllers/allGames');
const aboutUsController = require('./controllers/aboutUs')

const userRegisterController = require('./controllers/userRegister');
const userCreateController = require('./controllers/userCreate');
const userLoginController = require('./controllers/userLogin');
const loginPostController = require('./controllers/loginPost');
const userLogoutController = require('./controllers/userLogout');

// MULTER 
/*const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imageReceived')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  const upload = multer({ storage: storage })*/

//EXPRESS + MONGOOSE
const app = express()
mongoose.connect('mongodb://localhost:27017/chainGames',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});



//EXPRESS
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(session({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))
app.use(connectFlash())
app.use(methodOverride('_method'))



// HANDLEBARS
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
// MIDDLEWARE
const fileSend = require('./middleware/fileSend')
app.use('/jeux/post', fileSend)
const auth = require('./middleware/auth')
app.use('/ajouter', auth)
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess')
app.use('*', (req,res,next) => {
    res.locals.user = req.session.userId
    console.log(res.locals.user)
    next()
})

// PAGE D'ACCUEIL
app.get('/', accueilController)
// PAGE DESCRIPTION JEU
app.get('/jeu/:id', descriptionJeuController)
//PAGE AJOUTER
app.get('/ajouter', auth, ajouterJeuController)
// PAGE REGISTER
app.get('/user/register', redirectAuthSuccess,  userRegisterController)
// PAGE LOGIN
app.get('/user/login', redirectAuthSuccess, userLoginController)
// PAGE EDIT
app.get('/edit/:id', auth, editController)
// PAGE TOUS LES JEUX 
app.get('/allgames', allGamesController)
// PAGE ABOUT US
app.get('/aboutus', aboutUsController)
// SE DECONNECTER
app.get('/user/logout', userLogoutController)

// LOGIN USER CONNEXION
app.post('/user/loginPost', redirectAuthSuccess, loginPostController)
// STOCKER NOUVEAU USER DANS LA BASE DE DONNEES
app.post('/user/create', redirectAuthSuccess, userCreateController)
// POSTER UN JEU
app.post('/jeux/post', auth, fileSend, postJeuController)
// ENREGISTRER MODIFICATION
app.put('/jeu/:id', auth, saveEditController)


// PAGE CONTACT
app.get('/contact', function(req,res) {
    res.render('contact')
})
// ERROR 404
app.use((req,res) => {
    res.render('error404')
})
// PORT
app.listen(2854, function(req,res) {
    console.log("Ecoute le port 2854");
})
 