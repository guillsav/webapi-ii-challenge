const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req.query);
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({message: 'The post with the specified ID does not exist.'});
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'The post information could not be retrieved.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.title !== '' && req.body.contents !== '') {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the post to the database'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await db.remove(req.params.id);
    if (post.length > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({message: 'The post with the specified ID does not exist.'});
    }
  } catch (error) {
    res.status(500).json({error: 'The post could not be removed'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (req.body.title === '' || req.body.contents === '') {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    } else {
      const editedPost = await db.update(req.params.id, req.body);
      editedPost
        ? res.status(201).json(editedPost)
        : res
            .status(404)
            .json({message: 'The post with the specified ID does not exist.'});
    }
  } catch {
    res.status(500).json({
      errorMessage: 'The post information could not be modified.'
    });
  }
});

module.exports = router;
