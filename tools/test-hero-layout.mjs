import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    // Style adjustments
    const style = document.createElement('style');
    style.textContent = `
      #hero .chb {
        top: -4svh;
        width: calc(var(--cw) * 0.13) !important;
        left: 21% !important;
      }
      #hero .lan {
        top: -4svh;
        width: calc(var(--cw) * 0.13) !important;
        right: 21% !important;
      }
      #hero .gar {
        height: calc(var(--cw) * 0.36) !important;
      }
      #hero .col {
        justify-content: flex-start !important;
        padding-top: 6svh !important;
      }
      #hero .sym {
        margin-bottom: 0.25rem !important;
      }
      #hero .sym svg {
        width: 1.7em !important;
        height: 1.7em !important;
      }
      #hero .hero-tagline {
        font-size: 0.65em !important;
        letter-spacing: 0.18em !important;
      }
      #hero h1 {
        font-size: 3.1em !important;
        line-height: 0.95 !important;
      }
      #hero .script {
        font-size: 2.1em !important;
        margin: -0.05em 0 !important;
      }
      #hero .hero-quote {
        margin-top: 0.35rem !important;
        font-size: 1.05em !important;
      }
      #hero .hero-dates {
        margin-top: 0.35rem !important;
        font-size: 0.66em !important;
      }
    `;
    document.head.appendChild(style);
  });

  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/hero-adjusted-390px.png' });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/hero-adjusted-1440px.png' });

  await browser.close();
  console.log('Saved tools/hero-adjusted screenshots');
})();

