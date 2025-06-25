
const express = require('express');
const morgan = require('morgan');
const { auth } = require('express-openid-connect');
const proxy = require('express-http-proxy');
require('dotenv').config();


const app = express();
const PORT = 3033;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'https://auth.silvernote.fr',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};


app.use(auth(config));
app.use(express.json());
app.use(morgan('dev'));

const router = require('./routes');
app.use('/', router);

app.use('/auth0', proxy('dev-ojbmzr24ly4ic8z2.us.auth0.com', {
  proxyReqPathResolver: req => req.originalUrl.replace('/auth0', '')
}));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});


app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});