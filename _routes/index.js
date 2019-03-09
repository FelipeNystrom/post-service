const postRoutes = require('./postRoutes');

module.exports = server => {
  server.use('/posts', postRoutes);
};
