import sharp from 'sharp';
import fs from 'fs';

async function testComposite(size = 280, bottomY = 1620) {
  const baseImg = sharp('assets/mandapam-arch-orig.webp');
  const baseMeta = await baseImg.metadata();

  // Resize vigraham
  const vigrahamBuffer = await sharp('assets/ganesh-vigraham.webp')
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create subtle contact shadow (blurred dark ellipse)
  const shadowWidth = Math.round(size * 0.85);
  const shadowHeight = Math.round(size * 0.18);
  const shadowSvg = `
    <svg width="${shadowWidth}" height="${shadowHeight}">
      <ellipse cx="${shadowWidth / 2}" cy="${shadowHeight / 2}" rx="${shadowWidth * 0.45}" ry="${shadowHeight * 0.4}" fill="rgba(30, 10, 5, 0.7)" filter="blur(6px)"/>
    </svg>
  `;
  const shadowBuffer = await sharp(Buffer.from(shadowSvg)).png().toBuffer();

  const left = Math.round((baseMeta.width - size) / 2);
  const top = bottomY - size;
  const shadowLeft = Math.round((baseMeta.width - shadowWidth) / 2);
  const shadowTop = bottomY - Math.round(shadowHeight * 0.7);

  const composited = await sharp('assets/mandapam-arch-orig.webp')
    .composite([
      { input: shadowBuffer, left: shadowLeft, top: shadowTop },
      { input: vigrahamBuffer, left: left, top: top }
    ])
    .webp({ quality: 85 })
    .toFile('assets/mandapam-arch-test.webp');

  console.log('Saved assets/mandapam-arch-test.webp with size:', size, 'at top:', top);
}

testComposite(300, 1630).catch(console.error);

