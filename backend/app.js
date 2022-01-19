const express = require('express');
const mongoose = require('mongoose');
const sauce = require('./models/Sauce');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser'); // c'est ce qui manquait : sa déclaration préalable !
const path = require('path');

var helmet = require('helmet'); // sécurité conseillé par express
//Fonctions middleware qui des en-têtes HTTP sécurisées. Ces fonctions sont  : 
// 1- csp protége contre injections intersites
// 2- hidePoweredBy supprime l'en-tête X-Powered-By utilisé par les intrus pour 
    //détecter les app qui exécutent Express 
    // et lancer ensuite des attaques spécifiquement ciblées
// 3- hsts impose des connexions sécurisées au serveur
// 4- ieNoOpen définit X-Download-Options pour IE8+
// 5- noCache désactive la mise en cache côté client
// 6- noSniff protège les navigateurs du reniflage du code MIME 
    // d'une réponse à partir du type de contenu déclaré
// 7- frameguard protège du clickjacking
// 8- xxsFilter active le script intersite dans les navigateurs web les plus récents

const app = express();

mongoose.connect(process.env.TOP_SECRET, //dotenv
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie '))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); //c'est ce qu'il manquait
app.use(express.static('images'));

//app.use(express.urlencoded()) // tester de le commenter voir ce qu'il se passe

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
  );


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;