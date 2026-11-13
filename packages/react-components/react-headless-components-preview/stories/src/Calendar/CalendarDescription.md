`Calendar` shows a date grid and lets the user pick a date, a week, a work week or a month.

Calendar is unstyled. Use cell data attributes to style date state:

| Attribute             | Present when                                       |
| --------------------- | -------------------------------------------------- |
| `data-selected`       | The day is part of the current selection           |
| `data-today`          | The day is today                                   |
| `data-outside-month`  | The day belongs to the previous or next month      |
| `data-outside-bounds` | The day is unavailable, including restricted dates |
| `data-marked`         | `getMarkedDays` marked the day                     |

Month and year cells expose `data-selected`, `data-outside-bounds` and `data-current`.
Day cells also expose `data-range-hovered` and `data-range-pressed`. Highlighting, range corners
and outside-month emphasis are consumer styling decisions.

### Keyboard navigation

Each grid has a single roving tab stop: only one cell has `tabindex="0"`, and the last focused cell
keeps it until the grid shows a different date or layout. Calendar implements arrow navigation itself,
so it works in every browser without `focusgroup` support or a polyfill.

- **Day grid:** Arrow Left/Right move to the previous/next day and continue into the adjacent week.
  Arrow Up/Down move to the same weekday in the previous/next week. Home/End move to the first/last
  available day of the week. Reaching an available day of an adjacent month loads that month.
- **Month and year grids:** Arrow Left/Right stay within the row, Arrow Up/Down keep the column, and
  Home/End move to the first/last available cell of the grid.

Unavailable cells are skipped unless `allFocusable` is set; they cannot be selected in either mode.
Weekday and week-number headers are not navigation targets. Modified arrows are left to the page.
If no visible day is eligible, moving focus into the day panel falls back to the next available
month-navigation control, preferring Next month.

When an arrow crosses the visible day-grid boundary, Calendar requests navigation to the next
available date without selecting it, within the date bounds. PageUp/PageDown page from the focused
day.

When server rendering, pass `today` explicitly so server and browser output use the same date.

Today is not selected by default; it is identified with `aria-current="date"`. Controlled values
outside `minDate`/`maxDate` render as an empty selection and emit a development warning.

Selection and Calendar-owned navigation respect consumer cancellation and RTL direction. Nested grids,
toolbars and editable content retain their own keyboard ownership.
Keep the provider's `dir` and the DOM direction in sync: the headless `Provider` does not render
a DOM wrapper, so use both `<Provider dir="rtl">` and `dir="rtl"` on a surrounding element for RTL.

Consumers must provide visible focus styles on the day `td[role="gridcell"]` and month/year
grid cells, and visually hide the announcement region without removing it from the accessibility
tree.

### Panels, layout and focus

Calendar renders up to two panels, each with a header (heading, previous/next and close buttons) and a grid:

- the **day panel** (`dayPicker` slot, `data-view="day"`) shows the day grid;
- the **month panel** (`monthPicker` slot) shows the month grid (`data-view="month"`) or the year grid
  (`data-view="year"`).

Set `dayPicker={null}` to select months without a day grid, or `monthPicker={null}` to show only days.
The header slots (`header`, `heading`, `navigation`, `previousButton`, `nextButton`, `closeButton`) and
`grid` are set once on Calendar and apply to every visible panel; target one panel in CSS with its
`data-view` attribute or the `dayPicker`/`monthPicker` class.

Layout is consumer-controlled: `layout="sideBySide"` (the default) displays both panels,
while `layout="overlay"` displays the panel of the active `view` (`"day"`, `"month"` or `"year"`).
Calendar does not detect viewport size or choose breakpoints. Use your own responsive logic to set `layout`.
Use `view` and `onViewChange` to control the active view, or `defaultView` for its initial uncontrolled
value. A controlled `view` must accept `"year"`, which the month heading requests. In the side-by-side layout
the day panel stays visible and `view` only chooses between the month and year grids.

