## Best practices

### Layout

- Don’t break the control apart.
- Include up and down arrow buttons for navigating between time ranges and a chevron to make the calendar collapsible.

### Content

- Use the following format for dates: month, day, year, as in July 31, 2016. When space is limited, use numbers and slashes for dates if the code supports that format and automatically displays the appropriate date format for different locales. For example, 2/16/19.
- Don't use ordinal numbers (such as 1st, 12th, or 23rd) to indicate a date.
- The control provides English labels and date formatting by default. Use `formatters` to override date values and complete accessible labels.
- Omitted formatter properties use the defaults. Override only the properties needed for customization:

  ```tsx
  import { Calendar } from '@fluentui/react-calendar-preview';

  <Calendar formatters={{ weekNumberLabel: data => `Week ${data.weekNumber}` }} showWeekNumbers />;
  ```

- Use the relevant slot prop to replace or suppress a concrete label attribute instead of returning `undefined` from a formatter.

- Use `createCalendarDateTimeFormatter` for locale-aware date formatting:

  ```tsx
  import { Calendar, createCalendarDateTimeFormatter } from '@fluentui/react-calendar-preview';

  <Calendar
    formatters={{
      dateTime: createCalendarDateTimeFormatter('en-GB'),
      weekNumberLabel: data => `Week ${data.weekNumber}`,
    }}
    showWeekNumbers
  />;
  ```

  `createCalendarDateTimeFormatter` follows locale-specific field ordering, so `monthDayYear` and `dayMonthYear` produce the same locale-appropriate full date. Unicode locale extensions can select a calendar or numbering system. Pass `timeZone` when dates must be formatted in a specific zone.

- Partial overrides fall back to English. Localized applications should provide every label formatter, typically through a complete `CalendarFormatters` object supplied by a locale package.
