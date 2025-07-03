const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const { clerkMiddleware, clerkClient, requireAuth, getAuth } = require('@clerk/express');

const app = express();
const PORT = 3033;

app.use(clerkMiddleware())
app.use(express.json());
app.use(morgan('dev'));

app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

const router = require('./routes');
app.use('/', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
