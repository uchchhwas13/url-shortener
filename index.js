const express = require('express');

const urlRoute = require('./routes/url');
const {connectToDatabase} = require('./connection');

const app = express();
const port = 8000;

connectToDatabase('mongodb://localhost:27017/short-url')

app.use(express.json());
app.use("/url", urlRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});