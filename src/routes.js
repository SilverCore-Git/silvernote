const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');


router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Utilisateur connecté' : 'Utilisateur déconnecté');
});

router.get('/profile', requiresAuth(), (req, res) => {

    const res = req.query.res;
    const data = req.oidc.user;

    if (res == 'json') return res.json(data);

    res.send(`
        <html>
        <head>
            <title>Profil de ${data.name}</title>
            <style>
            body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
            .profile { max-width: 400px; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            img { border-radius: 50%; }
            h2 { margin-top: 0; }
            .info { margin: 0.5rem 0; }
            </style>
        </head>
        <body>
            <div class="profile">
            <img src="${data.picture}" alt="Photo de profil de ${data.name}" width="96" height="96" />
            <h2>${data.name}</h2>
            <div class="info"><strong>Email :</strong> ${data.email}</div>
            <div class="info"><strong>Vérifié :</strong> ${data.email_verified ? '✅ Oui' : '❌ Non'}</div>
            <div class="info"><strong>Nom complet :</strong> ${data.given_name} ${data.family_name}</div>
            <div class="info"><strong>Nickname :</strong> ${data.nickname}</div>
            <div class="info"><strong>Dernière mise à jour :</strong> ${new Date(data.updated_at).toLocaleString()}</div>
            </div>
        </body>
        </html>
    `);

});

router.get('/verify', requiresAuth(), (req, res) => {

    res.json(req.oidc.user);

})

router.get('/callback', (req, res) => {
    res.send('callback')
})

module.exports = router;