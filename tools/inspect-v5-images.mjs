import fs from 'fs';

const v5 = fs.readFileSync('tools/clean-template-v5.html', 'utf8');

// Find all DATA_URI_ occurrences and their context
const regex = /DATA_URI_(\d+)/g;
let match;
while ((match = regex.exec(v5)) !== null) {
  const num = match[1];
  const start = Math.max(0, match.index - 120);
  const context = v5.substring(start, match.index).replace(/\s+/g, ' ').slice(-80);
  const post = v5.substring(match.index, match.index + 50).replace(/\s+/g, ' ').slice(0, 40);
  console.log(`Image ${num}: ...${context} [${match[0]}] ${post}...`);
}
