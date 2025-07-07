const express = require('express');
const URL = require('../models/url');

const router = express.Router();


router.get('/', async (req, res) => {
console.log('User in request:', req.user);
  if (!req.user) return res.redirect('/login');
    console.log('User is logged in:', req.user._id);
  const allUrls = await URL.find({createdBy: req.user._id});
  console.log('All URLs for user:', allUrls);
  res.render('home', {
    urls: allUrls,
  });
});

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.get('/login', (req, res) => {
  return res.render('login');
});

module.exports = router;
