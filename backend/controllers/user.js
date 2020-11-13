//importation du package bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
//importation du package jsonwebtoken pour générer les tokens
const jwt = require('jsonwebtoken');

//importation  de user.js du dossier models
const User = require('../models/User');

//export des fonctions 'signup' et 'login'
exports.signup = (req, res, next) => {
  //hashage du mot de passe 10 fois
  bcrypt.hash(req.body.password, 10)
  //création de la Promise
    .then(hash => {
      //récupération de l'email et du nouveau mot de passe
      const user = new User({
        email: req.body.email,
        password: hash
      });
      //sauvegarde des données
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur Créé !'
          //réponse de réussite code 201
        }))
        .catch(error => res.status(400).json({
          error
          //réponse d'erreur avec code 400
        }));
    })
    .catch(error => res.status(500).json({
      error
      //réponse d'erreur avec code 500
    }));
};

exports.login = (req, res, next) => {
  //méthode 'findOne' pour trouver 1 seul utilisateur
  User.findOne({
    //récupération de l'adresse email
      email: req.body.email
    })
    // fonction asyncrone donc Promise
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
          //réponse d'erreur avec code 401
        });
      }
      //comparaison entre le mdp tapé et celui de la base de donnée
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          //verification si le mdp est valable ou pas
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
              //réponse d'erreur avec code 401
            });
          }
          //réponse de succès code 200
          res.status(200).json({
            //renvoi au frontend le userid et le token
            userId: user._id,
            //encodage avec la fonction 'sign'
            token: jwt.sign({
                userId: user._id
              },
              //clé secrete d'encodage
              'u0JxYwok4U-Jn0`=(-69T5E=m!MkJ6', {
              //délais d'expiration
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
          //réponse d'erreur avec code 500
        }));
    })
    .catch(error => res.status(500).json({
      error
      //réponse d'erreur avec code 500
    }));
};
