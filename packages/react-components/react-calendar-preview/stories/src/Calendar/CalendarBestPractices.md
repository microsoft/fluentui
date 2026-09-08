## Best practices

### Layout

- Use `layout="auto"` for responsive day/month views. Use `monthPicker={null}` for day-only mode or `dayPicker={null}` for month-only selection.
- Prefer the composed Calendar for normal date selection. Independent pickers require a `CalendarProvider` with shared selection and configuration.
- Preserve the built-in grid roles and keyboard navigation when customizing cells. Use `dayPicker.getDayCellProps` and `monthPicker.yearPicker.renderYear` instead of replacing the grid.

### State and focus

- Use `value={null}` for an empty controlled selection, or `defaultValue={null}` for an empty uncontrolled selection. Do not switch between controlled and uncontrolled mode.
- Selection and navigation are separate. Control `displayedDate` and `onDisplayedDateChange` when the application owns browsing; otherwise external `value` changes navigate automatically.
- Use `view` and `onViewChange` to control the overlay picker. Use `dayPicker={null}`, not a locked month view, to commit month selections.
- Use child picker refs for initial focus. A surrounding Popover or Dialog owns popup positioning, focus trapping, and return focus; Calendar reports dismissal through `onDismiss`.
- In standalone day pickers, honor `onNavigateDate`'s `focusOnNavigatedDay` request by calling the picker handle's `focus()` on the next animation frame after the new date renders.

### Content

- Follow the user's locale for date ordering, month names, and weekday names. Use `createCalendarDateTimeFormatter` to create reusable Intl-backed date formatters.
- Don't use ordinal numbers (such as 1st, 12th, or 23rd) to indicate a date.
- The control provides English labels and date formatting by default. Use `formatters` to override date values and complete accessible labels.
- Omitted formatter properties use the defaults. Override only the properties needed for customization:

  ```tsx
  import { Calendar } from '@fluentui/react-calendar-preview';

  <Calendar formatters={{ weekNumberLabel: data => `Week ${data.weekNumber}` }} showWeekNumbers />;
  ```

- Use the relevant slot prop to replace or suppress a concrete label attribute instead of returning `undefined` from a formatter.

- Localize every label formatter, the Go to today text, and the close-button label when shown. Overriding `dateTime` alone leaves English accessible labels. The Localized Formatting story shows a complete configuration.
- Configure `firstDayOfWeek` and `firstWeekOfYear` for the locale; formatting does not infer week rules.
- Locale extensions and the formatter's `timeZone` option affect labels only. The grid and selected `Date` values still use Gregorian local-date arithmetic.

  ```tsx
  import { createCalendarDateTimeFormatter } from '@fluentui/react-calendar-preview';

  const dateTime = createCalendarDateTimeFormatter('en-GB');
  ```
