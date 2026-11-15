import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  const filePath = 'file:///' + path.resolve('wedding-invite-single.html').replace(/\\/g, '/');
  console.log('Navigating to:', filePath);
  await page.goto(filePath, { waitUntil: 'load' });

  // 1. Gate screenshot
  await page.screenshot({ path: 'screenshots/standalone-gate.png' });

  // 2. Open invitation
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2600));
  await page.screenshot({ path: 'screenshots/standalone-hero.png' });

  // 3. Scroll to story
  await page.evaluate(() => document.getElementById('story').scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'screenshots/standalone-story.png' });

  // 4. Scroll to e1
  await page.evaluate(() => document.getElementById('e1').scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'screenshots/standalone-e1.png' });

  // 5. Scroll to e3
  await page.evaluate(() => document.getElementById('e3').scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'screenshots/standalone-e3.png' });

  // 6. Scroll to rsvp
  await page.evaluate(() => document.getElementById('rsvp').scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'screenshots/standalone-rsvp.png' });

  await browser.close();
  console.log('Standalone HTML verified successfully on all sections');
})();

