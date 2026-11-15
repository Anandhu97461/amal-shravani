import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    let el = document.getElementById('test-bell-style-2');
    if (!el) {
      el = document.createElement('style');
      el.id = 'test-bell-style-2';
      document.head.appendChild(el);
    }
    el.textContent = `
      #hero .chb {
        top: 0px !important;
        width: calc(var(--cw) * 0.13) !important;
        left: 14% !important;
      }
      #hero .lan {
        top: 0px !important;
        width: calc(var(--cw) * 0.13) !important;
        right: 14% !important;
      }
      #hero .col {
        padding-top: 6svh !important;
        width: calc(var(--cw) * 0.84) !important;
      }
      #hero .sym svg {
        width: 2.1em !important;
        height: 2.1em !important;
      }
      #hero .hero-tagline {
        font-size: 0.78em !important;
        letter-spacing: 0.22em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
        margin-bottom: 0.2rem !important;
      }
      #hero h1 {
        font-size: 3.85em !important;
        line-height: 0.95 !important;
      }
      #hero .script {
        font-size: 2.6em !important;
        margin: -0.02em 0 !important;
      }
      #hero .hero-quote {
        margin-top: 0.5rem !important;
        font-size: 1.22em !important;
        color: #3d4a26 !important;
        line-height: 1.25 !important;
      }
      #hero .hero-dates {
        margin-top: 0.45rem !important;
        font-size: 0.80em !important;
        letter-spacing: 0.2em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
      }
    `;
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/bell-perfect-1440px.png' });

  // 1920x1080
  await page.setViewport({ width: 1920, height: 1080 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/bell-perfect-1920px.png' });

  // 390x844 (Mobile)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/bell-perfect-390px.png' });

  await browser.close();
  console.log('Saved perfect bell screenshots');
})();

