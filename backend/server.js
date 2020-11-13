//Importation du package http de Node
const http = require('http');
//Importation de app.js
const app = require('./app');

//Renvoi un port valide, soit sous forme d'un numéro ou d'une chaine
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Définition du port 3000
const port = normalizePort(process.env.PORT || '3000');

//Définition du port pour app.js
app.set('port', port);

//Recherche des différentes erreurs avec 'errorHandler'
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//création du server
const server = http.createServer(app);

//Ecoute des erreurs
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
