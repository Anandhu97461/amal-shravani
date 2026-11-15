import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'C:\\Users\\anand\\.gemini\\antigravity\\brain\\cb2c5166-3bf9-431b-8500-9ada43dddd68\\ganesha_bronze_idol_1794754146350.jpg';
const destPublic = 'public/assets/ganesh-vigraham.webp';
const destAssets = 'assets/ganesh-vigraham.webp';

async function processVigraham() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4: r, g, b, a

  // Clean background removal: since it's pure/near pure white studio background
  // Check from edges or threshold
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // If near white (background)
    if (r > 240 && g > 240 && b > 240) {
      // Calculate smooth alpha falloff between 240 and 252
      const minVal = Math.min(r, g, b);
      if (minVal >= 250) {
        data[i + 3] = 0; // fully transparent
      } else {
        const factor = (250 - minVal) / 10;
        data[i + 3] = Math.round(255 * factor);
      }
    }
  }

  // Save as WebP with alpha channel
  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(destPublic);

  fs.copyFileSync(destPublic, destAssets);
  console.log('Saved', destPublic, 'and', destAssets);
}

processVigraham().catch(console.error);

