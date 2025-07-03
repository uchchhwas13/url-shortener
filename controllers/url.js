const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
  if (!req.body.url) {
    return res.status(400).json({ error: 'Required URL is missing' });
  }
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    requiredUrl: req.body.url,
    visitHistory: [],
  });

  return res.status(201).json({
    shortId: shortID,
  });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );
  res.redirect(entry.requiredUrl);
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
  handleRedirect
};
