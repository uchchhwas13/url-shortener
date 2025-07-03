const express = require('express');

const urlRoute = require('./routes/url');
const { connectToDatabase } = require('./connection');
const URL = require('./models/url');

const app = express();
const port = 8000;

connectToDatabase('mongodb://localhost:27017/short-url');

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  // Here you would typically look up the URL by shortId in your database
  // and redirect to the original URL.
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );
  res.redirect(entry.requiredUrl);
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
