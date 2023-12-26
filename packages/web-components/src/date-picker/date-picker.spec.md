# DatePicker

## Component Description

The date picker is an input box with a pop-up control that allows the user to pick a single date or a range of dates from a calendar view. The date picker has five different views: date, month, week, year, and range-picker.

## Design Spec

[DatePicker design spec in Figma](https://www.figma.com/file/9EHmS5y1Rr7DCh7KgJBwuz/DatePicker?type=design&mode=design&t=E6sL2ffuuZfwCSRp-0)

## Engineering Spec

### Inputs

| attribute                  | type                                                   | default           | description                                                                                                                       |
| -------------------------- | ------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `type`                     | "date" \| "month" \| "week" \| "year" \| "range-picker | "date"            | The type of the date picker                                                                                                       |
| `open`                     | boolean                                                | -                 | If true, the date picker pop-up is open                                                                                           |
| `allow-text-input`         | boolean                                                | -                 | If true, allow the user to select date by typing manually in keyboard                                                             |
| `month-picker-visible`     | boolean                                                | `true`            | Whether the month picker is shown beside the day picker or hidden                                                                 |
| `month-picker-overlay`     | boolean                                                | -                 | If true, show month picker on top of date picker when visible                                                                     |
| `week-numbers`             | boolean                                                | -                 | If true, show week numbers (1-53) before each week row                                                                            |
| `min-weeks`                | number                                                 | -                 | Minimum number of weeks shown in a month                                                                                          |
| `filter`                   | "week" \| "work-week" \| "4" \| "3" \| "2" \| "1"      | -                 | Allow user to view selected date with a range filter                                                                              |
| `work-week`                | `[0, 1, 2, 3, 4, 5, 6]`                                | `[1, 2, 3, 4, 5]` | The days that are selectable with the filter `work-week`. If the filter is not set to `work-week`, this does nothing.             |
| `first-day-of-week`        | `0, 1, 2, 3, 4, 5, 6`                                  | `0`               | The first day of the week for locale                                                                                              |
| `first-week-of-year`       | `0, 1, 2`                                              | `0`               | Enum that defines when the first week of the yera should start: first day (`0`), first full week (`1`), first four day week (`2`) |
| `min-date`                 | string                                                 | -                 | The minimum allowable date                                                                                                        |
| `max-date`                 | string                                                 | -                 | The maximum allowable date                                                                                                        |
| `show-link`                | boolean                                                | `true`            | If false, link at link slot is hidden                                                                                             |
| `highlight-current-month`  | boolean                                                | -                 | Whether the month picker should highlight the current month                                                                       |
| `highlight-selected-month` | boolean                                                | -                 | Whether the month picker should highlight the selected month                                                                      |
| `today`                    | string                                                 | -                 | value of today                                                                                                                    |
| `selected-dates`           | string[]                                               | -                 | selected dates                                                                                                                    |

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

- [x] Find the matching component through [WCAG's patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
  - [Date Picker Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/)
- [ ] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes
  - Input Field: `role, aria-labelledby, aria-label, aria-haspopup, aria-expanded, aria-autocomplete, aria-controls, aria-describedby`
  - Calendar: `role, aria-labelledby, aria-label, aria-pressed, aria-selected, aria-live`
- [ ] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - Input Field
    - [ ] Enter - opens the date picker
  - Calendar
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

  - [Fluent UI React v9 Date Picker Component Spec](https://github.com/microsoft/fluentui/blob/master/specs/Datepicker.md)

  Differences

  - Fluent UI has a Close button for the calendar, but the Date Picker Figma design spec does not. The date picker should close on ESC or when the user clicks outside of it.
  - The React Date Picker has a `disabled` property that is not in the date picker Figma design spec

- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document:

  - [Fluent React V9 Date Picker](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/compat-components-datepicker--default)

  Differences

  - The React Date Picker has properties `formatDate` and `parseDateFromString` that takes methods to handle formatting the datestring. This is not supported in Web Components.
  - The React Date Picker has property `underlined` that deermines whether or not the input of the Date Picker is underlined. This is not part of the date picker Figma design spec.
  - The React Date Picker has property `initialPickerDate`, whereas in the web component implementation this is handled by `selected-dates`. However, this approach might change if necessary during implementation.
  - The React Date Picker has property `openOnClick` that determines whether the date picker should open when the input is clicked. This is always true for the web component date picker.

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
