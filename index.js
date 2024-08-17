const express = require('express');
const cors = require('cors');  // Correct import for cors package
const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000']
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Middleware to log IP
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  console.log('Client IP:', ip);
  next();
});

// Endpoint to get IP address
app.get('/api/get-ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  
  // Format IP Address
  let formattedIP = ip;
  if (ip.includes('::ffff:')) {
    formattedIP = ip.split('::ffff:')[1];
  } else if (ip === '::1' || ip === '127.0.0.1') {
    formattedIP = 'Localhost';
  }

  res.json({ ip: formattedIP });
});

// Endpoint to receive IP from client
app.post('/api/save-ip', (req, res) => {
  const { ip } = req.body;
  console.log('Received local IP:', ip);
  res.json({ message: 'IP received', ip });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
