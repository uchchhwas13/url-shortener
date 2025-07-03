const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    if (!req.body.url) {
        return res.status(400).json({error: 'Required URL is missing'});
    }  
    const shortID = nanoid(8); 
    await URL.create({
        shortId: shortID,
        requiredUrl: req.body.url,
        visitHistory: []
    });

    return res.status(201).json({
        shortId: shortID
    });
}

module.exports = {
    handleGenerateNewShortUrl
};
