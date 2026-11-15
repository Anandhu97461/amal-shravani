import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcHtml = fs.readFileSync('assets/wedding-invite.html', 'utf8');

// Asset mapping in exact order of appearance in wedding-invite.html:
// 1: .b1 -> hero-sunrise.webp
// 2: .b2 -> church-arch.webp
// 3: .b3 -> reception-lanterns.webp
// 4: .b4 -> mandapam-arch.webp
// 5: .gar -> garland.png
// 6: .bel -> bell.png
// 7: .lam -> lamp.png
// 8: .b5 -> story-bg.webp
// 9: story 1 -> story-1.webp
// 10: story 2 -> story-2.webp
// 11: story 3 -> story-3.webp
// 12: story 4 -> story-4.webp
// 13: moment 1 -> moment-1.webp
// 14: moment 2 -> moment-2.webp
// 15: moment 3 -> moment-3.webp
// 16: moment 4 -> moment-4.webp
// 17: moment 5 -> moment-5.webp
// 18: moment 6 -> moment-6.webp
// 19: moment 7 -> moment-7.webp
// 20: moment 8 -> moment-8.webp

const assetConfig = [
  { name: 'hero-sunrise.webp', format: 'webp', isTransparentPng: false },
  { name: 'church-arch.webp', format: 'webp', isTransparentPng: false },
  { name: 'reception-lanterns.webp', format: 'webp', isTransparentPng: false },
  { name: 'mandapam-arch.webp', format: 'webp', isTransparentPng: false },
  { name: 'garland.png', format: 'png', isTransparentPng: true },
  { name: 'bell.png', format: 'png', isTransparentPng: true },
  { name: 'lamp.png', format: 'png', isTransparentPng: true },
  { name: 'story-bg.webp', format: 'webp', isTransparentPng: false },
  { name: 'story-1.webp', format: 'webp', isTransparentPng: false },
  { name: 'story-2.webp', format: 'webp', isTransparentPng: false },
  { name: 'story-3.webp', format: 'webp', isTransparentPng: false },
  { name: 'story-4.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-1.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-2.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-3.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-4.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-5.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-6.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-7.webp', format: 'webp', isTransparentPng: false },
  { name: 'moment-8.webp', format: 'webp', isTransparentPng: false }
];

const targetDir = path.resolve('public/assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Also make sure /assets has copies or Vite can serve from public/assets or /assets
const targetAssetsDir = path.resolve('assets');

const regex = /data:image\/([a-zA-Z0-9\+\-]+);base64,([A-Za-z0-9+/=]+)/g;
let match;
let index = 0;
const dimensions = {};

async function processAll() {
  while ((match = regex.exec(srcHtml)) !== null) {
    if (index >= assetConfig.length) {
      console.log(`Extra match at ${index}, skipping.`);
      index++;
      continue;
    }
    const cfg = assetConfig[index];
    const mime = match[1];
    const buffer = Buffer.from(match[2], 'base64');
    
    const outPubPath = path.join(targetDir, cfg.name);
    const outAssetsPath = path.join(targetAssetsDir, cfg.name);

    if (cfg.isTransparentPng) {
      // Keep as PNG
      fs.writeFileSync(outPubPath, buffer);
      fs.writeFileSync(outAssetsPath, buffer);
      const meta = await sharp(buffer).metadata();
      dimensions[cfg.name] = { width: meta.width, height: meta.height };
      console.log(`Saved PNG: ${cfg.name} (${meta.width}x${meta.height}, ${Math.round(buffer.length/1024)} KB)`);
    } else {
      // Convert to WebP at quality ~80
      const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
      fs.writeFileSync(outPubPath, webpBuffer);
      fs.writeFileSync(outAssetsPath, webpBuffer);
      const meta = await sharp(webpBuffer).metadata();
      dimensions[cfg.name] = { width: meta.width, height: meta.height };
      console.log(`Converted to WebP: ${cfg.name} (${meta.width}x${meta.height}, ${Math.round(webpBuffer.length/1024)} KB)`);
    }
    index++;
  }

  fs.writeFileSync('tools/dimensions.json', JSON.stringify(dimensions, null, 2));
  console.log('Saved tools/dimensions.json');
}

processAll().catch(console.error);

