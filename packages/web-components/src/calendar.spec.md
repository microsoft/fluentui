# Calendar

## Component Description

lorem ipsum

## Design Spec

Due to the incomplete nature of the v9 calendar design spec, work on the component will be based on the calendar from the v8 api while using the skin of the calendar in the v9 date picker design spec.

[Link to v9 Date Picker Design in Figma](https://www.figma.com/file/9EHmS5y1Rr7DCh7KgJBwuz/DatePicker?type=design&mode=design&t=E6sL2ffuuZfwCSRp-0)

[Link to Fluent v8 Calendar Component](https://developer.microsoft.com/en-us/fluentui#/controls/web/calendar)

## Engineering Spec

### Inputs

- @attr `type`: `date`, `month`, `week`, `year`, `range-picker` | the type of the calendar
- @attr `month-picker-visible`: boolean | `true` - Whether the month picker is shown beside the day picker or hidden
- @attr `month-picker-overlay`: boolean | `false` - If true, show month picker on top of date picker when visible
- @attr `week-numbers`: boolean | `false` - If true, show week numbers (1-53) before each week row
- @attr `min-weeks`: number | minimum number of weeks shown in a month
- @attr `filter`: `week`, `work-week`, `4`, `3`, `2`, `1` | allow user to view selected date with a range filter
- @attr `work-week`: the days that are selectable with the filter `work-week`. If the filter is not set to `work-week`, this does nothing.
- @attr `first-day-of-week`: number | the first day of the week for your locale 0-6
- @attr `show-link`: boolean | `true` - If true, show 'Go to today' link at link slot
- @attr `highlight-current-month`: boolean | `false` - Whether the month picker should highlight the current month
- @attr `highlight-selected-month`: boolean | `false` - Whether the month picker should highlight the selected month
- @attr `today`: string | value of today
- @attr `selected-dates`: string
- @attr `start-date`: string | start date when type is set to `range-picker`
- @attr `end-date`: string | end date when type is set to `range-picker`

### Outputs

- [selectedDates: string] - the selected dates from the calendar

### Events

- `change`: Emits when the selected date(s) is changed
- `date-select`: Emits when user selects a date(s) when no date(s) is currently selected
- `view-change`: Emits when view changes (e.g. from date picker to month picker) via user interaction

### Slots

- `start` - content before the calendar
- `end` - content after the calendar
- `link` - link at the bottom right of the base of the calendar (e.g. "Go to today")
- `navicon-left` - left icon on header to navigate backwards for months, years, or range of years
- `navicon-right` - right icon on header to navigate forwards for months, years, or range of years

### CSS Variables

None

## Accessibility

- [ ] Find the matching component through [WCAG's patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
  - There is no calendar WCAG pattern
- [ ] Are there any accessibility elements unique to this component?
- [ ] List ARIA attributes: `role, aria-labelledby, aria-label, aria-haspopup, aria-expanded, aria-pressed`
