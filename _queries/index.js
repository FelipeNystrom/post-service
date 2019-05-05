const db = require('../_db');
module.exports = {
  getAllPosts: () => {
    const sql = 'SELECT * FROM post_service.posts;';
    console.log(db);
    return db.manyOrNone(sql);
  },
  getAllPostsByAuthor: author => {
    const sql = 'SELECT * FROM post_service.posts WHERE author = $1';
    return db.manyOrNone(sql, [author]);
  },
  updatePostWithId: (id, title, body, author, images) => {
    const sql =
      'UPDATE post_service.posts SET title = $2, body = $3, author = $4, images = $5 WHERE id = $1';
    return db.oneOrNone(sql, [id, title, body, author, images]);
  },
  deletePostWithId: id => {
    const sql = 'DELETE FROM post_service.posts WHERE id = $1 RETURNING *';
    return db.oneOrNone(sql, [id]);
  }
};
