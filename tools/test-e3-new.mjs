import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Mobile 390x844
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to #e3
  await page.evaluate(() => {
    document.getElementById('e3').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'screenshots/e3-new-390px.png' });

  // PC 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    document.getElementById('e3').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'screenshots/e3-new-1440px.png' });

  await browser.close();
  console.log('Saved e3 screenshots');
})();

