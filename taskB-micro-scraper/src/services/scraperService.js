const puppeteer = require('puppeteer');

const TIMEOUT = parseInt(process.env.SCRAPER_TIMEOUT) || 20000;

class ScraperService {
  async scrapePage(url) {
    let browser = null;

    try {
      // Launch browser
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      await this.navigateWithRetry(page, url, TIMEOUT);

      // Extract data
      const data = await page.evaluate(() => {
        const getMetaContent = (name) => {
          const meta = document.querySelector(`meta[name="${name}"]`) || 
                       document.querySelector(`meta[property="og:${name}"]`);
          return meta ? meta.content : '';
        };

        return {
          title: document.title || '',
          metaDescription: getMetaContent('description'),
          h1: document.querySelector('h1')?.innerText || '',
          status: 200
        };
      });

      return data;
    } catch (error) {
      if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
        const timeoutError = new Error('Timeout');
        timeoutError.statusCode = 504;
        throw timeoutError;
      }
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async navigateWithRetry(page, url, timeout, retries = 1) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: timeout
        });
        return; 
      } catch (error) {
        if (attempt === retries) {
          throw error; 
        }
        console.log(`Navigation attempt ${attempt + 1} failed, retrying...`);
      }
    }
  }
}

module.exports = new ScraperService();