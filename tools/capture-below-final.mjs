import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Mobile 390px
  const p1 = await browser.newPage();
  await p1.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await p1.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await p1.click('#open');
  await new Promise(r => setTimeout(r, 2600));
  await p1.screenshot({ path: 'screenshots/hero-phone-390px.png' });
  await p1.close();

  // 2. PC 1440px
  const p2 = await browser.newPage();
  await p2.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await p2.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await p2.click('#open');
  await new Promise(r => setTimeout(r, 2600));
  await p2.screenshot({ path: 'screenshots/hero-pc-1440px.png' });
  await p2.close();

  // 3. PC 1920px
  const p3 = await browser.newPage();
  await p3.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await p3.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await p3.click('#open');
  await new Promise(r => setTimeout(r, 2600));
  await p3.screenshot({ path: 'screenshots/hero-pc-1920px.png' });
  await p3.close();

  await browser.close();
  console.log('Final screenshots captured');
})();

