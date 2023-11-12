const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

//homepage displays all tech blog posts and user info.
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
//route for individual post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Comment,
          attributes: ['content', 'createdOn', 'commenter_id'],
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });
    const posterName = post.user.name;
    console.log(post);

    res.render('post', {
      ...post,
      posterName,
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

//route for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  const userPostData = await User.findOne({
    where: {
      id: req.session.user.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'createdOn', 'poster_id'],
      },
    ],
  });

  const userPosts = userPostData.get({ plain: true });
  res.render('dashboard', {
    ...userPosts,
    user: req.session.user,
    logged_in: req.session.logged_in,
  });
});

router.get('/post', withAuth, async (req, res) => {
  try {
    res.render('newpost', {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
