const Router = require('express-promise-router');
const router = new Router();
const {
  getAllPosts,
  getAllPostsByAuthor,
  updatePostWithId,
  deletePostWithId
} = require('../_queries');

module.exports = router;

router.get('/all', async (_, res) => {
  try {
    const allPosts = await getAllPosts();
    res.send(allPosts);
  } catch (error) {
    res.status(500).send({ error: `Error from server ${error}` });
  }
});

router.post('/by-author', async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .send({ error: 'Could not find id with value in request body' });
  }

  const {
    body: { id }
  } = req;
  try {
    const allPostByAuthor = await getAllPostsByAuthor(id);

    if (!allPostByAuthor[0]) {
      return res
        .status(404)
        .send({ message: 'There is no author with this id' });
    }

    return res.send(allPostByAuthor);
  } catch (error) {
    return res.status(500).send({ error: `Error from server ${error}` });
  }
});

router.put('/update', async (req, res) => {
  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.body ||
    !req.body.author ||
    !req.body.images
  ) {
    return res.status(400).send({
      error: 'You have to provide id, title, body, author and images in body'
    });
  }

  debugger;

  const {
    body: { id, title, body, author, images }
  } = req;
  try {
    const updatedPost = await updatePostWithId(id, title, body, author, images);

    if (!updatedPost) {
      return res.status(404).send({ message: 'We could not update the post' });
    }

    return res.send(updatedPost);
  } catch (error) {
    return res.status(500).send({ error: `Error from server ${error}` });
  }
});

router.delete('/delete', async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .send({ error: 'Could not find id with value in request body' });
  }

  const {
    body: { id }
  } = req;
  try {
    const deletePost = await deletePostWithId(id);
    debugger;

    if (!deletePost) {
      return res.status(404).send({
        message: 'Post could not be removed. Did not find a post with this id'
      });
    }

    return res.send({ message: `Post is with ${deletePost.title} is deleted` });
  } catch (error) {
    return res.status(500).send({ error: `Error from server ${error}` });
  }
});
