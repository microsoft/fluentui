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

The day table declares `focusgroup="grid rowflow"`; the month and year pickers declare
`focusgroup="grid manual"` with `focusgrouprow` on each row and `focusgroupstart` on the initial
eligible cell. In-grid arrow navigation is delegated to focusgroup; Calendar does not install a
custom roving-focus or arrow-key fallback. This requires a runtime with focusgroup V2 grid support.
The currently released polyfill does not provide that support yet, and the corresponding browser
keyboard tests remain pending the compatible release. Weekday and week-number headers are not
navigation targets. Unavailable cells are skipped unless `allFocusable` is set; they cannot be
selected in either mode.
If no visible day is eligible, imperative day-picker focus falls back to the next available
month-navigation control, preferring Next month.

When an arrow crosses the visible day-grid boundary, Calendar requests navigation to the next
available date without selecting it, within the date bounds. PageUp/PageDown page from the focused
day in Calendar and standalone day pickers. The weekday header is rendered in `<thead>` and week
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

### Pickers, layout and focus

Layout is consumer-controlled: `layout="sideBySide"` (the default) displays both pickers,
while `layout="overlay"` displays the active `view` (`"day"` or `"month"`). Calendar does not
detect viewport size or choose breakpoints. Use your own responsive logic to set `layout`.
Use `view` and `onViewChange` to control the active overlay picker, or `defaultView` for its
initial uncontrolled value. Calendar preserves focus when a layout change hides the focused picker,
without reclaiming focus that has already moved outside the calendar.

The month and year pickers each default to four columns. Set `calendarMonthColumns` and
`calendarYearColumns` independently to `3` or `4`; row grouping and focusgroup navigation use
the same configuration. Both grids always contain twelve cells.

```tsx
<Calendar calendarMonthColumns={3} calendarYearColumns={4} />
```

Each picker's regular `ref` points to its root `HTMLDivElement`. Use `imperativeRef` to access
its focus handle: `focus()` moves focus into the grid, or the nested year picker while it is open.
Both object refs and callback refs are supported.

```tsx
const rootRef = React.useRef<HTMLDivElement>(null);
const pickerRef = React.useRef<CalendarDayHandle>(null);

<CalendarDay ref={rootRef} imperativeRef={pickerRef} />;
// pickerRef.current?.focus() focuses the grid's initial focus target, not the root.
```

### Customizing rows and cells

Every picker supports `getCellProps` and `getRowProps`; the day picker also supports
`getWeekdayCellProps`. Getters receive data such as dates, labels and state flags, and return
prop overrides for existing elements. Use a custom renderer for structural changes.

```tsx
dayPicker={{
  getCellProps: day => ({
    root: { title: day.isMarked ? 'Appointment' : undefined },
    label: { children: <strong>{day.label}</strong> },
  }),
  getRowProps: row => ({
    root: { className: row.type === 'week' ? 'week' : 'weekday-header' },
  }),
  getWeekdayCellProps: cell => ({
    root: { title: cell.dayOfWeek },
  }),
}}
```

Day cells expose `root`, `button`, `label` and `marker` prop bags. Marker overrides apply only to
marked days. Use `label.children` to change the day content while preserving its marker, or
`button.children` to replace both; `null` intentionally removes content. Month and year cells expose
`root` for the gridcell and `button` for its interactive content; use `button.children` to customize
the visible label. Row getters expose `root`; the day row getter
also exposes `weekNumber` for a week's number or the weekday header's spacer when week numbers are shown.
Default content is rendered only when `children` is `undefined`; explicit `null`, `false` or an empty
string suppresses it. This also applies to the day picker's `body` slot and month/year `grid` slots.
Day row data is discriminated by `type: 'week' | 'weekday'`. Week rows include data-only `days`
and an optional numeric `weekNumber`; weekday rows include data-only `cells`. Weekday data exposes
`dayOfWeek`, the visible `label` and its full `accessibleLabel`. All cell getters expose a formatted
string `label`, including day placeholders; placeholder dates have `originalDate: null`.
Custom renderers resolve HTML props through
the hook state's `getDayCellProps`, `getDayRowProps` and `getWeekdayCellProps`, or the corresponding
`getMonthCellProps`/`getMonthRowProps` and `getYearCellProps`/`getYearRowProps` methods. These methods
combine defaults with consumer overrides and invoke the corresponding getter callback.
Call each method once per rendered item and spread the returned props onto its elements:

```tsx
const cellProps = state.getDayCellProps(day);
// cellProps.root, cellProps.button, cellProps.label and optional cellProps.marker
```

Refs are composed, class names appended with consumer classes last, and styles shallow-merged.
Defined consumer props override defaults; `undefined` overrides are treated as omitted.
Preserve accessibility and interaction semantics when overriding roles, focus, disabled or selection
attributes. Changing DOM attributes does not change date restrictions or selection logic.
Consumer handlers run before the grid's delegated selection and navigation; `preventDefault`
cancels the built-in action. Use custom hook/render composition for structural replacement.

### Hooks, context and utilities

For a custom Calendar component, compose `useCalendar`, `useCalendarContextValues` and
`renderCalendar` from the public `@fluentui/react-headless-components-preview/calendar` subpath.
The subpath also exports `CalendarDay`, `CalendarMonth` and `CalendarYear` with their hooks and
renderers, and the event, layout, view and context types used by the family.

For standalone pickers, use `CalendarProvider` to supply selection, date restrictions, formatting
and `calendarMonthColumns`/`calendarYearColumns` through a `CalendarContextValue`.
`useCalendarContext()` reads this same headless context using regular React context. Without a
provider, it uses the package's internal defaults.
The subpath exports `calendarFormatters` and `createCalendarDateTimeFormatter` for formatting.

Default date formatting uses en-US ordering and the Gregorian calendar. Pass
`createCalendarDateTimeFormatter(locale)` as `formatters.dateTime` for other locales; override the
label formatter functions as well when their assistive-technology text needs localization.
