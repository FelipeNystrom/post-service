const db = require('../_db');
module.exports = {
  getAllPosts: () => {
    const sql = 'SELECT * FROM posts';
    return db.manyOrNone(sql);
  },
  getAllPostsByAuthor: author => {
    const sql = 'SELECT * FROM posts WHERE author = $1';
    return db.manyOrNone(sql, [author]);
  },
  updatePostWithId: (id, title, body, author, images) => {
    const sql =
      'UPDATE posts SET title = $2, body = $3, author = $4, images = $5 WHERE id = $1';
    return db.oneOrNone(sql, [id, title, body, author, images]);
  },
  deletePostWithId: id => {
    const sql = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    return db.oneOrNone(sql, [id]);
  }
};
