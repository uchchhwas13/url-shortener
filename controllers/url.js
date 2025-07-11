const { nanoid } = require('nanoid');
const URL = require('../models/url');
const { all } = require('../routes/staticRouter');

async function handleGenerateNewShortUrl(req, res) {
  if (!req.body.url) {
    return res.status(400).json({ error: 'Required URL is missing' });
  }
  console.log('user id while creating short url:', req.user._id);
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  const allUrls = await URL.find({ createdBy: req.user._id });
  //console.log('All URLs for user:', allUrls);
  return res.render('home', {
    shortId: shortID,
    urls: allUrls
  });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  console.log('Redirecting for shortId:', shortId);
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );
  //console.log('Redirecting to:', entry.redirectUrl);
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId: shortId });
  console.log('Request for analytics:', entry);
  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }
  return res.status(200).json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirect,
};
