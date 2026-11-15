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

  // 1. Phone 390x844
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'screenshots/hero-phone-390px.png' });

  // 2. PC 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/hero-pc-1440px.png' });

  // 3. PC 1920x1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/hero-pc-1920px.png' });

  // 4. PC 1366x768 (Standard laptop)
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/hero-pc-1366px.png' });

  await browser.close();
  console.log('Captured all hero screenshots successfully');
})();

