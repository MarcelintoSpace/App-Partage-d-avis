//importation de 'Sauce.js' de models
const Sauce = require('../models/Sauce');
//importation du package 'fs' de Node
const fs = require('fs');

//export des fonctions 'create', 'getOne', 'modify', 'delete', 'getAll', 'createLike', 'createDislike'
exports.createSauce = (req, res, next) => {
  //modification du format de la requête pour la transformer en objet
  const sauceObject = JSON.parse(req.body.sauce);
  //Suppression de l'id renvoyé par le front-end
  delete sauceObject._id;
  //Création d'une nouvelle instance 'Sauce'
  const sauce = new Sauce({
    //Récupération des informations 'name, description, ...' avec le raccourci 'spread'
    ...sauceObject,
    //récupération de l'url dynamique 'image' généré par Multer
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  //Engeristrement de l'objet dans la base de données
  sauce.save()
    //création d'un Promise
    .then(() => res.status(201).json({
      message: 'Sauce enregistrée !'
      //réponse de réussite code 201
    }))
    .catch(error => res.status(400).json({
      error
      //réponse d'erreur avec code 400
    }));
};

exports.getOneSauce = (req, res, next) => {
  //Récupération d'une seule Sauce
  Sauce.findOne({
      //définition avec Params du même id que la sauce demandée
      _id: req.params.id
    })
    //création d'un Promise
    .then(
      (sauce) => {
        res.status(200).json(sauce);
        //réponse de succès code 200
      }
    ).catch((error) => {
      res.status(404).json({
        error
        //réponse d'erreur avec code 404, sauce non trouvée
      });
    });
};

exports.modifySauce = (req, res, next) => {
  //création d'un objet en demande si il y a une image à modifier
  const sauceObject = req.file ? {
    //récupération les infos des objets
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    //sinon reprise de l'objet en gardant l'image initiale
    ...req.body
  };
  //Modification de la sauce avec la méthode 'upateOne'
  Sauce.updateOne({
      //sélection de l'objet par son id
      _id: req.params.id
    }, {
      //insertion du nouvel objet avec le raccourci 'spread'
      ...sauceObject,
      _id: req.params.id
    })
    //création d'un Promise
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
      //réponse de succès code 200
    }))
    .catch(error => res.status(400).json({
      error
      //réponse d'erreur avec code 400
    }));
};

exports.deleteSauce = (req, res, next) => {
  //Récupération de l'objet à supprimé avec 'findOne' et id
  Sauce.findOne({
      _id: req.params.id
    })
    //
    .then(sauce => {
      //récupération du fichier
      const filename = sauce.imageUrl.split('/images/')[1];
      //suppression du fichier avec 'unlink'
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({
            _id: req.params.id
          })
          //réponse de succès code 200
          .then(() => res.status(200).json({
            message: 'Sauce supprimée !'
          }))
          .catch(error => res.status(400).json({
            error
            //réponse d'erreur avec code 400
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
      //réponse d'erreur avec code 500
    }));
};

exports.getAllSauces = (req, res, next) => {
  //Récupération de la liste compléte
  Sauce.find()
    //retour d'une Promise
    .then((sauces) => {
      res.status(200).json(sauces);
      //réponse de réussite code 200
    }).catch(
      (error) => {
        res.status(400).json({
          error
          //réponse d'erreur avec code 400
        });
      }
    );
};

exports.createLike = (req, res) => {
  //Récupération d'une seule Sauce avec 'findOne'
  Sauce.findOne({
    _id: req.params.id
  })
  // la personne n'aime pas la sauce
  if (req.body.disLikes == 1) {
    sauce.disLikes--; // ajout d'un dislike
    sauce.disLikedBy.push(arrayIndex, 1); // ajout du username + dislike dans le tableau
    sauce.save()
  }
  // la personne aime la sauce
  if (req.body.likes == 1) {
    sauce.likes++; // ajout d'un like
    sauce.likedBy.push(arrayIndex, 1); // ajout du username + like dans le tableau
    sauce.save()
  }
  // la personne s'est trompé
  if (req.body.likes == 0) {
    sauce.likes--; // annulation du like
    sauce.likedBy.splice(arrayIndex, 1);
    sauce.save()

  }


};
