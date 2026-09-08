import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, calendarFormatters } from '@fluentui/react-calendar-preview';
import type { CalendarFormatters } from '@fluentui/react-calendar-preview';

const formatters: Partial<CalendarFormatters> = {
  dateTime: data => {
    if (data.format === 'day') {
      return new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(data.date);
    }
    if (data.format === 'month') {
      return new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(data.date);
    }

    return calendarFormatters.dateTime(data);
  },
  weekNumberLabel: data => `Week #${data.weekNumber}`,
  yearRangePickerHeaderLabel: data => `Choose a year from ${data.fromYear} to ${data.toYear}`,
};

export const CalendarLocalizedFormatting = (): JSXElement => <Calendar formatters={formatters} showWeekNumbers />;

CalendarLocalizedFormatting.parameters = {
  docs: {
    description: {
      story:
        'Use an Intl-backed date formatter and typed label overrides. Omitted formatters use the default English formatters.',
    },
  },
};
