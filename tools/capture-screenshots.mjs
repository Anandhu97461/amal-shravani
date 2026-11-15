import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('screenshots');
const artifactDir = 'C:\\Users\\anand\\.gemini\\antigravity\\brain\\cb2c5166-3bf9-431b-8500-9ada43dddd68';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: '390px', width: 390, height: 844, isMobile: true },
    { name: '1440px', width: 1440, height: 900, isMobile: false }
  ];

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`Capturing for viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    // 1. Gate Screenshot
    const gatePath = path.join(outputDir, `gate-${vp.name}.png`);
    await page.screenshot({ path: gatePath });
    console.log(`✓ Saved gate-${vp.name}.png`);

    // Click OPEN INVITATION
    await page.click('#open');
    // Wait for gate doors (1.4s) + hero reveal delay + stagger + transition
    await new Promise((r) => setTimeout(r, 3200));

    // 2. Hero Section
    const heroPath = path.join(outputDir, `hero-${vp.name}.png`);
    await page.screenshot({ path: heroPath });
    console.log(`✓ Saved hero-${vp.name}.png`);

    // 3. Our Story Section
    await page.evaluate(() => {
      document.getElementById('story').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 3200));
    const storyPath = path.join(outputDir, `story-${vp.name}.png`);
    await page.screenshot({ path: storyPath });
    console.log(`✓ Saved story-${vp.name}.png`);

    // 4. Moments Section
    await page.evaluate(() => {
      document.getElementById('moments').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 2500));
    const momentsPath = path.join(outputDir, `moments-${vp.name}.png`);
    await page.screenshot({ path: momentsPath });
    console.log(`✓ Saved moments-${vp.name}.png`);

    // Lightbox Test & Screenshot
    const firstPolaroid = await page.$('.pl');
    if (firstPolaroid) {
      await firstPolaroid.click();
      await new Promise((r) => setTimeout(r, 1000));
      const lbPath = path.join(outputDir, `lightbox-${vp.name}.png`);
      await page.screenshot({ path: lbPath });
      console.log(`✓ Saved lightbox-${vp.name}.png`);
      // Close lightbox
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 600));
    }

    // 5. Christian Wedding (#e1)
    await page.evaluate(() => {
      document.getElementById('e1').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 3200));
    const e1Path = path.join(outputDir, `e1-${vp.name}.png`);
    await page.screenshot({ path: e1Path });
    console.log(`✓ Saved e1-${vp.name}.png`);

    // 6. Reception (#e2)
    await page.evaluate(() => {
      document.getElementById('e2').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 3200));
    const e2Path = path.join(outputDir, `e2-${vp.name}.png`);
    await page.screenshot({ path: e2Path });
    console.log(`✓ Saved e2-${vp.name}.png`);

    // 7. Wedding Ceremony (#e3)
    await page.evaluate(() => {
      document.getElementById('e3').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 3200));
    const e3Path = path.join(outputDir, `e3-${vp.name}.png`);
    await page.screenshot({ path: e3Path });
    console.log(`✓ Saved e3-${vp.name}.png`);

    // 8. Footer & Countdown
    await page.evaluate(() => {
      document.querySelector('footer').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 2000));
    const footerPath = path.join(outputDir, `footer-${vp.name}.png`);
    await page.screenshot({ path: footerPath });
    console.log(`✓ Saved footer-${vp.name}.png`);

    // Horizontal scroll QA check
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`Horizontal overflow check for ${vp.name}: ${hasHorizontalOverflow ? 'FAILED' : 'PASSED'}`);

    await page.close();
  }

  // Multi-viewport QA check
  console.log(`\n--- Multi-viewport Overflow QA ---`);
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    for (const isLandscape of [false, true]) {
      const h = isLandscape ? 500 : 900;
      const page = await browser.newPage();
      await page.setViewport({ width, height: h });
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
      await page.click('#open');
      await new Promise((r) => setTimeout(r, 1000));
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      console.log(`Width ${width}px (${isLandscape ? 'landscape' : 'portrait'}): ${overflow ? 'FAILED (overflow)' : 'PASSED (clean)'}`);
      await page.close();
    }
  }

  await browser.close();

  // Copy screenshots to artifact directory
  console.log(`\nCopying screenshots to artifact directory...`);
  const files = fs.readdirSync(outputDir);
  for (const f of files) {
    if (f.endsWith('.png')) {
      fs.copyFileSync(path.join(outputDir, f), path.join(artifactDir, f));
    }
  }
  console.log(`All screenshots copied successfully!`);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
