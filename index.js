const express = require('express');
const app = express();
const port = 3000;

// Controller to get the IP address
app.get('/api/get-ip', (req, res) => {
  // Get the IP address from the request
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

 
  res.json({ ip });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
