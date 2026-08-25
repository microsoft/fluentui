import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Calendar,
  createCalendarDateTimeFormatter,
  createCalendarLabelFormatter,
} from '@fluentui/react-calendar-preview';

const formatDateTime = createCalendarDateTimeFormatter('en-GB');
const formatLabel = createCalendarLabelFormatter({
  weekNumber: data => `Week ${data.weekNumber}`,
  yearRangePickerHeader: data => `Choose a year from ${data.formattedRange}`,
});

export const CalendarLocalizedFormatting = (): JSXElement => (
  <Calendar formatDateTime={formatDateTime} formatLabel={formatLabel} showWeekNumbers />
);

CalendarLocalizedFormatting.parameters = {
  docs: {
    description: {
      story:
        'Use an Intl-backed date formatter and typed label overrides while delegating omitted labels to the default English formatter.',
    },
  },
};
