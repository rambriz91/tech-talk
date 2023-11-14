const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      createdOn: new Date(),
      poster_id: req.session.user.id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedPostData) {
      res.status(404).json({ message: 'No post found with this id!' });
    }
    res.status(200).json(deletedPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
