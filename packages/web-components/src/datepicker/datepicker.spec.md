# Date Picker

## Component Description

lorem ipsum

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/9EHmS5y1Rr7DCh7KgJBwuz/DatePicker?type=design&mode=design&t=E6sL2ffuuZfwCSRp-0)

## Engineering Spec

### Inputs

- @attr `type`: `date`, `month`, `week`, `year`, `range-picker` | the type of the date picker
- @attr `open`: boolean | `false` - If true, the date picker pop-up is open
- @attr `isMonthPickerVisible`: boolean | `true` - Whether the month picker is shown beside the day picker or hidden
- @attr `showMonthPickerOverlay`: boolean | `false` - If true, show month picker on top of date picker when visible
- @attr `showWeekNumbers`: boolean | `false` - If true, show week numbers (1-53) before each week row
- @attr `filter`: `week`, `work-week`, `4`, `3`, `2`, `1` | allow user to view selected date with a range filter
- @attr `firstDayOfWeek`: number | the first day of the week for your locale 0-6
- @attr `showGoToToday`: boolean | `true` - If true, show 'Go to today' link at link slot
- @attr `allowTextInput`": allow the user to select date by typing manually in keyboard
- @attr `today`: string | value of today
- @attr `selectedDates`: string
- @attr `startDate`: string | start date when type is set to `range-picker`
- @attr `endDate`: string | end date when type is set to `range-picker`
- @attr `formatDate`: `((date?: Date) => string)` | optional method to format the chosen date to a string
- @attr `parseDateFromString`: `((dateStr: string) => Date | null)` | parse text input to date when `allowTextInput` is set to true

### Outputs

- [selectedDates: string] - the selected dates from the date picker

### Events

- `input`: Emits when text is entered via user interaction
- `change`: Emits when the selected date(s) is changed
- `date-select`: Emits when user selects a date(s) when no date(s) is currently selected
- `open-change`: Emits when date picker's open status changes
- `view-change`: Emits when view changes (e.g. from date picker to month picker) via user interaction

### Slots

- `start` - content before the date picker
- `end` - content after the date picker
- `link` - link at the bottom right of the base of the calendar (e.g. "Go to today")
- `navicon-left` - left icon on header to navigate backwards for months, years, or range of years
- `navicon-right` - right icon on header to navigate forwards for months, yeras, or range of years

### CSS Variables

None

## Accessibility

- [ ] Find the matching component through [WCAG's patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
  - There is no date picker WCAG pattern
- [ ] Are there any accessibility elements unique to this component?
- [ ] List ARIA attributes: `role, aria-labelledby, aria-label, aria-haspopup, aria-expanded, aria-pressed`
