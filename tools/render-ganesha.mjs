import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const ganesha = fs.readFileSync('tools/ganesha-symbol.html', 'utf8');
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Cormorant+Garamond:wght@600&display=swap" rel="stylesheet">
      </head>
      <body style="background:#5a1212; display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; margin:0;">
        <svg width="0" height="0" style="position:absolute">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#fff0b0"/>
              <stop offset=".35" stop-color="#d9a53a"/>
              <stop offset=".65" stop-color="#8f5f14"/>
              <stop offset="1" stop-color="#f3d27a"/>
            </linearGradient>
            ${ganesha}
          </defs>
        </svg>

        <svg viewBox="0 0 100 100" style="width:110px; height:110px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5));">
          <use href="#ganesha"/>
        </svg>

        <p style="font-family:'Cormorant Garamond', serif; font-size:24px; color:#f3d27a; letter-spacing:4px; margin:16px 0 0; text-align:center;">
          ॥ श्री गणेशाय नमः ॥
        </p>
      </body>
    </html>
  `);
  await page.screenshot({ path: 'tools/ganesha-preview.png' });
  await browser.close();
  console.log('Saved tools/ganesha-preview.png with Sanskrit invocation');
})();
