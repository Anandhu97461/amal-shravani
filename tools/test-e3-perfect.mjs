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
    const e3 = document.getElementById('e3');
    e3.scrollIntoView({ behavior: 'instant' });
    e3.classList.add('in');
    
    // Make all .rv in e3 visible immediately without transitions for inspection
    const style = document.createElement('style');
    style.id = 'e3-test-style';
    style.textContent = `
      #e3 .rv {
        opacity: 1 !important;
        transform: none !important;
      }
      #e3 .col {
        padding: 13.5svh 0 34svh !important;
        justify-content: center !important;
      }
      #e3 h2 {
        font-size: 2.3em !important;
        margin-top: 0.15rem !important;
        line-height: 0.95 !important;
      }
      #e3 .orn {
        margin: 0.45rem auto !important;
      }
      #e3 .btn {
        margin-top: 0.65rem !important;
        padding: 0.65em 1.6em !important;
      }
      #e3 .big {
        margin-top: 0.2rem !important;
      }
      #e3 .meta {
        margin-top: 0.15rem !important;
      }
    `;
    document.head.appendChild(style);
  });

  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/e3-perfect-390px.png' });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    document.getElementById('e3').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/e3-perfect-1440px.png' });

  await browser.close();
  console.log('Saved e3 perfect screenshots');
})();

