import fs from 'fs';

const v1 = fs.readFileSync('assets/wedding-invite.html', 'utf8');
const v5 = fs.readFileSync('assets/wedding-invite-v5.html', 'utf8');

const regex = /data:image\/([a-zA-Z0-9\+\-]+);base64,([A-Za-z0-9+/=]+)/g;

function getImages(content) {
  const imgs = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    imgs.push({ mime: m[1], len: m[2].length, buffer: Buffer.from(m[2], 'base64') });
  }
  return imgs;
}

const imgsV1 = getImages(v1);
const imgsV5 = getImages(v5);

console.log('v1 images count:', imgsV1.length, 'v5 images count:', imgsV5.length);

console.log('\nChecking v5 images:');
imgsV5.forEach((img5, i) => {
  // Check if identical to any v1 image
  const v1Match = imgsV1.findIndex(img1 => img1.buffer.equals(img5.buffer));
  console.log(`v5 image #${i+1} (${img5.mime}, ${Math.round(img5.len*0.75/1024)}KB): ${v1Match !== -1 ? `IDENTICAL to v1 image #${v1Match+1}` : 'NEW/UPDATED IMAGE'}`);
});

