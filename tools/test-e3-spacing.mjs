import puppeteer from 'puppeteer-core';

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
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    document.getElementById('e3').scrollIntoView({ behavior: 'instant' });
    const s = document.createElement('style');
    s.id = 'e3-spacing-test';
    s.textContent = `
      #e3 .col {
        padding: 10.5svh 0 34svh !important;
        justify-content: center !important;
      }
      #e3 h2 {
        font-size: 2.2em !important;
        margin-top: 0.15rem !important;
      }
      #e3 .orn {
        margin: 0.5rem auto !important;
      }
      #e3 .btn {
        margin-top: 0.8rem !important;
      }
      #e3 .big {
        margin-top: 0.2rem !important;
      }
    `;
    document.head.appendChild(s);
  });

  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/e3-test-390px.png' });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    document.getElementById('e3').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/e3-test-1440px.png' });

  await browser.close();
  console.log('Saved e3 spacing test screenshots');
})();

