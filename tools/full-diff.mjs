import fs from 'fs';

const v1 = fs.readFileSync('tools/clean-template.html', 'utf8').split('\n');
const v5 = fs.readFileSync('tools/clean-template-v5.html', 'utf8').split('\n');

for (let i = 0; i < Math.max(v1.length, v5.length); i++) {
  const line1 = v1[i] || '';
  const line5 = v5[i] || '';
  if (line1 !== line5) {
    console.log(`--- L${i+1} in v1:\n${line1}\n+++ L${i+1} in v5:\n${line5}\n`);
  }
}

