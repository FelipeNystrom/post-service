const db = require('../_db');

export const getAllPosts = () => {
  const sql = 'SELECT * FROM posts';
  return db.manyOrNone(sql);
};

export const getAllPostsByAuthor = author => {
  const sql = 'SELECT * FROM posts WHERE author = $1';
  return db.manyOrNone(sql, [author]);
};

export const updatePostWithId = (id, title, body, author, images) => {
  const sql =
    'UPDATE posts SET title = $2, body = $3, author = $4, images = $5 WHERE id = $1';
  return db.one(sql, [id, title, body, author, images]);
};

export const deletePostWithId = id => {
  const sql = 'DELETE FROM posts WHERE id = $1 RETURNING *';
  return db.oneOrNone(sql, [id]);
};
