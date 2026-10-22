import * as React from 'react';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';
import { Calendar, createCalendarDateTimeFormatter } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarFormatters, CalendarProps } from '@fluentui/react-headless-components-preview/calendar';
import styles from './calendar.module.css';

const calendarAppearance = {
  className: styles.calendar,
  liveRegion: { className: styles.liveRegion },
  divider: { className: styles.divider },
  goToTodayButton: { className: styles.todayButton },
  monthPickerWrapper: { className: styles.monthPicker },
  dayPicker: {
    header: { className: styles.header },
    heading: { className: styles.heading },
    navigation: { className: styles.navigation },
    previousMonthButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
    nextMonthButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
    grid: { className: styles.grid },
  },
  monthPicker: {
    header: { className: styles.header },
    heading: { className: styles.heading },
    navigation: { className: styles.navigation },
    previousYearButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
    nextYearButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
    grid: { className: styles.pickerGrid },
    yearPicker: {
      header: { className: styles.header },
      heading: { className: styles.heading },
      navigation: { className: styles.navigation },
      previousRangeButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
      nextRangeButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
      grid: { className: styles.pickerGrid },
    },
  },
} satisfies CalendarProps;

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
