`Calendar` shows a date grid and lets the user pick a date, a week, a work week or a month.

It ships no styling. Day state is exposed as data attributes on each cell, so all of a day's
appearance is addressable with plain CSS selectors:

| Attribute             | Present when                                  |
| --------------------- | --------------------------------------------- |
| `data-selected`       | The day is part of the current selection      |
| `data-today`          | The day is today                              |
| `data-outside-month`  | The day belongs to the previous or next month |
| `data-outside-bounds` | The day falls outside `minDate`/`maxDate`     |
| `data-marked`         | `getMarkedDays` marked the day                |

Roving focus uses the native `focusgroup` attribute rather than a JavaScript focus manager.

The day picker, month picker and year picker are slots, so each can be replaced or configured
without re-implementing the calendar's date logic.
