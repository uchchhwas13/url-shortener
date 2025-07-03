const express = require('express');

const urlRoute = require('./routes/url');
const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});