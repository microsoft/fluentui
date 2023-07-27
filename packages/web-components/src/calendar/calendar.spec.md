# Calendar

## Component Description

The Calendar lets users view and select a single date or a range of dates. The calendar has five different views: date, month, week, year, and range-picker.

### Calendar vs. Date Picker Implementation

The calendar and the date picker have significant overlap in inputs, outputs, and events. The difference is that the date picker is essentially a calendar combined with an input field, in which the input field can can interact with the calendar by opening and closing the calendar and displaying/modifying the selected dates of the calendar. It is important to note that the calendar is the component that stores the selected dates, which is then exposed to the date picker.

## Design Spec

Due to the incomplete nature of the v9 calendar design spec, work on the component will be based on the calendar from the v8 api while using the skin of the calendar in the v9 date picker design spec.

[Link to v9 Date Picker Design in Figma](https://www.figma.com/file/9EHmS5y1Rr7DCh7KgJBwuz/DatePicker?type=design&mode=design&t=E6sL2ffuuZfwCSRp-0)

[Link to Fluent v8 Calendar Component](https://developer.microsoft.com/en-us/fluentui#/controls/web/calendar)

## Engineering Spec

### Inputs

| attribute                  | type                                                         | default           | description                                                                                                                       |
| -------------------------- | ------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `calendar-type`            | "date" \| "month" \| "week" \| "year" \| "range-picker"      | "date"            | The type of the calendar                                                                                                          |
| `month-picker-visible`     | boolean                                                      | `true`            | Whether the month picker is shown beside the day picker or hidden                                                                 |
| `month-picker-overlay`     | boolean                                                      | -                 | If true, show month picker on top of date picker when visible                                                                     |
| `week-numbers`             | boolean                                                      | -                 | If true, show week numbers (1-53) before each week row                                                                            |
| `min-weeks`                | number                                                       | -                 | Minimum number of weeks shown in a month                                                                                          |
| `calendar-filter`          | "week" \| "work-week" \| "four" \| "three" \| "two" \| "one" | -                 | Allow user to view selected date with a range filter                                                                              |
| `work-week`                | `[0, 1, 2, 3, 4, 5, 6]`                                      | `[1, 2, 3, 4, 5]` | The days that are selectable with the filter `work-week`. If the filter is not set to `work-week`, this does nothing.             |
| `first-day-of-week`        | `0, 1, 2, 3, 4, 5, 6`                                        | `0`               | The first day of the week for locale                                                                                              |
| `first-week-of-year`       | `0, 1, 2`                                                    | `0`               | Enum that defines when the first week of the year should start: first day (`0`), first full week (`1`), first four day week (`2`) |
| `min-date`                 | string                                                       | -                 | The minimum allowable date                                                                                                        |
| `max-date`                 | string                                                       | -                 | The maximum allowable date                                                                                                        |
| `show-slotted-link`        | boolean                                                      | `true`            | If false, link at link slot is hidden                                                                                             |
| `highlight-current-month`  | boolean                                                      | -                 | if true, the month picker should highlight the current month                                                                      |
| `highlight-selected-month` | boolean                                                      | -                 | If true, the month picker should highlight the selected month                                                                     |
| `selected-dates`           | string[]                                                     | -                 | selected dates                                                                                                                    |

### Outputs

- [selectedDates: string] - the selected dates from the calendar

### Events

- `change`: Emits when the selected date(s) is changed
- `date-select`: Emits when user selects a date(s) when no date(s) is currently selected
- `view-change`: Emits when view changes (e.g. from date picker to month picker) via user interaction

### Slots

- `link` - link at the bottom right of the base of the calendar (e.g. "Go to today")
- `navicon-left` - left icon on header to navigate backwards for months, years, or range of years
- `navicon-right` - right icon on header to navigate forwards for months, years, or range of years

Note that the `default` slot does not contain any customizable content.

### CSS Variables

- `colorNeutralBackground1`
- `colorNeutralBackground4`
- `colorNeutralForeground2`
- `colorNeutralForeground3`
- `colorNeutralForegroundInverted`
- `colorNeutralForegroundDisabled`
- `colorBrandBackground`
- `colorBrandBackground2`
- `colorCompoundBrandBackground`
- `colorBrandStroke1`
- `colorBrandStroke2`
- `spacingHorizontalM`
- `spacingHorizontalS`
- `spacingVerticalXS`
- `spacingVerticalS`
- `spacingVerticalM`

## Accessibility

- [ ] Find the matching component through [WCAG's patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
  - [Date Picker Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/)
- [ ] Are there any accessibility elements unique to this component?
- [ ] List ARIA attributes: `role, aria-labelledby, aria-label, aria-pressed, aria-selected, aria-live`
- [ ] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - [ ] Arrows - Moves focus according to the grid behavior
  - [ ] Enter - Select the date
  - [ ] Home - Moves focus to the first day (e.g. Sunday) of the current week
  - [ ] End - Moves focus to the last day (e.g. Satuday) of the current week
  - [ ] Page Up - Changes the grid of dates to the previous month
  - [ ] Shift + Page Up - Changes the grid of dates to the previous year
  - [ ] Page Down - Changes the grid of dates to the next month
  - [ ] Shift + Page Down - Changes the grid of dates to the next year

## Preparation

- [x] This component will inherit from and document the [FAST Calendar Component](https://github.com/microsoft/fast/tree/master/packages/web-components/fast-foundation/src/calendar)

- [x] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document:

  - [Fluent UI React v8 Calendar Component Spec](https://developer.microsoft.com/en-us/fluentui#/controls/web/calendar)
  - [Fluent UI React v9 Date Picker Component Spec](https://github.com/microsoft/fluentui/blob/master/specs/Datepicker.md)

  Differences

  - The Calendar component in Fluent React v8 handles picking a range of dates differently from the v9 Date Picker component. The v9 Calendar should handle date ranges in the same way as the v9 Date Picker.
  - Fluent UI has a Close button for the calendar, but the v9 Date Picker design spec does not

- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document:

  - [Fluent React V9 Date Picker](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/compat-components-datepicker--default)

- [x] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec)
  - [ ] And [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)

## Implementation

- [ ] Initial conformance and unit tests (validate basic functionality)
- [ ] [Initial documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#documentation)
  - [ ] [Storybook stories](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#storybook-stories)
  - [ ] README.md covering basic usage
- [ ] Uses design tokens for styling
- [ ] Renders correctly in High Contrast mode

## Validation

- [ ] [Add tests](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#tests)
  - [ ] Unit and conformance tests
  - [ ] Bundle size fixtures
  - [ ] Performance test scenario
  - [ ] Accessibility behavior tests
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): [link to issue]
- [ ] [Validate with partners](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#validation)
- [ ] [Finalize documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#finalize-documentation)
  - [ ] Review and add any missing Storybook stories
  - [ ] Finalize migration guide
  - [ ] In package.json: Remove the alpha/beta tag from the version number in package.json
  - [ ] In package.json: Change beachball's `disallowedChangeTypes` to `"major", "prerelease"`
