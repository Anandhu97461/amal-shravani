import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    let el = document.getElementById('desktop-clearance-style');
    if (!el) {
      el = document.createElement('style');
      el.id = 'desktop-clearance-style';
      document.head.appendChild(el);
    }
    el.textContent = `
      @media (min-width: 768px) {
        #hero .chb {
          top: 0px !important;
          width: calc(var(--cw) * 0.12) !important;
          left: 17% !important;
        }
        #hero .lan {
          top: 0px !important;
          width: calc(var(--cw) * 0.12) !important;
          right: 17% !important;
        }
        #hero .col {
          padding-top: calc(var(--cw) * 0.28) !important;
        }
        #hero .sym svg {
          width: 1.5em !important;
          height: 1.5em !important;
        }
        #hero .hero-tagline {
          font-size: 0.65em !important;
          margin-bottom: 0.1rem !important;
        }
        #hero h1 {
          font-size: 2.75em !important;
          line-height: 0.88 !important;
        }
        #hero .script {
          font-size: 1.85em !important;
          margin: -0.05em 0 !important;
        }
        #hero .hero-quote {
          margin-top: 0.3rem !important;
          font-size: 0.98em !important;
          line-height: 1.18 !important;
        }
        #hero .hero-dates {
          margin-top: 0.25rem !important;
          font-size: 0.68em !important;
        }
      }
    `;
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/desktop-cleared-1440px.png' });

  // Check 1920x1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/desktop-cleared-1920px.png' });

  await browser.close();
  console.log('Saved desktop cleared screenshots');
})();

