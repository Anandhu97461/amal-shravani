import fs from 'fs';

const v1 = fs.readFileSync('tools/clean-template.html', 'utf8');
const v5 = fs.readFileSync('tools/clean-template-v5.html', 'utf8');

function clean(str) {
  return str.replace(/DATA_URI_\d+/g, 'DATA_URI').replace(/\s+/g, ' ').trim();
}

// Compare CSS
const styleV1 = v1.match(/<style>([\s\S]*?)<\/style>/)[1];
const styleV5 = v5.match(/<style>([\s\S]*?)<\/style>/)[1];

console.log('--- CSS differences ---');
const rulesV1 = styleV1.split('}').map(r => r.trim()).filter(Boolean);
const rulesV5 = styleV5.split('}').map(r => r.trim()).filter(Boolean);

const setV1 = new Set(rulesV1.map(clean));
const setV5 = new Set(rulesV5.map(clean));

console.log('In v5 but not v1:');
for (const r of rulesV5) {
  if (!setV1.has(clean(r))) {
    console.log(' +', r.slice(0, 150));
  }
}

console.log('\nIn v1 but not v5:');
for (const r of rulesV1) {
  if (!setV5.has(clean(r))) {
    console.log(' -', r.slice(0, 150));
  }
}

// Compare HTML body
const bodyV1 = v1.match(/<body>([\s\S]*?)<script>/)[1];
const bodyV5 = v5.match(/<body>([\s\S]*?)<script>/)[1];

console.log('\n--- Body HTML differences ---');
if (clean(bodyV1) === clean(bodyV5)) {
  console.log('Body HTML is identical (except DATA_URI)');
} else {
  console.log('Body HTML differs! Showing diff:');
  const b1Lines = bodyV1.split('\n').map(l => clean(l)).filter(Boolean);
  const b5Lines = bodyV5.split('\n').map(l => clean(l)).filter(Boolean);
  for (let i = 0; i < Math.max(b1Lines.length, b5Lines.length); i++) {
    if (b1Lines[i] !== b5Lines[i]) {
      console.log(`v1: ${b1Lines[i]}`);
      console.log(`v5: ${b5Lines[i]}`);
      console.log('---');
    }
  }
}

// Compare Script
const scriptV1 = v1.match(/<script>([\s\S]*?)<\/script>/)[1];
const scriptV5 = v5.match(/<script>([\s\S]*?)<\/script>/)[1];
console.log('\n--- Script differences ---');
if (clean(scriptV1) === clean(scriptV5)) {
  console.log('Script is IDENTICAL!');
} else {
  console.log('Script differs!');
}

