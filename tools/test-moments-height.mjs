import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testMoments() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const heights = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.pl')).map(el => {
      const img = el.querySelector('img');
      return {
        tag: el.tagName,
        plHeight: el.offsetHeight,
        plWidth: el.offsetWidth,
        imgHeight: img ? img.offsetHeight : 0,
        imgWidth: img ? img.offsetWidth : 0,
        ar: getComputedStyle(el).getPropertyValue('--ar'),
        imgAspectRatio: img ? getComputedStyle(img).aspectRatio : ''
      };
    });
  });

  console.log('Current localhost:5173 heights:', heights);
  await browser.close();
}

testMoments().catch(console.error);

