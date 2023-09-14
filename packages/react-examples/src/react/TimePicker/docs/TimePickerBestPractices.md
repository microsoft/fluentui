### Layout

- Time pickers can be coupled with the date picker control. The selected date object returned by the date picker can be supplied to the time picker via time picker's `defaultValue` prop. The time picker should be horizontally aligned next to the date picker if these two controls are used together.

### Content

- By default, the time picker dropdown list displays time options in 30 minute increments over a 24-hour time range using 24-hour formatting (hh:mm).
- The time increment between each dropdown option can be modified using the `increments` prop.
- The overall time range the dropdown options span can be modified using the `timeRange` prop.
- Each dropdown option can display seconds using the `showSeconds` prop.
- Each dropdown option can display time in 12-hour format (hh:mm AM/PM) using the `useHour12` prop.
