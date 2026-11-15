const fs = require('fs');
const path = require('path');

const srcFile = path.resolve('assets/wedding-invite.html');
const content = fs.readFileSync(srcFile, 'utf8');

console.log('File size:', content.length);

// Let's see what sections and assets are in wedding-invite.html
// Match data URIs
const regex = /data:image\/([a-zA-Z0-9\+\-]+);base64,([A-Za-z0-9+/=]+)/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  const type = match[1];
  const b64 = match[2];
  const pre = content.substring(Math.max(0, match.index - 120), match.index);
  console.log(`Match ${count}: type=${type}, size=${Math.round(b64.length * 0.75 / 1024)} KB, context=${pre.replace(/\s+/g, ' ').slice(-80)}`);
}
console.log(`Total images found: ${count}`);

