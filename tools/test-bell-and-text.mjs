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

  const configs = [
    {
      name: 'bell-full-left18',
      chbTop: '0px',
      chbLeft: '18%',
      chbWidth: 'calc(var(--cw) * 0.13)',
      lanTop: '0px',
      lanRight: '18%',
      lanWidth: 'calc(var(--cw) * 0.13)',
      colPadTop: '12svh',
      h1Size: '4.2em',
      scriptSize: '2.8em',
      taglineSize: '0.82em',
      quoteSize: '1.28em',
      datesSize: '0.82em'
    },
    {
      name: 'bell-full-left15',
      chbTop: '0px',
      chbLeft: '15%',
      chbWidth: 'calc(var(--cw) * 0.12)',
      lanTop: '0px',
      lanRight: '15%',
      lanWidth: 'calc(var(--cw) * 0.12)',
      colPadTop: '11svh',
      h1Size: '4.0em',
      scriptSize: '2.7em',
      taglineSize: '0.8em',
      quoteSize: '1.25em',
      datesSize: '0.8em'
    },
    {
      name: 'bell-full-left12',
      chbTop: '0px',
      chbLeft: '12%',
      chbWidth: 'calc(var(--cw) * 0.12)',
      lanTop: '0px',
      lanRight: '12%',
      lanWidth: 'calc(var(--cw) * 0.12)',
      colPadTop: '9svh',
      h1Size: '4.2em',
      scriptSize: '2.8em',
      taglineSize: '0.82em',
      quoteSize: '1.28em',
      datesSize: '0.82em'
    }
  ];

  for (const c of configs) {
    await page.evaluate((c) => {
      let el = document.getElementById('test-bell-style');
      if (!el) {
        el = document.createElement('style');
        el.id = 'test-bell-style';
        document.head.appendChild(el);
      }
      el.textContent = `
        #hero .chb {
          top: ${c.chbTop} !important;
          width: ${c.chbWidth} !important;
          left: ${c.chbLeft} !important;
        }
        #hero .lan {
          top: ${c.lanTop} !important;
          width: ${c.lanWidth} !important;
          right: ${c.lanRight} !important;
        }
        #hero .col {
          padding-top: ${c.colPadTop} !important;
          width: calc(var(--cw) * 0.84) !important;
        }
        #hero .sym svg {
          width: 2.2em !important;
          height: 2.2em !important;
        }
        #hero .hero-tagline {
          font-size: ${c.taglineSize} !important;
          letter-spacing: 0.22em !important;
          color: #3d4a26 !important;
          font-weight: 600 !important;
          margin-bottom: 0.2rem !important;
        }
        #hero h1 {
          font-size: ${c.h1Size} !important;
          line-height: 0.95 !important;
        }
        #hero .script {
          font-size: ${c.scriptSize} !important;
          margin: -0.02em 0 !important;
        }
        #hero .hero-quote {
          margin-top: 0.5rem !important;
          font-size: ${c.quoteSize} !important;
          color: #3d4a26 !important;
          line-height: 1.25 !important;
        }
        #hero .hero-dates {
          margin-top: 0.45rem !important;
          font-size: ${c.datesSize} !important;
          letter-spacing: 0.2em !important;
          color: #3d4a26 !important;
          font-weight: 600 !important;
        }
      `;
    }, c);

    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `tools/${c.name}-1440px.png` });

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `tools/${c.name}-390px.png` });

    await page.setViewport({ width: 1440, height: 900 });
  }

  await browser.close();
  console.log('Saved bell and text tests');
})();

