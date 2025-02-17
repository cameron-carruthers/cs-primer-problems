const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// Send a message to the server
const message = Buffer.from('Hello Server!');
client.send(message, 41234, 'localhost', (err) => {
  if (err) {
    console.error(err);
    client.close();
  } else {
    console.log('Message sent');
  }
});

// Handle responses from the server
client.on('message', (msg, rinfo) => {
  console.log(`Received: ${msg} from ${rinfo.address}:${rinfo.port}`);
  client.close(); // Close the client
});