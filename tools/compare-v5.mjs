import fs from 'fs';

const v5Content = fs.readFileSync('assets/wedding-invite-v5.html', 'utf8');

// Strip base64
let count = 0;
const assets = [];
const cleanV5 = v5Content.replace(/data:image\/([a-zA-Z0-9\+\-]+);base64,([A-Za-z0-9+/=]+)/g, (m, mime, b64) => {
  count++;
  assets.push({ index: count, mime, length: b64.length });
  return `DATA_URI_${count}`;
});

fs.writeFileSync('tools/clean-template-v5.html', cleanV5);
console.log('Saved tools/clean-template-v5.html');
console.log('Total base64 images in v5:', count);
console.log('Image lengths:', assets.map(a => `#${a.index}: ${a.mime} (${Math.round(a.length*0.75/1024)}KB)`).join(', '));

