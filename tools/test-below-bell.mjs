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
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    let el = document.getElementById('below-bell-style');
    if (!el) {
      el = document.createElement('style');
      el.id = 'below-bell-style';
      document.head.appendChild(el);
    }
    el.textContent = `
      #hero .chb {
        top: 0px !important;
        width: calc(var(--cw) * 0.13) !important;
        left: 17% !important;
      }
      #hero .lan {
        top: 0px !important;
        width: calc(var(--cw) * 0.13) !important;
        right: 17% !important;
      }
      #hero .col {
        justify-content: flex-start !important;
        padding-top: calc(var(--cw) * 0.31 + 0.5rem) !important;
        width: calc(var(--cw) * 0.86) !important;
      }
      #hero .sym {
        gap: 1rem !important;
        margin-bottom: 0.2rem !important;
      }
      #hero .sym svg {
        width: 1.8em !important;
        height: 1.8em !important;
      }
      #hero .hero-tagline {
        font-size: 0.72em !important;
        letter-spacing: 0.22em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
        margin-bottom: 0.15rem !important;
      }
      #hero h1 {
        font-size: 3.4em !important;
        line-height: 0.92 !important;
      }
      #hero .script {
        font-size: 2.3em !important;
        margin: -0.04em 0 !important;
      }
      #hero .hero-quote {
        margin-top: 0.4rem !important;
        font-size: 1.15em !important;
        color: #3d4a26 !important;
        line-height: 1.25 !important;
      }
      #hero .hero-dates {
        margin-top: 0.35rem !important;
        font-size: 0.76em !important;
        letter-spacing: 0.2em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
      }
      @media (min-width: 768px) {
        #hero .col {
          padding-top: calc(var(--cw) * 0.31 + 0.8rem) !important;
        }
        #hero h1 {
          font-size: 3.5em !important;
        }
        #hero .script {
          font-size: 2.4em !important;
        }
      }
    `;
  });

  // Check 390x844
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-bell-390px.png' });

  // Check 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-bell-1440px.png' });

  // Check 1920x1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-bell-1920px.png' });

  // Check 1366x768
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-bell-1366px.png' });

  await browser.close();
  console.log('Saved below bell screenshots');
})();

