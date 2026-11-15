import fs from 'fs';
import sharp from 'sharp';

const v5 = fs.readFileSync('assets/wedding-invite-v5.html', 'utf8');
const regex = /data:image\/([a-zA-Z0-9\+\-]+);base64,([A-Za-z0-9+/=]+)/g;

async function check() {
  let m;
  let i = 0;
  while ((m = regex.exec(v5)) !== null) {
    i++;
    if (i === 1 || i === 7 || i === 8 || i === 9 || i === 5) {
      const buf = Buffer.from(m[2], 'base64');
      const meta = await sharp(buf).metadata();
      console.log(`Image #${i}: format=${meta.format}, width=${meta.width}, height=${meta.height}, channels=${meta.channels}, hasAlpha=${meta.hasAlpha}`);
    }
  }
}

check().catch(console.error);
