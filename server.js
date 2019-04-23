const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const postsRouter = require('./posts/posts-router.js');

server.use(express.json());
server.use(bodyParser.urlencoded({extended: false}));

server.get('/', (req, res) => {
  res.send(`
  <h2>Posts API</h>
  <p>Posts API</p>`);
});

server.use('/api/posts', postsRouter);

module.exports = server;
