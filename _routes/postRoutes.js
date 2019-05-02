const Router = require('express-promise-router');
const router = new Router();
const {
  getAllPosts,
  getAllPostsByAuthor,
  updatePostWithId,
  deletePostWithId
} = require('../_queries');

module.exports = router;

router.get('/all', async (req, res) => {
  try {
    console.log(getAllPosts);
    const allPosts = await getAllPosts();
    console.log(allPosts);
    return res.json(allPosts);
  } catch (error) {
    return res.status(500).json({ error: `Error from server ${error}` });
  }
});

router.post('/by-author', async (req, res) => {
  debugger;
  if (!req.body.author) {
    return res
      .status(400)
      .send({ error: 'Could not find author with value in request body' });
  }

  const {
    body: { author },
    producer,
    consumer
  } = req;

  let fetchedAuthorInfo;

  try {
    await producer.connect();
    console.log(consumer);

    await consumer.subscribe({ topic: 'author_reply' });

    await producer.send({
      topic: 'author',
      messages: [{ value: Buffer.from(author) }],
      acks: 1
    });

    producer.disconnect();

    await consumer.connect();

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${
          message.timestamp
        }`;

        fetchedAuthorInfo = JSON.parse(message.value.toString('utf8'));
        debugger;
      }
    });

    debugger;

    if (fetchedAuthorInfo) {
      const { id, username } = fetchedAuthorInfo;

      debugger;
      const allPostByAuthor = await getAllPostsByAuthor(id);
      debugger;
      console.log(allPostsByAuthor);
      if (!allPostByAuthor[0]) {
        return res
          .status(404)
          .send({ message: `${username} has not written any posts!` });
      }

      return res.send(allPostByAuthor);
    }

    // throw new Error('Could not find an author with this name!');
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
