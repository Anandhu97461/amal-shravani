import sharp from 'sharp';

async function cropBottom() {
  await sharp('assets/mandapam-arch-test.webp')
    .extract({ left: 150, top: 1100, width: 641, height: 571 })
    .png()
    .toFile('tools/crop-test.png');
  console.log('Saved tools/crop-test.png');
}
cropBottom().catch(console.error);

