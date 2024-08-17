const express = require('express');
const app = express();
const port = 3000;

app.set('trust proxy', true); // Enable if behind a proxy

// Controller to get the IP address
app.get('/api/get-ip', (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

  // Handle IPv6 and IPv4-mapped IPv6 addresses
  if (ip.includes('::ffff:')) {
    ip = ip.split('::ffff:')[1];
  }

  if (ip.includes(',')) {
    ip = ip.split(',')[0];
  }

  res.json({ ip });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
