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
    const style = document.createElement('style');
    style.textContent = `
      #hero .chb {
        top: -8svh !important;
        width: calc(var(--cw) * 0.12) !important;
        left: 12% !important;
      }
      #hero .lan {
        top: -8svh !important;
        width: calc(var(--cw) * 0.12) !important;
        right: 12% !important;
      }
      #hero .gar {
        height: calc(var(--cw) * 0.32) !important;
      }
      #hero .col {
        justify-content: flex-start !important;
        padding-top: 7svh !important;
        width: calc(var(--cw) * 0.82) !important;
      }
      #hero .sym {
        gap: 1.2rem !important;
        margin-bottom: 0.4rem !important;
      }
      #hero .sym svg {
        width: 2.2em !important;
        height: 2.2em !important;
      }
      #hero .hero-tagline {
        font-size: 0.78em !important;
        letter-spacing: 0.22em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
        margin-bottom: 0.2rem !important;
      }
      #hero h1 {
        font-size: 4.2em !important;
        line-height: 0.95 !important;
      }
      #hero .script {
        font-size: 2.8em !important;
        margin: -0.02em 0 !important;
      }
      #hero .hero-quote {
        margin-top: 0.6rem !important;
        font-size: 1.28em !important;
        color: #3d4a26 !important;
        line-height: 1.3 !important;
      }
      #hero .hero-dates {
        margin-top: 0.6rem !important;
        font-size: 0.82em !important;
        letter-spacing: 0.2em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
      }
    `;
    document.head.appendChild(style);
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/hero-bigger-390px.png' });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/hero-bigger-1440px.png' });

  await browser.close();
  console.log('Saved tools/hero-bigger screenshots');
})();

