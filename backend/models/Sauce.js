//Importation du package Mongoose
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

//Création du shéma de données
const sauceSchema = mongoose.Schema({
  userId: {
    type: String, //type attendu: du Texte
    required: true //Champs obligatoire
  },
  name: {
    type: String, //type attendu: du Texte
    required: true//Champs obligatoire
  },
  manufacturer: {
    type: String, //type attendu: du Texte
    required: true//Champs obligatoire
  },
  description: {
    type: String, //type attendu: du Texte
    required: true//Champs obligatoire
  },
  imageUrl: {
    type: String, //type attendu: du Texte
    required: true//Champs obligatoire
  },
  mainPepper: {
    type: String, //type attendu: du Texte
    required: true//Champs obligatoire
  },
  heat: {
    type: Number, //type attendu: un Nombre
    required: true//Champs obligatoire
  },
  likes: {
    type: Number, //type attendu: un Nombre
  },
  likedBy: {
    type: Array, //type attendu: un Tableau
  },
  dislikes: {
    type: Number, //type attendu: un Nombre
  },
  dislikedBy: {
    type: Array, //type attendu: un Tableau
  },
});

//exportation du shema Sauce
module.exports = mongoose.model('Sauce', sauceSchema);