The month heading opens the year grid unless `yearPickerHidden` is set. In the overlay layout the day heading
opens the month grid; set `dayHeadingView` to `"month"` or `"year"` to choose what the day heading opens in
either layout (`"year"` falls back to the default when `yearPickerHidden` is set). The year grid shows twelve years starting at the displayed year; its previous/next buttons page
by twelve years.

Calendar preserves focus when a layout or view change hides the focused panel, or replaces the month or year grid
that holds focus, without reclaiming focus that has already moved outside the calendar.

The month and year grids each default to four columns. Set `calendarMonthColumns` and
`calendarYearColumns` independently to `3` or `4`; row grouping and arrow navigation use
the same configuration. Both grids always contain twelve cells.

```tsx
<Calendar calendarMonthColumns={3} calendarYearColumns={4} />
```

`ref` points to the root `HTMLDivElement`; a `ref` on `dayPicker` or `monthPicker` points to that panel.
To move focus into a grid, focus its gridcell with `tabindex="0"`.

### Customizing rows and cells

Single elements are slots: besides the panel and header slots, `headingLabel` holds the heading text, and the day
grid's `gridHeader` (`thead`) and `gridBody` (`tbody`) hold the weekday header and the week rows. Set `children` on
`heading` to replace the label, or on `grid` to replace every row.

Repeated elements are rendered by `renderCell`, `renderRow` and `renderWeekdayCell`. Each receives the built-in
props, the item's data and `defaultRender`, which renders the built-in markup from props you may have changed:

```tsx
<Calendar
  renderCell={(props, cell, defaultRender) =>
    defaultRender(
      cell.type === 'day' && cell.isMarked ? { ...props, root: { ...props.root, title: 'Appointment' } } : props,
    )
  }
  renderRow={(props, row, defaultRender) =>
    defaultRender({ ...props, root: { ...props.root, className: row.type === 'weekday' ? 'weekday-header' : 'row' } })
  }
  renderWeekdayCell={(props, weekday, defaultRender) =>
    defaultRender({ root: { ...props.root, title: weekday.dayOfWeek } })
  }
/>
```

Cell props expose `root` for the gridcell and `button` for its interactive content; day cells also expose `label`
and, when marked, `marker`. Defined `button.children` replace the label and marker. Row props expose `root`, the
rendered cells as `children` and, in the day grid with week numbers, `weekNumber` for a week's number or the weekday
header's spacer. Weekday props expose `root`.

Cell data is discriminated by `type: 'day' | 'month' | 'year'`; row data by `type: 'week' | 'weekday' | 'month' |
'year'`. Every row exposes data-only `cells`; week rows also have an optional numeric `weekNumber`. Weekday data
exposes `dayOfWeek`, the visible `label` and its full `accessibleLabel`. All cells expose a formatted string `label`,
including day placeholders; placeholder dates have `originalDate: null`.

Keep the grid roles, `tabIndex` and `aria-*` props when rendering your own markup, so keyboard navigation and
assistive technology keep working. Changing DOM attributes does not change date restrictions or selection logic.
Handlers added to a cell run before the grid's delegated selection and navigation; `preventDefault` cancels the
built-in action. Render functions run only for rendered rows and cells, so they are skipped when `grid` has
`children`.

### Hooks and utilities

For a custom Calendar component, compose `useCalendar` and `renderCalendar` from the public
`@fluentui/react-headless-components-preview/calendar` subpath. The subpath also exports the cell, row,
event, layout and view types, plus `calendarFormatters` and `createCalendarDateTimeFormatter` for formatting.
A custom renderer iterates `state.panels` and gets built-in props from the state's `resolveCellProps`,
`resolveRowProps` and `resolveWeekdayCellProps`.

Default date formatting uses en-US ordering and the Gregorian calendar. Pass
`createCalendarDateTimeFormatter(locale)` as `formatters.dateTime` for other locales; override the
label formatter functions as well when their assistive-technology text needs localization.
