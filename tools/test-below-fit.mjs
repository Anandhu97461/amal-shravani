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
        width: calc(var(--cw) * 0.125) !important;
        left: 17% !important;
      }
      #hero .lan {
        top: 0px !important;
        width: calc(var(--cw) * 0.125) !important;
        right: 17% !important;
      }
      #hero .col {
        justify-content: flex-start !important;
        padding-top: calc(var(--cw) * 0.29 + 0.5rem) !important;
        width: calc(var(--cw) * 0.86) !important;
      }
      #hero .sym {
        gap: 0.9rem !important;
        margin-bottom: 0.15rem !important;
      }
      #hero .sym svg {
        width: 1.7em !important;
        height: 1.7em !important;
      }
      #hero .hero-tagline {
        font-size: 0.70em !important;
        letter-spacing: 0.20em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
        margin-bottom: 0.12rem !important;
      }
      #hero h1 {
        font-size: 3.2em !important;
        line-height: 0.90 !important;
      }
      #hero .script {
        font-size: 2.1em !important;
        margin: -0.04em 0 !important;
      }
      #hero .hero-quote {
        margin-top: 0.35rem !important;
        font-size: 1.1em !important;
        color: #3d4a26 !important;
        line-height: 1.2 !important;
      }
      #hero .hero-dates {
        margin-top: 0.3rem !important;
        font-size: 0.74em !important;
        letter-spacing: 0.18em !important;
        color: #3d4a26 !important;
        font-weight: 600 !important;
      }
      @media (min-width: 768px) {
        #hero .col {
          padding-top: calc(var(--cw) * 0.29 + 0.6rem) !important;
        }
        #hero h1 {
          font-size: 3.0em !important;
        }
        #hero .script {
          font-size: 2.0em !important;
        }
        #hero .hero-quote {
          font-size: 1.05em !important;
        }
        #hero .hero-dates {
          font-size: 0.72em !important;
        }
      }
    `;
  });

  // Check 390x844
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-fit-390px.png' });

  // Check 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-fit-1440px.png' });

  // Check 1920x1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'tools/below-fit-1920px.png' });

  await browser.close();
  console.log('Saved below-fit screenshots');
})();

