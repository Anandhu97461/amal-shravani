import fs from 'fs';
import path from 'path';

function toBase64(filePath, mimeType) {
  const buf = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

// 1. Load and base64 encode assets
console.log('Encoding assets to base64...');
const heroB1 = toBase64('assets/hero-sunlit.webp', 'image/webp');
const churchB2 = toBase64('assets/church-arch.webp', 'image/webp');
const recepB3 = toBase64('assets/reception-lanterns.webp', 'image/webp');
const mandapamB4 = toBase64('assets/mandapam-arch.webp', 'image/webp');
const storyB5 = toBase64('assets/story-bg.webp', 'image/webp');

const garlandImg = toBase64('assets/garland.webp', 'image/webp');
const churchBellImg = toBase64('assets/church-bell.webp', 'image/webp');
const lanternImg = toBase64('assets/lantern.webp', 'image/webp');
const bellImg = toBase64('assets/bell.png', 'image/png');

const story1 = toBase64('assets/new-story-1.webp', 'image/webp');
const story2 = toBase64('assets/new-story-2.webp', 'image/webp');
const story3 = toBase64('assets/new-story-3.webp', 'image/webp');
const story4 = toBase64('assets/new-story-4.webp', 'image/webp');

const moment1 = toBase64('assets/moment-1.webp', 'image/webp');
const moment2 = toBase64('assets/moment-2.webp', 'image/webp');
const moment3 = toBase64('assets/moment-3.webp', 'image/webp');
const moment4 = toBase64('assets/moment-5.webp', 'image/webp');
const moment5 = toBase64('assets/moment-7.webp', 'image/webp');

// 2. Read and combine CSS
console.log('Reading and preparing CSS...');
const tokensCss = fs.readFileSync('styles/tokens.css', 'utf8');
const layoutCss = fs.readFileSync('styles/layout.css', 'utf8');
const sectionsCss = fs.readFileSync('styles/sections.css', 'utf8');
const animationsCss = fs.readFileSync('styles/animations.css', 'utf8');

// Replace external image URLs with base64 data URIs
let combinedCss = `
${tokensCss}
${layoutCss}
${sectionsCss}
${animationsCss}
`;

combinedCss = combinedCss
  .replace("url('/assets/hero-sunlit.webp')", `url('${heroB1}')`)
  .replace("url('/assets/church-arch.webp')", `url('${churchB2}')`)
  .replace("url('/assets/reception-lanterns.webp')", `url('${recepB3}')`)
  .replace("url('/assets/mandapam-arch.webp')", `url('${mandapamB4}')`)
  .replace("url('/assets/story-bg.webp')", `url('${storyB5}')`)
  .replace("url('/assets/garland.webp')", `url('${garlandImg}')`)
  .replace("url('/assets/church-bell.webp')", `url('${churchBellImg}')`)
  .replace("url('/assets/lantern.webp')", `url('${lanternImg}')`)
  .replace("url('/assets/bell.png')", `url('${bellImg}')`);

// 3. Assemble HTML
console.log('Assembling standalone HTML...');
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title id="doc-title">Amal &amp; Shravani – Wedding Invitation</title>
  <meta name="description" content="Wedding invitation for Amal &amp; Shravani. Two faiths, one love. Celebrating Holy Matrimony, Reception, and Wedding Ceremony on 6 &amp; 7 January 2027.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Amal &amp; Shravani – Wedding Invitation">
  <meta property="og:description" content="Two faiths, one love. Where two cultures meet, one love begins. 6 &amp; 7 January 2027.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Noto+Serif+Malayalam:wght@500;600&display=swap" rel="stylesheet">

  <style>
${combinedCss}
  </style>
</head>
<body>
  <!-- Global Vector Symbols -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff0b0"/>
        <stop offset=".35" stop-color="#d9a53a"/>
        <stop offset=".65" stop-color="#8f5f14"/>
        <stop offset="1" stop-color="#f3d27a"/>
      </linearGradient>
      <g id="lotus">
        <path d="M11 2c3 4 3 10 0 14-3-4-3-10 0-14Zm-9 7c5 0 8 3 9 8-5 0-9-3-9-8Zm18 0c-5 0-8 3-9 8 5 0 9-3 9-8Z" fill="url(#gold)"/>
      </g>
      <g id="cross">
        <path d="M10.5 1h3v7h7v3h-7v12h-3V11h-7V8h7Z" fill="url(#gold)"/>
      </g>
      <g id="ganesha">
        <path d="M50 4 L53 12 L61 14 L55 20 L58 28 L50 24 L42 28 L45 20 L39 14 L47 12 Z" fill="url(#gold)"/>
        <circle cx="50" cy="10" r="1.5" fill="#fff"/>
        <path d="M47 28 C48 31 52 31 53 28" fill="none" stroke="url(#gold)" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="50" cy="27" r="1.5" fill="url(#gold)"/>
        <path d="M50 20 L50 25" stroke="url(#gold)" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M41 29 C31 30 22 36 24 49 C26 56 33 56 38 52 C35 48 34 38 40 33" fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M59 29 C69 30 78 36 76 49 C74 56 67 56 62 52 C65 48 66 38 60 33" fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M41 31 C45 33 55 33 59 31" fill="none" stroke="url(#gold)" stroke-width="2" stroke-linecap="round"/>
        <path d="M42 50 L36 52" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M45 35 C44 46 45 61 50 71 C54 78 61 82 68 79 C74 76 75 68 70 64 C64 60 59 66 61 71 C62 73 65 74 67 73" fill="none" stroke="url(#gold)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="68" cy="70" r="3.2" fill="url(#gold)"/>
        <path d="M34 84 C42 80 50 82 50 86 C50 82 58 80 66 84 C59 88 50 89 34 84 Z" fill="url(#gold)"/>
      </g>
    </defs>
  </svg>

  <!-- Gate Overlay Doors -->
  <div id="gate" role="dialog" aria-modal="true" aria-label="Wedding Invitation Envelope">
    <div class="d a" aria-hidden="true"></div>
    <div class="d b" aria-hidden="true"></div>
    <div class="t">
      <p class="cap" style="color:var(--goldl)">YOU ARE INVITED</p>
      <p class="script gate-couple-names" style="font-size:clamp(3rem,12vw,5rem);color:var(--goldl)">Amal &amp; Shravani</p>
      <button id="open" type="button">OPEN INVITATION</button>
    </div>
  </div>

  <!-- Falling Petals Canvas -->
  <canvas id="petals" aria-hidden="true"></canvas>

  <!-- Floating Music Toggle Button -->
  <button id="music-toggle" type="button" class="music-btn" aria-label="Toggle background music" aria-pressed="false">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
    <span class="music-waves" aria-hidden="true">
      <i></i><i></i><i></i>
    </span>
  </button>

  <!-- 6-Dot Navigation Menu -->
  <nav class="nav" aria-label="Section shortcuts">
    <a href="#hero" class="on" aria-label="Welcome"></a>
    <a href="#story" aria-label="Our Story"></a>
    <a href="#moments" aria-label="Moments"></a>
    <a href="#e1" aria-label="Christian Wedding &amp; Reception"></a>
    <a href="#e3" aria-label="Wedding Ceremony"></a>
    <a href="#rsvp" aria-label="RSVP"></a>
  </nav>

  <!-- Main Content Landmark -->
  <main id="main">
    <!-- 1. Hero Section -->
    <section id="hero" aria-label="Welcome">
      <div class="bg b1"><i class="fl"></i><i class="pc"></i></div>
      <div class="cl">
        <i class="art gar" style="left:0"></i>
        <i class="art gar r" style="right:0;transform:scaleX(-1)"></i>
        <i class="art chb" style="z-index:8"></i>
        <i class="art lan r" style="z-index:8"></i>
      </div>
      <div class="col">
        <div class="sym rv z" style="--i:0">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#cross"/></svg>
          <svg viewBox="0 0 22 22" aria-hidden="true"><use href="#lotus"/></svg>
        </div>
        <p class="cap rv hero-tagline" style="--i:1">TWO FAITHS · ONE LOVE</p>
        <h1 class="gt rv hero-first" style="--i:2">Amal</h1>
        <span class="script rv hero-weds" style="--i:3">weds</span>
        <h1 class="gt rv hero-second" style="--i:4">Shravani</h1>
        <p class="rv hero-quote" style="--i:5;font-style:italic">Where two cultures meet, one love begins</p>
        <p class="cap rv hero-dates" style="--i:6">6 &amp; 7 JANUARY 2027</p>
      </div>
      <span class="scroll cap" aria-hidden="true">SCROLL ↓</span>
    </section>

    <!-- 2. Our Story Section -->
    <section id="story" aria-label="Our Story">
      <div class="bg b5"><i class="fl"></i><i class="pc"></i></div>
      <div class="col">
        <p class="cap rv story-label" style="--i:0">OUR STORY</p>
        <h2 class="rv story-heading" style="--i:1;margin-top:.3rem;color:#5a1212">
          How it all<br><span class="script" style="font-size:1.3em">began</span>
        </h2>
        <div class="car rv" style="--i:2" aria-roledescription="carousel" aria-label="Our story timeline">
          <!-- Slide 1 -->
          <article class="sl on" role="group" aria-roledescription="slide" aria-label="Slide 1 of 4" aria-hidden="false">
            <figure class="frame"><img src="${story1}" alt="Classmates &amp; Quiet Years" loading="eager" decoding="async"></figure>
            <div class="cp">
              <span class="yr">CHAPTER I</span>
              <h3>Classmates &amp; Quiet Years</h3>
              <p class="st-text">We met as classmates, and grew through quiet years, where love arrived not like a storm, but like steady rain.</p>
            </div>
          </article>
          <!-- Slide 2 -->
          <article class="sl" role="group" aria-roledescription="slide" aria-label="Slide 2 of 4" aria-hidden="true">
            <figure class="frame"><img src="${story2}" alt="Through Every Weather" loading="lazy" decoding="async"></figure>
            <div class="cp">
              <span class="yr">CHAPTER II</span>
              <h3>Through Every Weather</h3>
              <p class="st-text">Through differences, doubts, and challenges along the way, we still stood, we learned, we grew...</p>
            </div>
          </article>
          <!-- Slide 3 -->
          <article class="sl" role="group" aria-roledescription="slide" aria-label="Slide 3 of 4" aria-hidden="true">
            <figure class="frame"><img src="${story3}" alt="Grateful Hearts" loading="lazy" decoding="async"></figure>
            <div class="cp">
              <span class="yr">CHAPTER III</span>
              <h3>Grateful Hearts</h3>
              <p class="st-text">...and now with grateful hearts, we invite you to celebrate the day we begin our life, side by side.</p>
            </div>
          </article>
          <!-- Slide 4 -->
          <article class="sl" role="group" aria-roledescription="slide" aria-label="Slide 4 of 4" aria-hidden="true">
            <figure class="frame"><img src="${story4}" alt="Side by Side Forever" loading="lazy" decoding="async"></figure>
            <div class="cp">
              <span class="yr">CHAPTER IV</span>
              <h3>Side by Side Forever</h3>
              <p class="st-text">Two cultures, two faiths, one journey. Hand in hand, celebrating the bond that grew through quiet years.</p>
            </div>
          </article>
        </div>
        <div class="ctl rv" style="--i:3">
          <button id="pv" type="button" aria-label="Previous story slide">&#8249;</button>
          <span class="dts" role="group" aria-label="Slide indicators">
            <i class="on" role="button" aria-label="Go to slide 1" tabindex="0"></i>
            <i role="button" aria-label="Go to slide 2" tabindex="0"></i>
            <i role="button" aria-label="Go to slide 3" tabindex="0"></i>
            <i role="button" aria-label="Go to slide 4" tabindex="0"></i>
          </span>
          <button id="nx" type="button" aria-label="Next story slide">&#8250;</button>
        </div>
      </div>
    </section>

    <!-- 3. Moments Section -->
    <section id="moments" aria-label="Moments">
      <div class="mh" data-rv>
        <p class="cap rv moments-label" style="--i:0">MOMENTS</p>
        <h2 class="rv moments-heading" style="--i:1;margin-top:.3rem">
          Our <span class="script" style="font-size:1.3em">memories</span>
        </h2>
      </div>
      <div class="cols">
        <article class="mo" style="--r:-1.5deg" data-rv>
          <button type="button" class="pl" aria-label="View photo: Morning quiet, steady love">
            <figure>
              <img src="${moment1}" alt="Morning quiet, steady love" loading="lazy" decoding="async">
              <figcaption>Morning quiet, steady love</figcaption>
            </figure>
          </button>
        </article>
        <article class="mo" style="--r:1.8deg" data-rv>
          <button type="button" class="pl" aria-label="View photo: Where cultures meet">
            <figure>
              <img src="${moment2}" alt="Where cultures meet" loading="lazy" decoding="async">
              <figcaption>Where cultures meet</figcaption>
            </figure>
          </button>
        </article>
        <article class="mo" style="--r:-0.8deg" data-rv>
          <button type="button" class="pl" aria-label="View photo: Two faiths, one promise">
            <figure>
              <img src="${moment3}" alt="Two faiths, one promise" loading="lazy" decoding="async">
              <figcaption>Two faiths, one promise</figcaption>
            </figure>
          </button>
        </article>
        <article class="mo" style="--r:2.2deg" data-rv>
          <button type="button" class="pl" aria-label="View photo: Laughter in between">
            <figure>
              <img src="${moment4}" alt="Laughter in between" loading="lazy" decoding="async">
              <figcaption>Laughter in between</figcaption>
            </figure>
          </button>
        </article>
        <article class="mo" style="--r:-1.2deg" data-rv>
          <button type="button" class="pl" aria-label="View photo: Hand in hand, always">
            <figure>
              <img src="${moment5}" alt="Hand in hand, always" loading="lazy" decoding="async">
              <figcaption>Hand in hand, always</figcaption>
            </figure>
          </button>
        </article>
      </div>
    </section>

    <!-- 4. The Christian Wedding & Reception (Combined Page 4) -->
    <section id="e1" class="ev" aria-label="The Christian Wedding &amp; Reception">
      <div class="bg b2"><i class="fl"></i><i class="pc"></i></div>
      <div class="col">
        <p class="cap rv" style="--i:0;color:#3b4826">WEDNESDAY · 6 JANUARY 2027</p>
        
        <div class="ev-sub ev-church rv" style="--i:1">
          <p class="cap" style="color:#6e5828;font-size:0.7em">PART I · HOLY MATRIMONY</p>
          <h3 style="color:#3b4826">Church <span class="script" style="color:#8a6a28">Wedding</span></h3>
          <p class="meta" style="font-size:1.15em;margin:.15rem 0">at 3:00 pm</p>
          <p class="venue" style="font-size:0.95em">
            <strong>St. Mary's Forane Church</strong><br>
            Main Road, Chalakudy, Kerala
          </p>
          <a class="btn btn-sm" href="https://maps.google.com/?q=St+Marys+Forane+Church+Chalakudy" target="_blank" rel="noopener">VIEW CHURCH LOCATION</a>
        </div>

        <svg class="orn rv" style="--i:2;margin:0.8rem auto" viewBox="0 0 160 22" aria-hidden="true">
          <path d="M0 11h60M100 11h60" stroke="#b8872e"/>
          <g transform="translate(69 0)"><use href="#cross"/></g>
        </svg>

        <div class="ev-sub ev-reception rv" style="--i:3">
          <p class="cap" style="color:#6e5828;font-size:0.7em">PART II · DINNER &amp; TOASTS</p>
          <h3 style="color:#3b4826">Evening <span class="script" style="color:#8a6a28">Reception</span></h3>
          <p class="meta" style="font-size:1.15em;margin:.15rem 0">from 6:00 pm onwards</p>
          <p class="venue" style="font-size:0.95em">
            <strong>Grand Heritage Manor</strong><br>
            Convention Centre &amp; Lawns, Thrissur, Kerala
          </p>
          <a class="btn btn-sm" href="https://maps.google.com/?q=Grand+Heritage+Manor+Thrissur" target="_blank" rel="noopener">VIEW RECEPTION LOCATION</a>
        </div>
      </div>
    </section>

    <!-- 5. The Hindu Wedding Ceremony (Page 5) -->
    <section id="e3" class="ev" aria-label="The Wedding Ceremony">
      <div class="bg b4"><i class="fl"></i><i class="pc"></i></div>
      <div class="box"><i class="glow" style="left:39%;top:80%;width:18%;aspect-ratio:1"></i></div>
      <div class="cl">
        <i class="art bel" style="left:50%;margin-left:calc(var(--cw)*-.075);z-index:8"></i>
      </div>
      <div class="col">
        <div class="malayalam-verse-wrap rv" style="--i:0">
          <p class="malayalam-invocation">ഓം ശ്രീ മഹാഗണപതയേ നമഃ</p>
        </div>
        <p class="cap rv" style="--i:1;color:#8a5a1a;margin-top:.35rem">THE WEDDING CEREMONY</p>
        <h2 class="rv" style="--i:2;margin-top:.25rem">
          Wedding<br><span class="script" style="font-size:1.3em;color:#a8741f">Ceremony</span>
        </h2>
        <svg class="orn rv" style="--i:3" viewBox="0 0 160 22" aria-hidden="true">
          <path d="M0 11h60M100 11h60" stroke="#b8872e"/>
          <g transform="translate(69 0)"><use href="#lotus"/></g>
        </svg>
        <p class="big rv" style="--i:4">Thursday<br>7 January 2027</p>
        <p class="meta rv" style="--i:5">at 11:00 am</p>
        <p class="meta rv" style="--i:6;font-style:italic;font-size:1.1em">Traditional attire</p>
        <a class="btn rv" style="--i:7" href="https://share.google/gn3vFEz7rnIxpTN5b" target="_blank" rel="noopener">
          VIEW LOCATION
        </a>
      </div>
    </section>

    <!-- 6. RSVP Section (Page 6) -->
    <section id="rsvp" aria-label="RSVP">
      <div class="bg b5"><i class="fl"></i><i class="pc"></i></div>
      <div class="col">
        <div class="seal rv z" style="--i:0" aria-hidden="true">A&amp;S</div>
        <p class="cap rv" style="--i:1">RSVP</p>
        <h2 class="rv" style="--i:2;margin-top:.3rem">
          Will you<br><span class="script" style="font-size:1.3em">join us?</span>
        </h2>
        <p class="rv rsvp-subheading" style="--i:3;font-style:italic;font-size:1.15em;margin-top:.5rem">
          Your presence is the greatest gift. Please let us know.
        </p>
        <div class="rs" id="rs">
          <div class="rv" style="--i:4">
            <label for="rn">YOUR NAME</label>
            <input id="rn" type="text" autocomplete="name" placeholder="Full name">
          </div>
          <div class="rv" style="--i:5">
            <span class="lb">WILL YOU ATTEND?</span>
            <div class="chips" id="att">
              <button type="button" class="chip on" data-v="1">JOYFULLY ACCEPT</button>
              <button type="button" class="chip" data-v="0">REGRETFULLY DECLINE</button>
            </div>
          </div>
          <div id="evq">
            <div class="rv" style="--i:6">
              <span class="lb">WHICH CELEBRATIONS?</span>
              <div class="chips" id="evs">
                <button type="button" class="chip on">CHRISTIAN WEDDING &amp; RECEPTION · 6 JAN</button>
                <button type="button" class="chip on">WEDDING CEREMONY · 7 JAN, 11 AM</button>
              </div>
            </div>
            <div class="rv" style="--i:7">
              <span class="lb">NUMBER OF GUESTS</span>
              <div class="stp">
                <button type="button" id="gm" aria-label="Fewer guests">&minus;</button>
                <b id="gn">1</b>
                <button type="button" id="gp" aria-label="More guests">+</button>
              </div>
            </div>
          </div>
          <div class="rv" style="--i:8">
            <label for="rm">A MESSAGE FOR THE COUPLE (OPTIONAL)</label>
            <textarea id="rm" placeholder="Your blessings and wishes"></textarea>
          </div>
          <div class="rv" style="--i:9">
            <button type="button" class="send" id="sd">SEND RSVP ON WHATSAPP</button>
            <p class="err" id="er" role="alert"></p>
          </div>
        </div>
        <div class="ty" id="ty">
          <h3>Thank you</h3>
          <p style="font-style:italic;font-size:1.2em">Your reply is on its way. We can’t wait to celebrate with you.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- Lightbox Modal -->
  <div id="lb" role="dialog" aria-modal="true" aria-label="Enlarged photo preview" aria-hidden="true">
    <button type="button" class="lb-close" aria-label="Close enlarged photo">&times;</button>
    <figure>
      <img alt="" src="" decoding="async">
      <figcaption></figcaption>
    </figure>
  </div>

  <!-- Footer with Countdown -->
  <footer role="contentinfo">
    <p class="script footer-title">Amal &amp; Shravani</p>
    <p class="footer-cd-title" style="font-style:italic;margin-top:.5rem">Counting down to the wedding</p>
    <div class="cd" role="timer" aria-label="Countdown to wedding day">
      <div><b id="d">0</b><span>DAYS</span></div>
      <div><b id="h">0</b><span>HOURS</span></div>
      <div><b id="m">0</b><span>MINS</span></div>
      <div><b id="s">0</b><span>SECS</span></div>
    </div>
    <p class="footer-blessing" style="font-style:italic">With the blessings of our families, we can’t wait to celebrate with you.</p>
  </footer>

  <script>
  (function () {
    // 1. Dynamic Domain Order (amalandshravani.com vs shravaniandamal.com or ?order=shravani)
    var urlParams = new URLSearchParams(window.location.search);
    var hostname = window.location.hostname.toLowerCase();
    var isShravaniFirst = hostname.includes('shravaniandamal') || urlParams.get('order') === 'shravani';

    var coupleName = isShravaniFirst ? 'Shravani & Amal' : 'Amal & Shravani';
    var firstName = isShravaniFirst ? 'Shravani' : 'Amal';
    var secondName = isShravaniFirst ? 'Amal' : 'Shravani';

    document.title = coupleName + ' – Wedding Invitation';
    var gateTitle = document.querySelector('.gate-couple-names');
    if (gateTitle) gateTitle.textContent = coupleName;
    var footerTitle = document.querySelector('.footer-title');
    if (footerTitle) footerTitle.textContent = coupleName;
    var heroFirst = document.querySelector('.hero-first');
    if (heroFirst) heroFirst.textContent = firstName;
    var heroSecond = document.querySelector('.hero-second');
    if (heroSecond) heroSecond.textContent = secondName;

    // 2. Envelope Gate Open
    var gate = document.getElementById('gate');
    document.body.style.overflow = 'hidden';
    var openBtn = document.getElementById('open');
    if (openBtn) {
      openBtn.onclick = function () {
        gate.classList.add('open');
        document.body.style.overflow = '';
        setTimeout(function () {
          var hero = document.getElementById('hero');
          if (hero) hero.classList.add('in');
        }, 700);
      };
    }

    // 3. Section and Nav Dot Observer
    var secs = [].slice.call(document.querySelectorAll('section'));
    var dots = [].slice.call(document.querySelectorAll('.nav a'));

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var t = e.target;
        if (e.isIntersecting && (t.id !== 'hero' || (gate && gate.classList.contains('open')))) {
          t.classList.add('in');
        } else if (!e.isIntersecting && t.id !== 'hero') {
          t.classList.remove('in');
        }
      });
    }, { threshold: 0.35 });

    secs.forEach(function (s) {
      if (s.id !== 'moments') io.observe(s);
    });

    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          dots.forEach(function (d, i) {
            d.classList.toggle('on', secs[i] === e.target);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    secs.forEach(function (s) { dio.observe(s); });

    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-rv]').forEach(function (e) { ro.observe(e); });

    // 4. Story Carousel
    var sl = [].slice.call(document.querySelectorAll('.sl'));
    var dt = document.querySelector('.dts');
    var cur = 0;
    var hov = false;

    function go(n) {
      if (!sl.length) return;
      var o = sl[cur];
      o.classList.remove('on');
      o.classList.add('out');
      setTimeout(function () { o.classList.remove('out'); }, 950);
      cur = (n + sl.length) % sl.length;
      sl[cur].classList.add('on');
      if (dt) {
        [].forEach.call(dt.children, function (d, i) {
          d.classList.toggle('on', i === cur);
        });
      }
    }

    if (dt) {
      [].forEach.call(dt.children, function (d, i) {
        d.onclick = function () { go(i); };
      });
    }

    var pv = document.getElementById('pv');
    var nx = document.getElementById('nx');
    if (pv) pv.onclick = function () { go(cur - 1); };
    if (nx) nx.onclick = function () { go(cur + 1); };

    setInterval(function () {
      var story = document.getElementById('story');
      if (!hov && story && story.classList.contains('in')) {
        go(cur + 1);
      }
    }, 6500);

    var car = document.querySelector('.car');
    if (car) {
      car.onpointerenter = function () { hov = true; };
      car.onpointerleave = function () { hov = false; };
      var sx = 0;
      car.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      car.addEventListener('touchend', function (e) {
        var d = e.changedTouches[0].clientX - sx;
        if (Math.abs(d) > 40) go(cur + (d < 0 ? 1 : -1));
      });
    }

    // 5. Lightbox
    var lb = document.getElementById('lb');
    var li = lb ? lb.querySelector('img') : null;
    var lc = lb ? lb.querySelector('figcaption') : null;
    document.querySelectorAll('.pl').forEach(function (p) {
      p.onclick = function () {
        if (!lb || !li) return;
        var img = p.querySelector('img');
        var cap = p.querySelector('figcaption');
        if (img) li.src = img.src;
        if (lc && cap) lc.textContent = cap.textContent;
        lb.classList.add('on');
      };
    });
    if (lb) {
      lb.onclick = function () { lb.classList.remove('on'); };
      var closeBtn = lb.querySelector('.lb-close');
      if (closeBtn) closeBtn.onclick = function (e) { e.stopPropagation(); lb.classList.remove('on'); };
    }

    // 6. WhatsApp RSVP Form
    var RSVP_PHONE = '919876543210';
    var at = 1;
    var gc = 1;
    var rs = document.getElementById('rs');
    var evq = document.getElementById('evq');

    [].forEach.call(document.querySelectorAll('#att .chip'), function (b) {
      b.onclick = function () {
        at = +b.dataset.v;
        [].forEach.call(document.querySelectorAll('#att .chip'), function (c) {
          c.classList.toggle('on', c === b);
        });
        if (evq) evq.classList.toggle('off', !at);
      };
    });

    [].forEach.call(document.querySelectorAll('#evs .chip'), function (b) {
      b.onclick = function () { b.classList.toggle('on'); };
    });

    var gm = document.getElementById('gm');
    var gp = document.getElementById('gp');
    var gn = document.getElementById('gn');
    if (gm) gm.onclick = function () { gc = Math.max(1, gc - 1); if (gn) gn.textContent = gc; };
    if (gp) gp.onclick = function () { gc = Math.min(10, gc + 1); if (gn) gn.textContent = gc; };

    var sd = document.getElementById('sd');
    if (sd) {
      sd.onclick = function () {
        var n = (document.getElementById('rn').value || '').trim();
        var er = document.getElementById('er');
        var evs = [].filter.call(document.querySelectorAll('#evs .chip'), function (c) {
          return c.classList.contains('on');
        }).map(function (c) { return c.textContent.trim(); });

        if (!n) {
          if (er) er.textContent = 'Please enter your name.';
          return;
        }
        if (at && !evs.length) {
          if (er) er.textContent = 'Please choose at least one celebration.';
          return;
        }
        if (er) er.textContent = '';
        var m = (document.getElementById('rm').value || '').trim();
        var msg = 'RSVP for ' + coupleName + '\\n' +
          'Name: ' + n + '\\n' +
          (at ? 'Attending: Yes\\nGuests: ' + gc + '\\nEvents: ' + evs.join(', ') : 'Attending: No (regretfully declines)') +
          (m ? '\\nMessage: ' + m : '');

        var a = document.createElement('a');
        a.href = 'https://wa.me/' + RSVP_PHONE + '?text=' + encodeURIComponent(msg);
        a.target = '_blank';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();

        if (rs) {
          rs.style.transition = 'opacity .5s';
          rs.style.opacity = '0';
          setTimeout(function () {
            rs.style.display = 'none';
            var ty = document.getElementById('ty');
            if (ty) ty.classList.add('on');
          }, 500);
        }
      };
    }

    // 7. Live Countdown Timer
    var targetTime = new Date('2027-01-06T15:00:00+05:30').getTime();
    var timerIds = ['d', 'h', 'm', 's'].map(function (id) { return document.getElementById(id); });
    function updateCountdown() {
      var diff = Math.max(0, targetTime - Date.now());
      var vals = [
        Math.floor(diff / 864e5),
        Math.floor(diff / 36e5) % 24,
        Math.floor(diff / 6e4) % 60,
        Math.floor(diff / 1e3) % 60
      ];
      timerIds.forEach(function (el, i) {
        if (!el) return;
        var str = String(vals[i]);
        if (el.textContent !== str) {
          el.textContent = str;
          el.style.transform = 'scale(1.2)';
          setTimeout(function () { el.style.transform = ''; }, 180);
        }
      });
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 8. Petals Canvas Animation
    var cvs = document.getElementById('petals');
    if (cvs) {
      var ctx = cvs.getContext('2d');
      var particles = [];
      var cw, ch;
      function resizeCanvas() {
        cw = cvs.width = window.innerWidth;
        ch = cvs.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      var petalColors = ['#f6d98a', '#fff3d6', '#e8a0a0', '#d9b85a'];
      var count = window.innerWidth < 600 ? 14 : 28;
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * cw,
          y: Math.random() * ch,
          r: 3 + Math.random() * 4,
          s: 0.4 + Math.random() * 0.9,
          d: Math.random() * 6,
          c: petalColors[i % 4]
        });
      }

      function renderPetals() {
        ctx.clearRect(0, 0, cw, ch);
        particles.forEach(function (p) {
          p.y += p.s;
          p.d += 0.02;
          p.x += Math.sin(p.d) * 0.8;
          if (p.y > ch + 10) {
            p.y = -10;
            p.x = Math.random() * cw;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.d);
          ctx.fillStyle = p.c;
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        requestAnimationFrame(renderPetals);
      }
      renderPetals();
    }

    // 9. Escape Key listener
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb) lb.classList.remove('on');
      if (e.key === 'ArrowRight') go(cur + 1);
      if (e.key === 'ArrowLeft') go(cur - 1);
    });
  })();
  </script>
</body>
</html>`;

// Write to wedding-invite-single.html in root
fs.writeFileSync('wedding-invite-single.html', htmlContent);
console.log('Successfully wrote wedding-invite-single.html (Length:', htmlContent.length, 'bytes)');

// Also write to assets/wedding-invite-v6.html
fs.writeFileSync('assets/wedding-invite-v6.html', htmlContent);
console.log('Successfully wrote assets/wedding-invite-v6.html');
