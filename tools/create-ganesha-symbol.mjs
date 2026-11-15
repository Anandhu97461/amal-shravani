import fs from 'fs';

// Traditional graceful Lord Ganesha silhouette for Hindu wedding invitations
const ganeshaSymbol = `
<g id="ganesha">
  <!-- Mukut / Crown -->
  <path d="M50 4 L53 12 L61 14 L55 20 L58 28 L50 24 L42 28 L45 20 L39 14 L47 12 Z" fill="url(#gold)"/>
  <circle cx="50" cy="10" r="1.5" fill="#fff"/>
  <!-- Forehead & Tilak -->
  <path d="M47 28 C48 31 52 31 53 28" fill="none" stroke="url(#gold)" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="50" cy="27" r="1.5" fill="url(#gold)"/>
  <path d="M50 20 L50 25" stroke="url(#gold)" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Left Ear (viewer left) -->
  <path d="M41 29 C31 30 22 36 24 49 C26 56 33 56 38 52 C35 48 34 38 40 33" fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Right Ear (viewer right) -->
  <path d="M59 29 C69 30 78 36 76 49 C74 56 67 56 62 52 C65 48 66 38 60 33" fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Head dome & Brow -->
  <path d="M41 31 C45 33 55 33 59 31" fill="none" stroke="url(#gold)" stroke-width="2" stroke-linecap="round"/>
  <!-- Single Tusk (Ekadanta) -->
  <path d="M42 50 L36 52" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Trunk (Vakratunda) gracefully turning to the left with sweet modak -->
  <path d="M45 35 C44 46 45 61 50 71 C54 78 61 82 68 79 C74 76 75 68 70 64 C64 60 59 66 61 71 C62 73 65 74 67 73" fill="none" stroke="url(#gold)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Modak / Prasadam in trunk -->
  <circle cx="68" cy="70" r="3.2" fill="url(#gold)"/>
  <!-- Traditional Lotus Base -->
  <path d="M34 84 C42 80 50 82 50 86 C50 82 58 80 66 84 C59 88 50 89 34 84 Z" fill="url(#gold)"/>
</g>
`;

fs.writeFileSync('tools/ganesha-symbol.html', ganeshaSymbol.trim());
console.log('Saved tools/ganesha-symbol.html');

