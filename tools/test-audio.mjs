import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testAudio() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  
  const consoleMsgs = [];
  page.on('console', msg => consoleMsgs.push(msg.text()));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Before open: button not playing
  const initialPlaying = await page.evaluate(() => {
    const btn = document.getElementById('music-toggle');
    return btn ? btn.classList.contains('playing') : false;
  });
  console.log('Music playing before open:', initialPlaying);

  // Click OPEN INVITATION
  await page.click('#open');
  await new Promise(r => setTimeout(r, 600));

  // After open: button should be playing
  const afterOpenPlaying = await page.evaluate(() => {
    const btn = document.getElementById('music-toggle');
    return btn ? btn.classList.contains('playing') : false;
  });
  console.log('Music playing after open:', afterOpenPlaying);

  // Click music toggle button to pause
  await page.click('#music-toggle');
  await new Promise(r => setTimeout(r, 200));

  const afterPausePlaying = await page.evaluate(() => {
    const btn = document.getElementById('music-toggle');
    return btn ? btn.classList.contains('playing') : false;
  });
  console.log('Music playing after clicking mute:', afterPausePlaying);

  // Click music toggle button again to resume
  await page.click('#music-toggle');
  await new Promise(r => setTimeout(r, 200));

  const afterResumePlaying = await page.evaluate(() => {
    const btn = document.getElementById('music-toggle');
    return btn ? btn.classList.contains('playing') : false;
  });
  console.log('Music playing after clicking resume:', afterResumePlaying);

  console.log('Console logs:', consoleMsgs);

  await browser.close();
}

testAudio().catch(console.error);
