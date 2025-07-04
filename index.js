const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('./connection');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');
const URL = require('./models/url');

const app = express();
const port = 8000;

// Import routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

// Connect to MongoDB
connectToDatabase('mongodb://localhost:27017/short-url');

// Set up EJS as the view engine
// and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

app.get('/list', async (req, res) => {
  const urls = await URL.find({});
  console.log('List of URLs:', urls);
  return res.render("home", {
    urls: urls
  });
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
