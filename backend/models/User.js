//importation du package Mongoose
const mongoose = require('mongoose');
//importation du package Mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

//création du Shema
const userSchema = mongoose.Schema({
  email: {
    type: String, //type attendu: du Texte
    required: true, //Champs obligatoire
    unique: true //impossibilité de se s'incrire 2 fois avec la même adresse email
  },
  password: {
    type: String, //type attendu: du Texte
    required: true //Champs obligatoire
  }
});

//eviter les doublons d'utilisateur avec la même adresse email
userSchema.plugin(uniqueValidator);

//exportation du Shema User
module.exports = mongoose.model('User', userSchema);
