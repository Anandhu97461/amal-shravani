import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testChanges() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 1200));

  // 1. Music Button Position Check
  const musicPos = await page.evaluate(() => {
    const btn = document.getElementById('music-toggle');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    const style = getComputedStyle(btn);
    return {
      bottom: style.bottom,
      left: style.left,
      rectBottom: rect.bottom,
      rectLeft: rect.left,
      viewportHeight: window.innerHeight
    };
  });
  console.log('Music toggle button positioning:', musicPos);

  // 2. Add to Calendar Check
  const calButtonsCount = await page.evaluate(() => {
    return document.querySelectorAll('[data-cal-id], .cal-btn').length;
  });
  console.log('Calendar buttons count:', calButtonsCount, '(expected: 0)');

  // 3. Event Location Buttons Check
  const locationButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.ev .btn')).map(b => ({
      text: b.textContent.trim(),
      href: b.href
    }));
  });
  console.log('Event buttons found:');
  console.table(locationButtons);

  // Capture screenshot of e1 showing clean single VIEW LOCATION button
  await page.evaluate(() => {
    document.getElementById('e1').scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.resolve('screenshots/e1-1440px.png') });
  console.log('✓ Updated e1-1440px.png');

  await browser.close();
}

testChanges().catch(console.error);

