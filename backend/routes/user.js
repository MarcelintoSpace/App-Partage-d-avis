//importation du package router d'Express
const express = require('express');
const router = express.Router();

//assignation des controllers
const userCtrl = require('../controllers/user');

//définition du chemin 'signup' et 'login'
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation du router
module.exports = router;
