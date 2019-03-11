const express = require('express');
const sanitize = require('sanitize');

module.exports = server => {
  server.use(sanitize.middleware);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};
