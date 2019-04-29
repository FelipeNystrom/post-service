const express = require('express');
const sanitize = require('sanitize');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'postService-test-producer',
  brokers: ['kafka:9092']
});

const kafkaInit = (req, res, next) => {
  req.producer = kafka.producer();
  next();
};

module.exports = server => {
  server.use(sanitize.middleware);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(kafkaInit);
};
