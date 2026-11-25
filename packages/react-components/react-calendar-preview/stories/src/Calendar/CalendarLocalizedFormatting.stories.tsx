import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, createCalendarDateTimeFormatter } from '@fluentui/react-calendar-preview';
import type { CalendarFormatters } from '@fluentui/react-calendar-preview';

const formatters: CalendarFormatters = {
  dateTime: createCalendarDateTimeFormatter('de-DE'),
  previousMonthLabel: data => `Vorheriger Monat ${data.formattedDate}`,
  nextMonthLabel: data => `Folgender Monat ${data.formattedDate}`,
  previousYearLabel: data => `Vorheriges Jahr ${data.formattedDate}`,
  nextYearLabel: data => `Folgendes Jahr ${data.formattedDate}`,
  previousYearRangeLabel: data => `Vorherige Jahre ${data.formattedRange}`,
  nextYearRangeLabel: data => `Weitere Jahre ${data.formattedRange}`,
  monthPickerHeaderLabel: data => `${data.formattedDate}, Jahr wechseln`,
  yearPickerHeaderLabel: data => `${data.formattedDate}, Monat wechseln`,
  yearRangePickerHeaderLabel: data => `${data.formattedRange}, Jahr wechseln`,
  weekNumberLabel: data => `Kalenderwoche ${data.weekNumber}`,
  selectedDateLabel: data => `Auswahl: ${data.formattedDate}`,
  todayDateLabel: data => `Heute: ${data.formattedDate}`,
  dayMarkedLabel: data => `${data.formattedDate}, markiert`,
};

export const CalendarLocalizedFormatting = (): JSXElement => (
  <Calendar
    lang="de"
    formatters={formatters}
    firstDayOfWeek="monday"
    firstWeekOfYear="firstFourDayWeek"
    goToTodayButton={{ children: 'Heute' }}
    showWeekNumbers
  />
);

CalendarLocalizedFormatting.parameters = {
  docs: {
    description: {
      story:
        'A fully localized Calendar uses createCalendarDateTimeFormatter for dates, all label formatters for accessibility, ' +
        'and slot props for button text. Week layout and week-number rules are configured separately.',
    },
  },
};
