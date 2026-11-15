import fs from 'fs';

const v1 = fs.readFileSync('tools/clean-template.html', 'utf8').split('\n');
const v5 = fs.readFileSync('tools/clean-template-v5.html', 'utf8').split('\n');

console.log('v1 lines:', v1.length, 'v5 lines:', v5.length);

// Let's print sections in v5
let inSection = false;
v5.forEach((line, idx) => {
  if (line.includes('<section') || line.includes('<div class="cl"') || line.includes('class="art') || line.includes('.gar') || line.includes('.chb') || line.includes('.lan') || line.includes('.bel') || line.includes('.lam') || line.includes('.b1') || line.includes('.b2') || line.includes('.b3') || line.includes('.b4') || line.includes('.b5')) {
    console.log(`L${idx+1}: ${line.trim().slice(0, 150)}`);
  }
});

