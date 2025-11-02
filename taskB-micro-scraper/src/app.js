const express = require('express');
const scrapeController = require('./controllers/scrapeController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Micro Scraper API is running',
    endpoints: {
      scrape: '/api/scrape?url=YOUR_URL'
    }
  });
});

// Scrape endpoint
app.get('/api/scrape', scrapeController.scrape);

// Error handling middleware
app.use(errorHandler);

module.exports = app;