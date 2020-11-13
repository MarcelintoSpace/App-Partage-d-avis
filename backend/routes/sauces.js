//Importation du router d'Express
const express = require('express');
const router = express.Router();

//importation des controllers
const saucesCtrl = require('../controllers/sauces');

//importation des Middleware 'auth' et 'Multer'
const auth = require('../middelware/auth');

//importation du middelware Multer
const multer = require('../middelware/multer-config');

//Définition des Router
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/:id/like', auth, saucesCtrl.createLike);

//exportation des router
module.exports = router;
