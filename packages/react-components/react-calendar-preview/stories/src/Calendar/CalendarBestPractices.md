## Best practices

### Layout

- Don’t break the control apart.
- Include up and down arrow buttons for navigating between time ranges and a chevron to make the calendar collapsible.

### Content

- Use the following format for dates: month, day, year, as in July 31, 2016. When space is limited, use numbers and slashes for dates if the code supports that format and automatically displays the appropriate date format for different locales. For example, 2/16/19.
- Don't use ordinal numbers (such as 1st, 12th, or 23rd) to indicate a date.
- The control provides English labels and date formatting by default. For localized apps, pass `formatLabel` for complete accessible labels and `formatDateTime` for date values.
- Every `formatLabel` call must return meaningful text. To customize selected labels, delegate all other arguments to the default formatter:

  ```tsx
  import { Calendar, formatLabel as defaultFormatLabel } from '@fluentui/react-calendar-preview';
  import type { FormatCalendarLabel } from '@fluentui/react-calendar-preview';

  const formatLabel: FormatCalendarLabel = (...args) => {
    const [label, data] = args;

    if (label === 'weekNumber') {
      return `Week ${data.weekNumber}`;
    }

    return defaultFormatLabel(...args);
  };

  <Calendar formatLabel={formatLabel} showWeekNumbers />;
  ```

- Use the relevant slot prop to replace or suppress a concrete label attribute instead of returning `undefined` from `formatLabel`.

- Use `createCalendarLabelFormatter` for typed partial overrides and `createCalendarDateTimeFormatter` for locale-aware date formatting:

  ```tsx
  import {
    Calendar,
    createCalendarDateTimeFormatter,
    createCalendarLabelFormatter,
  } from '@fluentui/react-calendar-preview';

  const formatDateTime = createCalendarDateTimeFormatter('en-GB');
  const formatLabel = createCalendarLabelFormatter({
    weekNumber: data => `Week ${data.weekNumber}`,
  });

  <Calendar formatDateTime={formatDateTime} formatLabel={formatLabel} showWeekNumbers />;
  ```

  `createCalendarDateTimeFormatter` follows locale-specific field ordering, so `monthDayYear` and `dayMonthYear` produce the same locale-appropriate full date. Unicode locale extensions can select a calendar or numbering system. Pass `timeZone` when dates must be formatted in a specific zone.
