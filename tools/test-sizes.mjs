import sharp from 'sharp';
import fs from 'fs';

async function generateSizes() {
  const sizes = [380, 420, 460];
  const baseImg = 'assets/mandapam-arch-orig.webp';
  const meta = await sharp(baseImg).metadata();

  for (const size of sizes) {
    const bottomY = 1645;
    const vigrahamBuffer = await sharp('assets/ganesh-vigraham.webp')
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const shadowWidth = Math.round(size * 0.88);
    const shadowHeight = Math.round(size * 0.2);
    const shadowSvg = `
      <svg width="${shadowWidth}" height="${shadowHeight}">
        <ellipse cx="${shadowWidth / 2}" cy="${shadowHeight / 2}" rx="${shadowWidth * 0.46}" ry="${shadowHeight * 0.42}" fill="rgba(25, 8, 4, 0.75)" filter="blur(8px)"/>
      </svg>
    `;
    const shadowBuffer = await sharp(Buffer.from(shadowSvg)).png().toBuffer();

    const left = Math.round((meta.width - size) / 2);
    const top = bottomY - size;
    const shadowLeft = Math.round((meta.width - shadowWidth) / 2);
    const shadowTop = bottomY - Math.round(shadowHeight * 0.7);

    const outPath = `tools/mandapam-size-${size}.webp`;
    await sharp(baseImg)
      .composite([
        { input: shadowBuffer, left: shadowLeft, top: shadowTop },
        { input: vigrahamBuffer, left: left, top: top }
      ])
      .webp({ quality: 85 })
      .toFile(outPath);

    // Also extract crop for inspection
    await sharp(outPath)
      .extract({ left: 100, top: 1000, width: 741, height: 671 })
      .png()
      .toFile(`tools/crop-size-${size}.png`);

    console.log(`Generated size ${size}`);
  }
}

generateSizes().catch(console.error);

