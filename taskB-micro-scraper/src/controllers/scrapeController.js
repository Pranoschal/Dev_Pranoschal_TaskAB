const scraperService = require('../services/scraperService');
const { isValidUrl } = require('../utils/validators');

exports.scrape = async (req, res, next) => {
  try {
    const { url } = req.query;

    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const result = await scraperService.scrapePage(url);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};