// Snippets de código para poder componer el programa

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: 

// Importa los middlewares desde el archivo middlewares.js.

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación:

// Importa el modulo 'body-parser'.

//Usado?: YES
const session = require('express-session');
//--- Explicación:

// Importa el modulo 'express-session'.

//Usado?: YES
const express = require('express');
//--- Explicación:

// Importa el modulo 'express'.

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación:

// Importa el modulo 'body-parser'.

//Usado?: YES
const session = require('express-session');
//--- Explicación:

// Importa el modulo 'express-session'.

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación:

// Importa el modulo 'dotenv'.

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación:

// Importa los middlewares desde el archivo middlewares.js.

//Usado?: YES
const routes = require('./routes');
//--- Explicación:

// Importa las rutas desde el archivo routeS.js

//Usado?: YES
dotenv.config();
//--- Explicación:

// Busca un archivo .env en el directorio del proyecto y carga las variables definidas en el.

//Usado?: YES
const app = express();
//--- Explicación:

// Crea una instancia de express.

//Usado?: YES
const PORT = 4000;
//--- Explicación:

// Define el puerto en el que se ejecutará el servidor.

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación:

// Importa el modulo 'dotenv'.

//Usado?:YES
dotenv.config();
//--- Explicación:

// Busca un archivo .env en el directorio del proyecto y carga las variables definidas en el.

//Usado?:YES
middlewares.setupApp(app);
//--- Explicación: 

// Llama a la función 'setupApp' desde el archivo 'middlewares.js'.

//Usado?:YES
routes.setup(app);
//--- Explicación: 

// Llama a la función 'setupApp' desde el archivo 'routeS.js'.

//Usado?: YES
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 

// Valida si la palabra introducida coincide con la palabra correcta.


//Usado?: YES
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 

// Crea una ruta para la página de inicio.

//Usado?: YES
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 

// Crea un formulario para introducir la palabra.

const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};

//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// Crea una ruta para el perfil de usuario.

//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// Se utiliza en aplicaciones Express.js para configurar el middleware de parsing de cuerpos de solicitud

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación:

// Se utiliza en aplicaciones Express.js para configurar el middleware de sesión.

//Usado?:
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 

// Inicia el servidor

//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 

// Valida si el usuario ya ha iniciado sesión.


//Usado?: YES
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// Crea una ruta para el perfil de usuario.

//Usado?: YES
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 

// Crea una ruta para cerrar la sesión.

//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación:

// Exporta la funcion 'setup'.

//Usado?: YES
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:

// Exporta las funciones 'validarPalabraMiddleware', 'verificarSesionMiddleware' y 'setupAPP'.