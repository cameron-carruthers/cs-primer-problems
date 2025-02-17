const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`Received: ${msg} from ${rinfo.address}:${rinfo.port}`);
  server.send(msg.toString().toUpperCase(), rinfo.port, rinfo.address);
});

server.bind(41234, () => {
  console.log('UDP server listening on port 41234');
});
