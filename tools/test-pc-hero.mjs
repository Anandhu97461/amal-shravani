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

  const variations = [
    {
      name: 'v1',
      h1: '3.6em',
      script: '2.4em',
      symSvg: '1.9em',
      tagline: '0.74em',
      quote: '1.15em',
      dates: '0.76em',
      padTop: '5.5svh',
      gapQuote: '0.45rem',
      gapDates: '0.45rem'
    },
    {
      name: 'v2',
      h1: '3.4em',
      script: '2.25em',
      symSvg: '1.8em',
      tagline: '0.72em',
      quote: '1.1em',
      dates: '0.74em',
      padTop: '5svh',
      gapQuote: '0.4rem',
      gapDates: '0.4rem'
    },
    {
      name: 'v3',
      h1: '3.5em',
      script: '2.35em',
      symSvg: '1.85em',
      tagline: '0.72em',
      quote: '1.12em',
      dates: '0.75em',
      padTop: '5svh',
      gapQuote: '0.35rem',
      gapDates: '0.35rem'
    }
  ];

  for (const v of variations) {
    await page.evaluate((v) => {
      let el = document.getElementById('test-style');
      if (!el) {
        el = document.createElement('style');
        el.id = 'test-style';
        document.head.appendChild(el);
      }
      el.textContent = `
        #hero .chb {
          top: -8svh !important;
          width: calc(var(--cw) * 0.12) !important;
          left: 12% !important;
        }
        #hero .lan {
          top: -8svh !important;
          width: calc(var(--cw) * 0.12) !important;
          right: 12% !important;
        }
        #hero .gar {
          height: calc(var(--cw) * 0.32) !important;
        }
        #hero .col {
          justify-content: flex-start !important;
          padding-top: ${v.padTop} !important;
          width: calc(var(--cw) * 0.82) !important;
        }
        #hero .sym {
          gap: 1.1rem !important;
          margin-bottom: 0.3rem !important;
        }
        #hero .sym svg {
          width: ${v.symSvg} !important;
          height: ${v.symSvg} !important;
        }
        #hero .hero-tagline {
          font-size: ${v.tagline} !important;
          letter-spacing: 0.22em !important;
          color: #3d4a26 !important;
          font-weight: 600 !important;
          margin-bottom: 0.15rem !important;
        }
        #hero h1 {
          font-size: ${v.h1} !important;
          line-height: 0.95 !important;
        }
        #hero .script {
          font-size: ${v.script} !important;
          margin: -0.02em 0 !important;
        }
        #hero .hero-quote {
          margin-top: ${v.gapQuote} !important;
          font-size: ${v.quote} !important;
          color: #3d4a26 !important;
          line-height: 1.3 !important;
        }
        #hero .hero-dates {
          margin-top: ${v.gapDates} !important;
          font-size: ${v.dates} !important;
          letter-spacing: 0.2em !important;
          color: #3d4a26 !important;
          font-weight: 600 !important;
        }
      `;
    }, v);

    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: `tools/pc-hero-${v.name}.png` });
  }

  await browser.close();
  console.log('Saved PC hero variations');
})();

