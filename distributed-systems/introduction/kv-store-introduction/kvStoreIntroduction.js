const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const keyValueStore = {};

server.on('message', (msg, rinfo) => {
  console.log(`Received: ${msg} from ${rinfo.address}:${rinfo.port}`);

  const [command, key, value] = msg.toString().split(' ');

  if (command === 'SET') {
    if (!key || !value) {
      server.send('ERROR set command requires a key and value', rinfo.port, rinfo.address);
    }

    keyValueStore[key] = value;
    server.send('OK', rinfo.port, rinfo.address);
  }

  if (command === 'GET') {
    if (!key) {
      server.send('ERROR get command requires a key', rinfo.port, rinfo.address);
    }

    server.send(`${key} ${keyValueStore[key]}`, rinfo.port, rinfo.address);
  }

  server.send('ERROR unknown command', rinfo.port, rinfo.address);
});

server.bind(41234, () => {
  console.log('UDP server listening on port 41234');
});
