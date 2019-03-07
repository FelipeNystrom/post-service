const server = require('express')();

const _port = process.env.PORT || 4001;

server.listen(_port, () => {
  console.log('post service is up and running on ' + _port);
});
