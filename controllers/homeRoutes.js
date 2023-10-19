const router = require('express').Router();
const withAuth = require('../utils/auth');

//Prevents unauthenticated users from accessing the homepage.
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('homepage', {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Redirects the user to the root route if they are logged in.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
