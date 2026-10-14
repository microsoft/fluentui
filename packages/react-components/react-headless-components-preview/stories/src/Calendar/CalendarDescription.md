`Calendar` shows a date grid and lets the user pick a date, a week, a work week or a month.

It ships no styling. Day state is exposed as data attributes on each cell, so all of a day's
appearance is addressable with plain CSS selectors:

| Attribute             | Present when                                       |
| --------------------- | -------------------------------------------------- |
| `data-selected`       | The day is part of the current selection           |
| `data-today`          | The day is today                                   |
| `data-outside-month`  | The day belongs to the previous or next month      |
| `data-outside-bounds` | The day is unavailable, including restricted dates |
| `data-marked`         | `getMarkedDays` marked the day                     |

Month and year cells also expose `data-selected` and `data-outside-bounds`. They use
`data-current` for the current month (when `highlightCurrentMonth` is enabled) or current year.
Day cells additionally expose `data-range-hovered`, `data-range-pressed` and
`data-corner-top-left`, `data-corner-top-right`, `data-corner-bottom-left`,
`data-corner-bottom-right` for styling selection ranges.

### Keyboard navigation and browser support

The base Calendar handlers provide date-grid arrows, month/year two-dimensional navigation,
RTL behavior and restricted-date handling. The grids retain `role="grid"` and use the supported
V1 `focusgroup="toolbar inline"` behavior for a single roving tab stop and focus memory.
The component does not depend on the experimental V2 `grid manual` behavior, which is not
implemented by `@microsoft/focusgroup-polyfill` 1.5.0 or 1.6.0.

Applications without native V1 focusgroup support must install a compatible focusgroup polyfill;
the library does not install one automatically. The Storybook preview and playground initialize
`polyfillBodyAndObserve` from `@microsoft/focusgroup-polyfill/shadowless`.
Consumers must provide visible focus styles on the day `td[role="gridcell"]` as well as the
month/year buttons, and visually hide the announcement region without removing it from the
accessibility tree.

The day picker, month picker and year picker are slots, so each can be replaced or configured
without re-implementing the calendar's date logic. Set `dayPicker={null}` for month-only selection,
or `monthPicker={null}` for a day-only calendar. Consumer picker refs are merged with the internal
focus handles; individual cells and weekday headers also forward their DOM refs.

For a custom Calendar component, compose `useCalendar`, `useCalendarContextValues` and
`renderCalendar` from the public `@fluentui/react-headless-components-preview/calendar` subpath.
The subpath also exports the row/cell components, including `CalendarDayGridHeaderCell`, and the
event, layout, view and context types used by the family. Weekday headers use the base slot types,
without the styled package's label-motion slot.
