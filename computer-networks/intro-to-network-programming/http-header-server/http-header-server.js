const net = require('net');

const PORT = 8080;

const server = net.createServer((socket) => {
  console.log('Client connected!');

  socket.on('data', (data) => {
    console.log(`Message received: ${data.toString()}`)
    const [metadata] = data.toString().split('\r\n\r\n');

    const headers =
      metadata
        .split('\r\n')
        .slice(1)
        .reduce((acc, curr) => {
          const [key, value] = curr.split(': ');
          acc[key] = value;
          return acc;
        }, {})

    socket.write(`HTTP/1.1 200 ok\r\n\r\n${JSON.stringify(headers)}`);
    socket.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
