//importation du package multer
const multer = require('multer');

//type de fichier accepté
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//création de l'objet de configuration de Multer
const storage = multer.diskStorage({
  //où eregistrer les images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    //permet de générer un nouveau nom pour les images (évite doublon)
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//export du Middleware
module.exports = multer({
  storage: storage
}).single('image');
