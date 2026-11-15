import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const s = document.createElement('style');
    s.id = 'scale-test';
    s.textContent = `
      section {
        font-size: clamp(15px, calc(var(--cw) / 21), 24px) !important;
      }
      @media (min-width: 768px) {
        #hero .col {
          padding-top: 5.5svh !important;
          width: calc(var(--cw) * 0.86) !important;
        }
        #hero .sym {
          gap: 1.2rem !important;
          margin-bottom: 0.35rem !important;
        }
        #hero .sym svg {
          width: 2.1em !important;
          height: 2.1em !important;
        }
        #hero .hero-tagline {
          font-size: 0.78em !important;
          letter-spacing: 0.22em !important;
          margin-bottom: 0.2rem !important;
        }
        #hero h1 {
          font-size: 3.9em !important;
          line-height: 0.95 !important;
        }
        #hero .script {
          font-size: 2.6em !important;
          margin: -0.02em 0 !important;
        }
        #hero .hero-quote {
          margin-top: 0.5rem !important;
          font-size: 1.24em !important;
          line-height: 1.25 !important;
        }
        #hero .hero-dates {
          margin-top: 0.45rem !important;
          font-size: 0.82em !important;
          letter-spacing: 0.2em !important;
        }
      }
    `;
    document.head.appendChild(s);
  });

  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'tools/scaled-1920px.png' });

  // Also check 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/scaled-1440px.png' });

  // Also check 390x844 (Mobile) to make sure mobile is unaffected
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/scaled-390px.png' });

  await browser.close();
  console.log('Saved scaled screenshots');
})();

