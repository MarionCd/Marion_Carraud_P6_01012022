const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/sauces', (req, res, next) => {
  const sauces = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      userId: ' identifiant_MongoDB_unique_de_l_utilisateur_qui_a_créé_la_sauce',
      name: 'Nom de la sauce',
      manufacturer: 'fabricant de la sauce',
      description: 'description de la sauce',
      mainPepper: 'le principal ingrédient épicé de la sauce',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      heat : 'nombre entre 1 et 10 décrivant la sauce',
      likes : 'nombre d utilisateurs qui aiment',
      dislikes : 'nombre d utilisateurs qui n aiment pas',
      userLiked: 'string <userId> tableau des identifiants qui ont aimé',
      userDisliked: 'string <userId> tableau des identifiants qui n ont pas aimé',
      
    },
  ];
  res.status(200).json(sauces);
  next();
});

app.get('/', function(req, res, next) {
  res.send("Hello world");
});

module.exports = app;