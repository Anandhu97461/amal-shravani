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

  // Wedding Events (Holy Matrimony, Reception, Ceremony)
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
      // Venue fields: leave empty ('') unless you wish to display a specific venue name & address
      venueName: '',
      venueAddress: '',
      bgClass: 'b2',
      calendar: {
        summary: 'Amal & Shravani – Holy Matrimony',
        description: 'The Christian Wedding ceremony of Amal & Shravani. Holy Matrimony. Location: https://share.google/2TApOwZx3mzD7lfUB',
        start: '20270106T093000Z', // 3:00 PM IST (UTC 09:30)
        end: '20270106T113000Z',   // 5:00 PM IST (UTC 11:30)
        location: 'https://share.google/2TApOwZx3mzD7lfUB'
      }
    },
    {
      id: 'e2',
      category: 'CHRISTIAN WEDDING',
      titleMain: 'Wedding',
      titleScript: 'Reception',
      date: 'Wednesday\n6 January 2027',
      time: 'at 6:00 pm',
      note: 'Dinner, music and dancing to follow',
      shareLink: 'https://share.google/y7osfZR57u3zfTRcf',
      venueName: '',
      venueAddress: '',
      bgClass: 'b3',
      calendar: {
        summary: 'Amal & Shravani – Wedding Reception',
        description: 'Wedding Reception for Amal & Shravani. Dinner, music and dancing to follow. Location: https://share.google/y7osfZR57u3zfTRcf',
        start: '20270106T123000Z', // 6:00 PM IST (UTC 12:30)
        end: '20270106T163000Z',   // 10:00 PM IST (UTC 16:30)
        location: 'https://share.google/y7osfZR57u3zfTRcf'
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
      calendar: {
        summary: 'Amal & Shravani – Wedding Ceremony',
        description: 'The Wedding Ceremony of Amal & Shravani. Traditional attire. Location: https://share.google/gn3vFEz7rnIxpTN5b',
        start: '20270107T053000Z', // 11:00 AM IST (UTC 05:30)
        end: '20270107T083000Z',   // 2:00 PM IST (UTC 08:30)
        location: 'https://share.google/gn3vFEz7rnIxpTN5b'
      }
    }
  ],

  // Our Story Carousel Chapters
  story: {
    label: 'OUR STORY',
    headingMain: 'How it all',
    headingScript: 'began',
    chapters: [
      {
        title: 'Where it began',
        text: 'A simple conversation over coffee turned into a story we never wanted to end.',
        image: '/assets/story-1.webp',
        alt: 'Where it began – Amal and Shravani sharing coffee',
        width: 760,
        height: 949
      },
      {
        title: 'Wandering together',
        text: 'Long walks, quiet sunsets and a growing certainty that home was wherever the other one was.',
        image: '/assets/story-2.webp',
        alt: 'Wandering together – sunset walk along the backwaters',
        width: 760,
        height: 949
      },
      {
        title: 'The question',
        text: 'Under a canopy of fairy lights, one question and one very happy yes.',
        image: '/assets/story-3.webp',
        alt: 'The question – rooftop proposal under fairy lights',
        width: 760,
        height: 949
      },
      {
        title: 'Forever begins',
        text: 'Two families, two traditions, one promise. Come and celebrate with us.',
        image: '/assets/story-4.webp',
        alt: 'Forever begins – Amal and Shravani ready for celebration',
        width: 760,
        height: 949
      }
    ]
  },

  // Moments Gallery / Polaroid Collage
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
        caption: 'Golden hour',
        image: '/assets/moment-4.webp',
        alt: 'Golden hour – portrait in golden saree',
        aspectRatio: '4/5',
        delay: '-2.7s',
        rotation: '2.5deg',
        width: 800,
        height: 999
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
        caption: 'Ready for the day',
        image: '/assets/moment-6.webp',
        alt: 'Ready for the day – Amal in Nehru jacket portrait',
        aspectRatio: '1/1',
        delay: '-4.5s',
        rotation: '1.5deg',
        width: 800,
        height: 800
      },
      {
        caption: 'Hand in hand',
        image: '/assets/moment-7.webp',
        alt: 'Hand in hand – golden hour walk together',
        aspectRatio: '4/5',
        delay: '-5.4s',
        rotation: '-2.5deg',
        width: 800,
        height: 999
      },
      {
        caption: 'Our little rituals',
        image: '/assets/moment-8.webp',
        alt: 'Our little rituals – morning coffee and fresh jasmine note',
        aspectRatio: '1/1',
        delay: '-6.3s',
        rotation: '2deg',
        width: 800,
        height: 800
      }
    ]
  },

  // 6 Dot Navigation links
  navigation: [
    { target: '#hero', label: 'Welcome' },
    { target: '#story', label: 'Our story' },
    { target: '#moments', label: 'Moments' },
    { target: '#e1', label: 'Christian wedding' },
    { target: '#e2', label: 'Reception' },
    { target: '#e3', label: 'Wedding ceremony' }
  ]
};

