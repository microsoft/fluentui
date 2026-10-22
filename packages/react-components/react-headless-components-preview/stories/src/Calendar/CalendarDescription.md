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

Calendar handles keyboard navigation. Each grid has one roving
Tab stop and remembers its last focused eligible cell. Unavailable cells are skipped unless
`allFocusable` is set; they cannot be selected in either mode. Weekday and week-number headers
are not navigation targets.
If no visible day is eligible, imperative day-picker focus falls back to the next available
month-navigation control, preferring Next month.

Day arrows move by one day or one week, skipping unavailable dates in the requested direction.
Moving into another month updates the displayed month without selecting a date, within the date bounds.
Home/End move to the first/last eligible date in the current week.
Month and year arrows follow their configured column layout without horizontal row wrapping;
vertical movement skips unavailable cells in the same column. Home/End move to the first/last
eligible cell in the grid. PageUp/PageDown page from the focused day.

Selection and navigation respect consumer cancellation and RTL direction. Nested grids,
toolbars and editable content retain their own keyboard ownership.
Keep the provider's `dir` and the DOM direction in sync: the headless `Provider` does not render
a DOM wrapper, so use both `<Provider dir="rtl">` and `dir="rtl"` on a surrounding element for RTL.

Consumers must provide visible focus styles on the day `td[role="gridcell"]` as well as the
month/year buttons, and visually hide the announcement region without removing it from the
accessibility tree.

### Pickers, layout and focus

Layout is consumer-controlled: `layout="sideBySide"` (the default) displays both pickers,
while `layout="overlay"` displays the active `view` (`"day"` or `"month"`). Calendar does not
detect viewport size or choose breakpoints. Use your own responsive logic to set `layout`.
Use `view` and `onViewChange` to control the active overlay picker, or `defaultView` for its
initial uncontrolled value. Calendar preserves focus when a layout change hides the focused picker,
without reclaiming focus that has already moved outside the calendar.

The month and year pickers each default to four columns. Set `calendarMonthColumns` and
`calendarYearColumns` independently to `3` or `4`; row grouping and keyboard navigation use
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
`root`, with `root.children` controlling their content. Row getters expose `root`; the day row getter
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

For standalone pickers, use `CalendarProvider` with `calendarContextDefaultValue` to supply shared
selection, date restrictions, formatting and `calendarMonthColumns`/`calendarYearColumns`.
`useCalendarContext()` reads this same headless context
using regular React context. Without a provider, it returns
`calendarContextDefaultValue`.
The subpath also exports `calendarFormatters`, `createCalendarDateTimeFormatter`, `addDays`,
`addMonths`, `addWeeks`, `addYears` and `getDateRange`, along with their supporting date and
formatter types.

Default date formatting uses locale-specific ordering and the Gregorian calendar.
Supply a custom `formatters.dateTime` for specialized labels.
