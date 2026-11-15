import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('screenshots');

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#open');
  await new Promise(r => setTimeout(r, 1000));

  // 1. Check Moments Collage Heights & Widths
  const momentsData = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.pl')).map(el => {
      const img = el.querySelector('img');
      return {
        caption: el.querySelector('span')?.textContent,
        plW: el.offsetWidth,
        plH: el.offsetHeight,
        imgW: img ? img.offsetWidth : 0,
        imgH: img ? img.offsetHeight : 0,
        ratio: img ? (img.offsetWidth / img.offsetHeight).toFixed(2) : 0
      };
    });
  });

  console.log('\n--- Moments Collage Measurements (1440px) ---');
  console.table(momentsData);

  // Capture Moments screenshot at 1440px
  await page.evaluate(() => {
    document.getElementById('moments').scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, 'moments-1440px.png') });
  console.log('✓ Captured updated moments-1440px.png');

  // 2. Check RSVP Section at 1440px
  const rsvpExists = await page.evaluate(() => Boolean(document.getElementById('rsvp')));
  console.log('\nRSVP section exists in DOM:', rsvpExists);

  await page.evaluate(() => {
    document.getElementById('rsvp').scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(outputDir, 'rsvp-1440px.png') });
  console.log('✓ Captured rsvp-1440px.png');

  // 3. Test Mobile (390px)
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    document.getElementById('moments').scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, 'moments-390px.png') });
  console.log('✓ Captured updated moments-390px.png');

  await page.evaluate(() => {
    document.getElementById('rsvp').scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(outputDir, 'rsvp-390px.png') });
  console.log('✓ Captured rsvp-390px.png');

  // Check 7 nav dots
  const dotCount = await page.evaluate(() => document.querySelectorAll('.nav a').length);
  console.log('\nTotal navigation dots:', dotCount, '(expected: 7)');

  // Test RSVP form interactions: chips and stepper
  const testForm = await page.evaluate(() => {
    const declineBtn = document.querySelectorAll('#att .chip')[1];
    declineBtn.click();
    const evqOff = document.getElementById('evq').classList.contains('off');
    
    // Switch back to joyfully accept
    document.querySelectorAll('#att .chip')[0].click();
    const evqOn = !document.getElementById('evq').classList.contains('off');

    // Stepper +
    document.getElementById('gp').click();
    document.getElementById('gp').click();
    const guests = document.getElementById('gn').textContent;

    return { evqOff, evqOn, guests };
  });
  console.log('RSVP interaction test:', testForm);

  await browser.close();

  // Copy updated screenshots to brain artifact directory
  const artifactDir = 'C:\\Users\\anand\\.gemini\\antigravity\\brain\\cb2c5166-3bf9-431b-8500-9ada43dddd68';
  for (const f of ['moments-1440px.png', 'moments-390px.png', 'rsvp-1440px.png', 'rsvp-390px.png']) {
    fs.copyFileSync(path.join(outputDir, f), path.join(artifactDir, f));
  }
  console.log('Copied updated screenshots to artifact directory.');
}

verify().catch(console.error);

