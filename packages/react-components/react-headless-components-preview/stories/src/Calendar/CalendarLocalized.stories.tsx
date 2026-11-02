import * as React from 'react';
import { Calendar, createCalendarDateTimeFormatter } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarFormatters } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

const germanFormatters: CalendarFormatters = {
  goToTodayLabel: () => 'Heute',
  closeLabel: () => 'Schließen',
  dateTime: createCalendarDateTimeFormatter('de-DE'),
  previousMonthLabel: data => `Vorheriger Monat ${data.formattedDate}`,
  nextMonthLabel: data => `Nächster Monat ${data.formattedDate}`,
  previousYearLabel: data => `Vorheriges Jahr ${data.formattedDate}`,
  nextYearLabel: data => `Nächstes Jahr ${data.formattedDate}`,
  previousYearRangeLabel: data => `Vorheriger Jahresbereich ${data.formattedRange}`,
  nextYearRangeLabel: data => `Nächster Jahresbereich ${data.formattedRange}`,
  monthPickerHeaderLabel: data => `${data.formattedDate}, Jahr ändern`,
  dayPickerHeaderLabel: data => `${data.formattedDate}, Monat ändern`,
  yearRangePickerHeaderLabel: data => `${data.formattedRange}, Jahr ändern`,
  weekNumberLabel: data => `Kalenderwoche ${data.weekNumber}`,
  selectedDateLabel: data => `Ausgewähltes Datum ${data.formattedDate}`,
  todayDateLabel: data => `Heute ${data.formattedDate}`,
  dayMarkedLabel: data => `${data.formattedDate}, markiert`,
};

export const Localized = (): React.ReactNode => (
  <div className={styles.story}>
    <Calendar
      {...calendarAppearance}
      lang="de"
      today={new Date(2025, 9, 14)}
      defaultValue={new Date(2025, 9, 14)}
      firstDayOfWeek="monday"
      firstWeekOfYear="firstFourDayWeek"
      showWeekNumbers
      formatters={germanFormatters}
    />
  </div>
);

Localized.parameters = {
  docs: {
    description: {
      story:
        'Localize both visible dates and assistive-technology labels. The date formatter, first day of the week and week-number convention are configured separately.',
    },
  },
};
