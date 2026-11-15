/**
 * Calendar Module
 * Generates and downloads standard .ics iCalendar files for each wedding event
 */

export function downloadIcs(eventConfig) {
  if (!eventConfig || !eventConfig.calendar) return;

  const cal = eventConfig.calendar;
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const location = eventConfig.venueName 
    ? `${eventConfig.venueName}${eventConfig.venueAddress ? ', ' + eventConfig.venueAddress : ''}`
    : cal.location || '';

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Amal and Shravani Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${eventConfig.id}-${cal.start}@amalshravani.wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${cal.start}`,
    `DTEND:${cal.end}`,
    `SUMMARY:${cal.summary}`,
    `DESCRIPTION:${cal.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/\n/g, ', ')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `amal-shravani-${eventConfig.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function initCalendarButtons(events) {
  const buttons = document.querySelectorAll('[data-cal-id]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-cal-id');
      const targetEvent = events.find((item) => item.id === id);
      if (targetEvent) {
        downloadIcs(targetEvent);
      }
    });
  });
}

