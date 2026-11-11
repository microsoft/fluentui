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
day. The weekday header is rendered in `<thead>` and week
rows in `<tbody>`.

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
either layout. The year grid shows twelve years starting at the displayed year; its previous/next buttons page
by twelve years.

Calendar preserves focus when a layout or view change hides the focused panel, without reclaiming focus that has
already moved outside the calendar.

The month and year grids each default to four columns. Set `calendarMonthColumns` and
`calendarYearColumns` independently to `3` or `4`; row grouping and arrow navigation use
the same configuration. Both grids always contain twelve cells.

```tsx
<Calendar calendarMonthColumns={3} calendarYearColumns={4} />
```

`ref` points to the root `HTMLDivElement`; a `ref` on `dayPicker` or `monthPicker` points to that panel.
To move focus into a grid, focus its gridcell with `tabindex="0"`.

### Customizing rows and cells

Calendar supports `getCellProps`, `getRowProps` and `getWeekdayCellProps` for all grids. Getters receive
data such as dates, labels and state flags, and return prop overrides for existing elements. Cell data is
discriminated by `type: 'day' | 'month' | 'year'`; row data by `type: 'week' | 'weekday' | 'month' | 'year'`.
Use a custom renderer for structural changes.

```tsx
<Calendar
  getCellProps={cell => ({
    root: { title: cell.type === 'day' && cell.isMarked ? 'Appointment' : undefined },
    label: { children: <strong>{cell.label}</strong> },
  })}
  getRowProps={row => ({
    root: { className: row.type === 'weekday' ? 'weekday-header' : 'row' },
  })}
  getWeekdayCellProps={cell => ({
    root: { title: cell.dayOfWeek },
  })}
/>
```

Cells expose `root` for the gridcell and `button` for its interactive content; day cells also expose `label`
and `marker`. Marker overrides apply only to marked days. Use `label.children` to change the day content
while preserving its marker, or `button.children` to replace both; `null` intentionally removes content. Month
and year cells render their label as `button` children. Row getters expose `root`; the day row getter
also exposes `weekNumber` for a week's number or the weekday header's spacer when week numbers are shown.
Default content is rendered only when `children` is `undefined`; explicit `null`, `false` or an empty
string suppresses it. This also applies to the `grid` slot: its `children` replace all rows, including the
weekday header, and the cell and row getters are then not called.
Every row exposes data-only `cells`; week rows also have an optional numeric `weekNumber`. Weekday data
exposes `dayOfWeek`, the visible `label` and its full `accessibleLabel`. All cells expose a formatted
string `label`, including day placeholders; placeholder dates have `originalDate: null`.
Custom renderers iterate `state.panels` and resolve HTML props through the hook state's `resolveCellProps`,
`resolveRowProps` and `resolveWeekdayCellProps`. These methods combine defaults with consumer overrides and
invoke the corresponding getter. Call each method once per rendered item and spread the returned props onto
its elements:

```tsx
const cellProps = state.resolveCellProps(cell);
// cellProps.root, cellProps.button, and for days cellProps.label and an optional cellProps.marker
```

Refs are composed, class names appended with consumer classes last, and styles shallow-merged.
Defined consumer props override defaults; `undefined` overrides are treated as omitted.
Preserve accessibility and interaction semantics when overriding roles, focus, disabled or selection
attributes. Changing DOM attributes does not change date restrictions or selection logic.
Consumer handlers run before the grid's delegated selection and navigation; `preventDefault`
cancels the built-in action. Use custom hook/render composition for structural replacement.

### Hooks and utilities

For a custom Calendar component, compose `useCalendar` and `renderCalendar` from the public
`@fluentui/react-headless-components-preview/calendar` subpath. The subpath also exports the cell, row,
event, layout and view types, plus `calendarFormatters` and `createCalendarDateTimeFormatter` for formatting.

Default date formatting uses en-US ordering and the Gregorian calendar. Pass
`createCalendarDateTimeFormatter(locale)` as `formatters.dateTime` for other locales; override the
label formatter functions as well when their assistive-technology text needs localization.
