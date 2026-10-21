`Calendar` shows a date grid and lets the user pick a date, a week, a work week or a month.

The Calendar family is self-contained in this package: its hooks, renderers, context, types and
date utilities do not depend on `@fluentui/react-calendar-preview`.

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

Calendar declares `focusgroup="grid rowflow"` on the native day table, and
`focusgroup="grid manual"` on the month and year grids. Their rows use `focusgrouprow`;
the navigated cell uses `focusgroupstart`. Eligible cells are authored with `tabIndex={0}` so
the browser or polyfill, not Calendar, owns arrow navigation, the single Tab entry and focus memory.
There is no Tabster or custom in-grid roving-focus implementation.

**Grid navigation requires focusgroup V2 support.** The currently installed
`@microsoft/focusgroup-polyfill` does not implement grids, so arrows and single-stop Tab traversal
are not available with that release. [microsoft/polyfills#64](https://github.com/microsoft/polyfills/pull/64)
adds V2 grids but requires exactly one keyboard-focusable target per cell; non-focusable
weekday/week-number headers and unavailable dates also require runtime support. The affected E2E
tests are retained as skipped cases with a TODO so they can be enabled against a compatible release.

Calendar still handles date selection, PageUp/PageDown, and paging when an arrow leaves the
rendered day range. Selection and paging respect consumer cancellation, date restrictions and
RTL direction. Nested focusgroups and editable content retain their own keyboard ownership.

Consumers must provide visible focus styles on the day `td[role="gridcell"]` as well as the
month/year buttons, and visually hide the announcement region without removing it from the
accessibility tree.

The day picker, month picker and year picker are slots, so each can be replaced or configured
without re-implementing the calendar's date logic. Set `dayPicker={null}` for month-only selection,
or `monthPicker={null}` for a day-only calendar. Consumer picker refs are merged with the internal
focus handles.

Grid rows and cells are rendered by their picker rather than being components of their own. Use
`dayPicker.getDayCellProps` to add props or a ref to a day's `td`, `dayPicker.renderDay` to customize
the content of a day's button, and `yearPicker.renderYear` for year content. Cell handlers run before
the grid's selection and navigation, and `preventDefault` cancels the built-in action.

For a custom Calendar component, compose `useCalendar`, `useCalendarContextValues` and
`renderCalendar` from the public `@fluentui/react-headless-components-preview/calendar` subpath.
The subpath also exports `CalendarDay`, `CalendarMonth` and `CalendarYear` with their hooks and
renderers, and the event, layout, view and context types used by the family.

For standalone pickers, use `CalendarProvider` with `calendarContextDefaultValue` to supply shared
selection, date restrictions and formatting. `useCalendarContext` reads this same headless context.
The subpath also exports `calendarFormatters`, `createCalendarDateTimeFormatter`, `addDays`,
`addMonths`, `addWeeks`, `addYears` and `getDateRange`, along with their supporting date and
formatter types. No imports from the styled Calendar package are needed.
