const net = require('net');

const client = new net.Socket();

// Server details
const PORT = 8080; // Adjust to match your server
const HOST = 'localhost';

// Connect to the server
client.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  // Send an HTTP POST request with headers and a message (body)
  const message = JSON.stringify({ name: 'Test Client', message: 'Hello, server!' });
  const httpRequest = 
    `POST /send-message HTTP/1.1\r\n` +
    `Host: ${HOST}\r\n` +
    `Content-Type: application/json\r\n` +
    `Content-Length: ${Buffer.byteLength(message)}\r\n` +
    `Connection: keep-alive\r\n\r\n` + 
    `${message}`;

  client.write(httpRequest);
});

// Listen for data from the server
client.on('data', (data) => {
  console.log('Received from server:\n', data.toString());
  client.end(); // Close the connection
});

// Handle connection close
client.on('close', () => {
  console.log('Connection closed');
});

// Handle errors
client.on('error', (err) => {
  console.error('Error:', err.message);
});
