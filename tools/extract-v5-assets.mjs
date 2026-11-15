import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const v5Html = fs.readFileSync('assets/wedding-invite-v5.html', 'utf8');

const regex = /data:image\/([a-zA-Z0-9\+\-]+);base64,([A-Za-z0-9+/=]+)/g;
let m;
const rawImages = [];
while ((m = regex.exec(v5Html)) !== null) {
  rawImages.push({ mime: m[1], buffer: Buffer.from(m[2], 'base64') });
}

console.log('Found', rawImages.length, 'images in v5.');

const pubDir = path.resolve('public/assets');
const assetDir = path.resolve('assets');

async function processV5() {
  // 1. hero-sunrise.webp (Image #1)
  const heroWebp = await sharp(rawImages[0].buffer).webp({ quality: 80 }).toBuffer();
  fs.writeFileSync(path.join(pubDir, 'hero-sunrise.webp'), heroWebp);
  fs.writeFileSync(path.join(assetDir, 'hero-sunrise.webp'), heroWebp);
  console.log('Updated hero-sunrise.webp');

  // 2. bell.png (Image #5, antique bell for mandapam #e3)
  const bellBuf = rawImages[4].buffer;
  fs.writeFileSync(path.join(pubDir, 'bell.png'), bellBuf);
  fs.writeFileSync(path.join(assetDir, 'bell.png'), bellBuf);
  console.log('Saved bell.png');

  // 3. garland (Image #7) - save both garland.webp and garland.png
  const garBuf = rawImages[6].buffer;
  fs.writeFileSync(path.join(pubDir, 'garland.webp'), garBuf);
  fs.writeFileSync(path.join(assetDir, 'garland.webp'), garBuf);
  const garPng = await sharp(garBuf).png().toBuffer();
  fs.writeFileSync(path.join(pubDir, 'garland.png'), garPng);
  fs.writeFileSync(path.join(assetDir, 'garland.png'), garPng);
  console.log('Updated garland.webp and garland.png (364x1000)');

  // 4. church-bell (Image #8) - save church-bell.webp and church-bell.png
  const chbBuf = rawImages[7].buffer;
  fs.writeFileSync(path.join(pubDir, 'church-bell.webp'), chbBuf);
  fs.writeFileSync(path.join(assetDir, 'church-bell.webp'), chbBuf);
  const chbPng = await sharp(chbBuf).png().toBuffer();
  fs.writeFileSync(path.join(pubDir, 'church-bell.png'), chbPng);
  fs.writeFileSync(path.join(assetDir, 'church-bell.png'), chbPng);
  console.log('Saved church-bell.webp and church-bell.png (313x700)');

  // 5. lantern (Image #9) - save lantern.webp and lantern.png
  const lanBuf = rawImages[8].buffer;
  fs.writeFileSync(path.join(pubDir, 'lantern.webp'), lanBuf);
  fs.writeFileSync(path.join(assetDir, 'lantern.webp'), lanBuf);
  const lanPng = await sharp(lanBuf).png().toBuffer();
  fs.writeFileSync(path.join(pubDir, 'lantern.png'), lanPng);
  fs.writeFileSync(path.join(assetDir, 'lantern.png'), lanPng);
  console.log('Saved lantern.webp and lantern.png (342x700)');
}

processV5().catch(console.error);

