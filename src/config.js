/**
 * Wedding Invitation Configuration for AMAL weds SHRAVANI
 * Edit this file to update names, dates, events, venue details, story chapters, and photo memories
 * without touching markup or styles.
 */

export const invitationConfig = {
  // Couple details & Hero section
  couple: {
    groom: 'Amal',
    bride: 'Shravani',
    title: 'Amal & Shravani',
    tagline: 'TWO FAITHS · ONE LOVE',
    quote: 'Where two cultures meet, one love begins',
    datesHeader: '6 & 7 JANUARY 2027',
    gateBadge: 'YOU ARE INVITED',
    gateButton: 'OPEN INVITATION'
  },

  // Target date for countdown (ISO 8601 string, e.g. IST +05:30)
  countdown: {
    targetDate: '2027-01-06T15:00:00+05:30',
    title: 'Counting down to the wedding',
    blessing: "With the blessings of our families, we can’t wait to celebrate with you."
  },

  // Wedding Events (Holy Matrimony & Reception combined on Page 4, Wedding Ceremony on Page 5)
  events: [
    {
      id: 'e1',
      category: 'THE CHRISTIAN WEDDING',
      titleMain: 'Holy',
      titleScript: 'Matrimony',
      date: 'Wednesday\n6 January 2027',
      time: 'at 3:00 pm',
      note: '',
      shareLink: 'https://share.google/2TApOwZx3mzD7lfUB',
      venueName: '',
      venueAddress: '',
      bgClass: 'b2',
      reception: {
        category: 'WEDDING RECEPTION',
        titleMain: 'Wedding',
        titleScript: 'Reception',
        time: 'at 6:00 pm',
        note: 'Dinner, music and dancing to follow',
        shareLink: 'https://share.google/y7osfZR57u3zfTRcf',
        venueName: '',
        venueAddress: ''
      }
    },
    {
      id: 'e3',
      category: 'THE WEDDING CEREMONY',
      titleMain: 'Wedding',
      titleScript: 'Ceremony',
      date: 'Thursday\n7 January 2027',
      time: 'at 11:00 am',
      note: 'Traditional attire',
      shareLink: 'https://share.google/gn3vFEz7rnIxpTN5b',
      venueName: '',
      venueAddress: '',
      bgClass: 'b4',
      malayalamVerse: {
        invocation: 'ഓം ശ്രീ മഹാഗണപതയേ നമഃ'
      }
    }
  ],

  // Our Story Carousel Chapters (written from client's story)
  story: {
    label: 'OUR STORY',
    headingMain: 'How it all',
    headingScript: 'began',
    chapters: [
      {
        title: 'Quiet years',
        text: 'We met as classmates, and grew through quiet years, where love arrived not like a storm, but like steady rain.',
        image: '/assets/new-story-1.webp',
        alt: 'Where it began – Amal and Shravani sharing quiet moments',
        width: 1147,
        height: 1372
      },
      {
        title: 'Standing strong',
        text: 'Through differences, doubts, and challenges along the way, we still stood, we learned, we grew.',
        image: '/assets/new-story-2.webp',
        alt: 'Through differences, doubts and challenges – sunset walk along the backwaters',
        width: 1122,
        height: 1402
      },
      {
        title: 'Side by side',
        text: 'And now with grateful hearts, we invite you to celebrate the day we begin our life, side by side.',
        image: '/assets/new-story-3.webp',
        alt: 'Side by side – Amal and Shravani ready for celebration',
        width: 1122,
        height: 1402
      },
      {
        title: 'Two faiths, one love',
        text: 'Two traditions, two families, and one lifelong promise. We can’t wait to celebrate with you.',
        image: '/assets/new-story-4.webp',
        alt: 'Two faiths, one love – rooftop proposal under fairy lights',
        width: 1122,
        height: 1402
      }
    ]
  },

  // Moments Gallery / Polaroid Collage (4-5 pictures maximum as requested)
  moments: {
    label: 'MOMENTS',
    headingMain: 'Our',
    headingScript: 'memories',
    items: [
      {
        caption: 'Forever',
        image: '/assets/moment-1.webp',
        alt: 'Forever – wedding rings resting among white lilies',
        aspectRatio: '1/1',
        delay: '0.0s',
        rotation: '-2.5deg',
        width: 800,
        height: 800
      },
      {
        caption: 'Dancing in gold',
        image: '/assets/moment-2.webp',
        alt: 'Dancing in gold – Shravani in golden saree twirl',
        aspectRatio: '4/5',
        delay: '-0.9s',
        rotation: '2deg',
        width: 800,
        height: 999
      },
      {
        caption: 'Sunrise, together',
        image: '/assets/moment-3.webp',
        alt: 'Sunrise, together – morning embrace at the temple',
        aspectRatio: '16/9',
        delay: '-1.8s',
        rotation: '-1.5deg',
        width: 1100,
        height: 619
      },
      {
        caption: 'Rain and laughter',
        image: '/assets/moment-5.webp',
        alt: 'Rain and laughter – joyful moments under a floral umbrella',
        aspectRatio: '16/9',
        delay: '-3.6s',
        rotation: '-2deg',
        width: 1100,
        height: 619
      },
      {
        caption: 'Hand in hand',
        image: '/assets/moment-7.webp',
        alt: 'Hand in hand – golden hour walk together',
        aspectRatio: '4/5',
        delay: '-5.4s',
        rotation: '2.5deg',
        width: 800,
        height: 999
      }
    ]
  },

  // RSVP Configuration
  rsvp: {
    sealMonogram: 'A&S',
    // Couple's WhatsApp phone number with country code (digits only, e.g. '919876543210')
    phone: ''
  },

  // 6 Dot Navigation links
  navigation: [
    { target: '#hero', label: 'Welcome' },
    { target: '#story', label: 'Our story' },
    { target: '#moments', label: 'Moments' },
    { target: '#e1', label: 'Christian wedding & Reception' },
    { target: '#e3', label: 'Wedding ceremony' },
    { target: '#rsvp', label: 'RSVP' }
  ]
};
