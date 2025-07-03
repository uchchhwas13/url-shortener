const express = require('express');

const urlRoute = require('./routes/url');
const { connectToDatabase } = require('./connection');
const URL = require('./models/url');

const app = express();
const port = 8000;

connectToDatabase('mongodb://localhost:27017/short-url');

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/url', urlRoute);

app.get('/list', async (req, res) => {
  const urls = await URL.find({});
  console.log('List of URLs:', urls);
  return res.send(`
    <html>
    <head>
      <title>URL Shortener</title>
    </head>
    <body>
    <h1>List of URLs</h1>
    <ol>
      ${urls.map((url) => `<li>${url.shortId}" - ${url.requiredUrl} ${url.visitHistory.length}</li>`).join(' ')}
    </ol>
    </body>
    </html>
  `);
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
