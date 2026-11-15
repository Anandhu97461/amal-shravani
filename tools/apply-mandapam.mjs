import fs from 'fs';

fs.copyFileSync('assets/mandapam-arch-test.webp', 'assets/mandapam-arch.webp');
fs.copyFileSync('assets/mandapam-arch-test.webp', 'public/assets/mandapam-arch.webp');
console.log('Updated assets/mandapam-arch.webp and public/assets/mandapam-arch.webp');

