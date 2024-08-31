const express = require('express');
const session = require('express-session');
const app = express();
const middlewares = require('./middlewares');
const routes = require('./routes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
routes.setup(app);
middlewares.setupAPP(app);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
    res.send(`
      <h1>Ruta del Perfil (Sesión activa)</h1>
      <form method="post" action="/logout">
        <button type="submit">Log Out</button>
      </form>
    `);
});

app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
    res.send(`
      <h1>Ruta del Perfil</h1>
      <form method="post" action="/logout">
        <button type="submit">Log Out</button>
      </form>
    `);
});


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/');
    });
});

app.use(session({
    secret: process.env.palabraSecreta || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
}));

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});