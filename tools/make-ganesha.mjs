const ganeshaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff0b0"/>
      <stop offset="35" stop-color="#d9a53a"/>
      <stop offset="65" stop-color="#8f5f14"/>
      <stop offset="1" stop-color="#f3d27a"/>
    </linearGradient>
  </defs>
  <!-- Ganesha outline / traditional form -->
  <g fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Crown / Mukut -->
    <path d="M43 14 L50 6 L57 14 L54 22 L46 22 Z" fill="url(#gold)" fill-opacity="0.3"/>
    <path d="M41 22 L59 22" stroke-width="2"/>
    <!-- Head & Ears -->
    <path d="M38 24 C28 25, 20 32, 23 44 C25 51, 32 50, 36 47"/>
    <path d="M62 24 C72 25, 80 32, 77 44 C75 51, 68 50, 64 47"/>
    <!-- Forehead & Tilak -->
    <path d="M50 16 L50 32" stroke-width="2"/>
    <path d="M45 28 C48 30, 52 30, 55 28" stroke-width="1.8"/>
    <circle cx="50" cy="24" r="2" fill="url(#gold)"/>
    <!-- Trunk / Vakratunda -->
    <path d="M43 32 C41 42, 43 58, 48 68 C51 74, 57 78, 64 76 C70 74, 71 67, 66 63 C61 59, 56 64, 58 68" stroke-width="3"/>
    <!-- Modak / Laddu in hand -->
    <circle cx="28" cy="66" r="4" fill="url(#gold)"/>
    <path d="M22 72 C26 76, 34 76, 38 70" stroke-width="2"/>
    <!-- Tusk -->
    <path d="M42 46 L36 48" stroke-width="2.5"/>
  </g>
</svg>
`;

import fs from 'fs';
fs.writeFileSync('tools/ganesha-test.svg', ganeshaSvg.trim());
console.log('Saved tools/ganesha-test.svg');

