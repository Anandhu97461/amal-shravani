import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testFeatures() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 1000));

  // Check Calendar buttons
  const calCount = await page.evaluate(() => document.querySelectorAll('[data-cal-id]').length);
  console.log(`Add to Calendar buttons rendered: ${calCount} (expected: 3)`);

  // Click e1 calendar button
  await page.click('[data-cal-id="e1"]');
  console.log('Clicked e1 Add to Calendar button');

  // Check 6-dot navigation
  const navDots = await page.evaluate(() => document.querySelectorAll('.nav a').length);
  console.log(`Nav dots count: ${navDots} (expected: 6)`);

  // Check carousel dots
  const carouselDots = await page.evaluate(() => document.querySelectorAll('.dts button').length);
  console.log(`Carousel dots count: ${carouselDots} (expected: 4)`);

  // Check polaroids count
  const polaroidsCount = await page.evaluate(() => document.querySelectorAll('.pl').length);
  console.log(`Polaroids count: ${polaroidsCount} (expected: 8)`);

  // Test lightbox open and close
  await page.click('.pl');
  await new Promise(r => setTimeout(r, 500));
  const isLbOpen = await page.evaluate(() => document.getElementById('lb').classList.contains('on'));
  console.log(`Lightbox opened on polaroid click: ${isLbOpen}`);

  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));
  const isLbClosed = await page.evaluate(() => !document.getElementById('lb').classList.contains('on'));
  console.log(`Lightbox closed on Escape key: ${isLbClosed}`);

  // Test reduced motion
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  const petalsDisplay = await page.evaluate(() => getComputedStyle(document.getElementById('petals')).display);
  console.log(`Petals canvas display under prefers-reduced-motion: ${petalsDisplay} (expected: none)`);

  console.log(`Total browser console/page errors encountered: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Errors:', errors);
  }

  await browser.close();
}

testFeatures().catch(console.error);

