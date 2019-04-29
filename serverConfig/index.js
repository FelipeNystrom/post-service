const express = require('express');
const sanitize = require('sanitize');
const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.KafkaClient;
const client = new Client({ kafkaHost: 'kafka:9092' });
const producer = new HighLevelProducer(client);
const Consumer = kafka.Consumer;

const topics = [{ topic: 'author', partition: 0 }];

const consumer = new Consumer(client, topics);

const kafkaInit = (req, res, next) => {
  req.producer = producer;
  req.client = client;
  debugger;
  next();
};

module.exports = server => {
  server.use(sanitize.middleware);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(kafkaInit);
};
