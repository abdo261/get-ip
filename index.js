const express = require('express');
const app = express();
const port = 3000;


app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  console.log('Client IP:', ip);
  next();
});


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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
