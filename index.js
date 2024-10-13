// Import express
const express = require('express');
const app = express();

// Set up a port
const port = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
