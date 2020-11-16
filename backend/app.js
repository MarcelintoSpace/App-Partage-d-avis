//Importation du package Express
const express = require('express');
//Importation du package BodyParser
const bodyParser = require('body-parser');
//Importation du package Mongoose
const mongoose = require('mongoose');
//Importation de 'Path' afin de définir les chemins
const path = require('path');

//Importation des Router 'Sauces' et 'user'
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//connection à la base de données avec password + id
mongoose.connect('mongodb+srv://marcelintospace:kornog53Cmoi@cluster0.4ys4s.mongodb.net/SO_PREKOCKO?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//appel de la méthode Express
const app = express();

//Insertion CORS
app.use((req, res, next) => {
  //qui peut accéder à l'API
  res.setHeader('Access-Control-Allow-Origin', '*');
  //Quels header sont authorisés
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //Quels méthodes sont possible
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//pour tranformer les requête en JSON
app.use(bodyParser.json());

//gestion des routes principales
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//exportation de la constante app
module.exports = app;
