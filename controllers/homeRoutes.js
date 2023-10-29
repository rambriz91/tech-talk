const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User } = require('../models');

//Prevents unauthenticated users from accessing the homepage.
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
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

//route for sign-up
router.get('/sign-up', async (req, res) => {
  res.render('signup');
});

module.exports = router;
