const fs = require('fs');

const content = fs.readFileSync('assets/wedding-invite.html', 'utf8');

// Strip base64 data to get clean HTML template
const cleanHtml = content.replace(/data:image\/[a-zA-Z0-9\+\-]+;base64,[A-Za-z0-9+/=]+/g, 'DATA_URI');
fs.writeFileSync('tools/clean-template.html', cleanHtml);
console.log('Saved tools/clean-template.html, length:', cleanHtml.length);

