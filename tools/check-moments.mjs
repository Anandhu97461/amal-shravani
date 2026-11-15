import fs from 'fs';

const v5 = fs.readFileSync('tools/clean-template-v5.html', 'utf8');
const momentsMatch = v5.match(/<section id="moments"[\s\S]*?<\/section>/);
console.log('--- Moments in v5 ---');
console.log(momentsMatch ? momentsMatch[0] : 'Not found');

const rsvpMatch = v5.match(/<section id="rsvp"[\s\S]*?<\/section>/);
console.log('--- RSVP in v5 ---');
console.log(rsvpMatch ? rsvpMatch[0] : 'Not found');
