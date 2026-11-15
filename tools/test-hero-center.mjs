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

  // Test 1: Just centered
  await page.evaluate(() => {
    const col = document.querySelector('#hero .col');
    col.style.justifyContent = 'center';
    col.style.padding = '20svh 0 12svh';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/hero-test-centered-390px.png' });

  // Test on 1440px
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/hero-test-centered-1440px.png' });

  await browser.close();
  console.log('Done test captures');
})();

