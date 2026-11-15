import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 2000));

  const options = [
    {
      name: 'opt-3.8em',
      h1: '3.85em',
      script: '2.55em',
      tagline: '0.76em',
      quote: '1.22em',
      dates: '0.80em',
      padTop: '6svh',
      symSvg: '2.0em'
    },
    {
      name: 'opt-4.0em',
      h1: '4.0em',
      script: '2.65em',
      tagline: '0.78em',
      quote: '1.24em',
      dates: '0.82em',
      padTop: '6svh',
      symSvg: '2.1em'
    }
  ];

  for (const opt of options) {
    await page.evaluate((opt) => {
      let el = document.getElementById('prop-style');
      if (!el) {
        el = document.createElement('style');
        el.id = 'prop-style';
        document.head.appendChild(el);
      }
      el.textContent = `
        @media (min-width: 768px) {
          #hero .col {
            padding-top: ${opt.padTop} !important;
            width: calc(var(--cw) * 0.85) !important;
          }
          #hero .sym {
            gap: 1.2rem !important;
            margin-bottom: 0.35rem !important;
          }
          #hero .sym svg {
            width: ${opt.symSvg} !important;
            height: ${opt.symSvg} !important;
          }
          #hero .hero-tagline {
            font-size: ${opt.tagline} !important;
            letter-spacing: 0.22em !important;
            margin-bottom: 0.18rem !important;
          }
          #hero h1 {
            font-size: ${opt.h1} !important;
            line-height: 0.95 !important;
          }
          #hero .script {
            font-size: ${opt.script} !important;
            margin: -0.02em 0 !important;
          }
          #hero .hero-quote {
            margin-top: 0.5rem !important;
            font-size: ${opt.quote} !important;
            line-height: 1.25 !important;
          }
          #hero .hero-dates {
            margin-top: 0.45rem !important;
            font-size: ${opt.dates} !important;
            letter-spacing: 0.2em !important;
          }
        }
      `;
    }, opt);

    await new Promise(r => setTimeout(r, 600));

    // Capture 1920x1080
    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: `tools/${opt.name}-1920px.png` });

    // Capture 1440x900
    await page.setViewport({ width: 1440, height: 900 });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: `tools/${opt.name}-1440px.png` });
  }

  await browser.close();
  console.log('Saved options');
})();

