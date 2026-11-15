import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testFix() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Test replacing button with div and removing height attribute
  const fixedHeights = await page.evaluate(() => {
    document.querySelectorAll('.pl').forEach(el => {
      const img = el.querySelector('img');
      if (img) {
        img.removeAttribute('height');
        img.removeAttribute('width');
      }
    });

    return Array.from(document.querySelectorAll('.pl')).map(el => {
      const img = el.querySelector('img');
      return {
        caption: el.querySelector('span')?.textContent,
        plHeight: el.offsetHeight,
        plWidth: el.offsetWidth,
        imgHeight: img ? img.offsetHeight : 0,
        imgWidth: img ? img.offsetWidth : 0,
        ar: getComputedStyle(el).getPropertyValue('--ar')
      };
    });
  });

  console.log('Fixed heights:', fixedHeights);
  await browser.close();
}

testFix().catch(console.error);

