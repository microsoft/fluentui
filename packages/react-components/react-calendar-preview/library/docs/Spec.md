# @fluentui/react-calendar-preview Spec

## Background

`Calendar` lets a user inspect and select a date or a date range. It composes three picker levels:

- a day picker for dates in a month;
- a month picker for months in a year; and
- a year picker, opened from the month picker, for changing the displayed year.

The component can render the day and month pickers together, render either picker by itself, or overlay the month picker on the day picker. It supports day, week, work-week, and month selection ranges, date boundaries, restricted dates, week numbers, marked days, and consumer-provided localization.

This package is a preview. Its API can change before a stable v9 Calendar is released and it must not be used in production.

Calendar is intended for choosing a date in application UI. It does not provide a text field, input parsing, popup positioning, or popup dismissal. A date-input or date-picker pattern must compose those concerns around Calendar.

## Prior Art

- [Fluent UI v8 Calendar](../../../../react/src/components/Calendar/Calendar.types.ts)
- [Fluent UI v9 Calendar compatibility component](../../../react-calendar-compat/library/src/components/Calendar/Calendar.types.ts)
- [WAI-ARIA Authoring Practices date picker dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)

The v8 and compatibility components are the behavioral predecessors of this package. Calendar Preview reimplements the control with v9 slots, contexts, Griffel styles, and Tabster navigation. The WAI-ARIA example informs the day-grid semantics, but Calendar itself is not a dialog and does not trap focus.

## Sample Code

### Basic selection

```tsx
import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarSelectDateData } from '@fluentui/react-calendar-preview';

export const Example = () => {
  const [value, setValue] = React.useState(new Date());

  const onSelectDate = (_event: React.SyntheticEvent, data: CalendarSelectDateData) => {
    setValue(data.date);
  };

  return <Calendar value={value} onSelectDate={onSelectDate} />;
};
```

When `value` is omitted, Calendar initializes its internal selected date from `today`. Supplying `value` makes selection controlled. `onSelectDate` reports both the activated date and the range produced by `dateRangeType`.

### Week selection with boundaries

```tsx
<Calendar
  value={value}
  dateRangeType="week"
  firstDayOfWeek="monday"
  minDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
  restrictedDates={[new Date(2025, 6, 4)]}
  onSelectDate={onSelectDate}
/>
```

### Month-only selection

```tsx
<Calendar
  value={value}
  isDayPickerVisible={false}
  isMonthPickerVisible
  highlightSelectedMonth
  onSelectDate={onSelectDate}
/>
```

### Localization

```tsx
import {
  Calendar,
  createCalendarDateTimeFormatter,
  createCalendarLabelFormatter,
} from '@fluentui/react-calendar-preview';

const formatDateTime = createCalendarDateTimeFormatter('fr-FR');
const formatLabel = createCalendarLabelFormatter({
  weekNumber: data => `Semaine ${data.weekNumber}`,
});

<Calendar
  formatDateTime={formatDateTime}
  formatLabel={formatLabel}
  goToTodayButton={{ children: "Aujourd'hui" }}
  showWeekNumbers
/>;
```

## Variants

### Picker layout

| Configuration                                   | Result                                                                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `isDayPickerVisible` and `isMonthPickerVisible` | Day and month pickers are shown side by side with a divider.                                                         |
| `isDayPickerVisible` only                       | Only the day picker is shown.                                                                                        |
| `isMonthPickerVisible` only                     | Only the month picker is shown; choosing a month commits that month as the value.                                    |
| `showMonthPickerAsOverlay`                      | The day and month pickers replace each other. Their headings switch views and restore focus in the newly shown view. |

Overlay mode is also used on initial render when the day picker is enabled and the target window is no wider than 440 CSS pixels. Picker visibility is initialized from the visibility props; those props do not control subsequent view toggles.

### Selection range

| `dateRangeType` | Selected range                                                     |
| --------------- | ------------------------------------------------------------------ |
| `day`           | The activated date. This is the default.                           |
| `week`          | The week containing the activated date, based on `firstDayOfWeek`. |
| `workWeek`      | The configured `workWeekDays` in the containing week.              |
| `month`         | Every date in the activated date's month.                          |

The reported range is clipped to `minDate` and `maxDate` and excludes `restrictedDates`. The activated date remains available separately as `data.date`.

### Calendar display

- `showWeekNumbers` adds a localized row header for each week.
- `dayPicker.weeksToShow` fixes the number of visible week rows; otherwise the picker renders the number required by the navigated month.
- `dayPicker.lightenDaysOutsideNavigatedMonth` visually deemphasizes dates outside the navigated month.
- `dayPicker.getMarkedDays` marks dates without selecting or disabling them.
- `highlightCurrentMonth` and `highlightSelectedMonth` add current and selected treatments to month cells.
- `goToTodayButton={null}` removes the default Go to today action.

## API

The source of truth is [Calendar.types.ts](../src/components/Calendar/Calendar.types.ts). The package also exports the composed `CalendarDay`, `CalendarMonth`, and `CalendarYear` components and their slot, prop, state, and event-data types.

### Props

| Prop                       | Type                                       | Default                     | Purpose                                                                                                        |
| -------------------------- | ------------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `value`                    | `Date`                                     | `today` in uncontrolled use | Selected date. Supplying it controls selection.                                                                |
| `today`                    | `Date`                                     | Client date and time        | Reference date used for initialization, current-date styling, and Go to today.                                 |
| `onSelectDate`             | `EventHandler<CalendarSelectDateData>`     | -                           | Called with the activated date and bounded, unrestricted selected range.                                       |
| `onDismiss`                | `EventHandler<CalendarDismissData>`        | -                           | Called when Escape is pressed within Calendar or a configured close action is invoked.                         |
| `dateRangeType`            | `'day' \| 'week' \| 'month' \| 'workWeek'` | `'day'`                     | Determines the selected range.                                                                                 |
| `firstDayOfWeek`           | `DayOfWeek`                                | `'sunday'`                  | Controls week layout and week-range calculation.                                                               |
| `firstWeekOfYear`          | `FirstWeekOfYear`                          | `'firstDay'`                | Controls week-number calculation.                                                                              |
| `workWeekDays`             | `DayOfWeek[]`                              | Monday-Friday               | Selectable days for a work-week range.                                                                         |
| `isDayPickerVisible`       | `boolean`                                  | `true`                      | Initial day-picker visibility.                                                                                 |
| `isMonthPickerVisible`     | `boolean`                                  | `true`                      | Initial month-picker visibility.                                                                               |
| `showMonthPickerAsOverlay` | `boolean`                                  | `false`                     | Replaces one picker with the other instead of laying them out together.                                        |
| `showWeekNumbers`          | `boolean`                                  | `false`                     | Adds week-number row headers.                                                                                  |
| `minDate` / `maxDate`      | `Date`                                     | -                           | Bound navigation and selection.                                                                                |
| `restrictedDates`          | `Date[]`                                   | -                           | Prevent selection of individual dates.                                                                         |
| `highlightCurrentMonth`    | `boolean`                                  | `false`                     | Marks today's month in the month grid.                                                                         |
| `highlightSelectedMonth`   | `boolean`                                  | `false`                     | Marks the navigated/selected month in the month grid.                                                          |
| `allFocusable`             | `boolean`                                  | `false`                     | Includes unavailable dates and navigation actions in keyboard focus order while preserving disabled semantics. |
| `formatDateTime`           | `FormatDateTime`                           | English formatter           | Formats visible and accessible date values.                                                                    |
| `formatLabel`              | `FormatCalendarLabel`                      | English formatter           | Formats complete accessible labels and announcements.                                                          |

Calendar also accepts the native props of its root `div` and slot props for customizing the elements below.

### Slots

| Slot                 | Default         | Purpose                                                      |
| -------------------- | --------------- | ------------------------------------------------------------ |
| `root`               | `div`           | Calendar container and owner of top-level keyboard handling. |
| `liveRegion`         | `div`           | Polite, atomic selected-date announcement.                   |
| `dayPicker`          | `CalendarDay`   | Day grid and month navigation.                               |
| `divider`            | `div`           | Separator rendered when both pickers are visible.            |
| `monthPickerWrapper` | `div`           | Groups the month picker and Go to today action.              |
| `monthPicker`        | `CalendarMonth` | Month grid and nested year picker.                           |
| `goToTodayButton`    | `Button`        | Navigates to today; set to `null` to omit.                   |

The `dayPicker` and `monthPicker` slots expose their component APIs. Consumers can use these to configure `weeksToShow`, marked days, picker labels, navigation buttons, or year-picker visibility without Calendar duplicating every child prop.

## Structure

### Public composition

```tsx
<Calendar
  dayPicker={{ weeksToShow: 6 }}
  divider={{ role: 'separator' }}
  monthPicker={{ yearPickerHidden: false }}
  goToTodayButton={{ children: 'Go to today' }}
/>
```

Consumers normally render only `<Calendar />` and configure its structure through slot props. The picker slots resolve to `CalendarDay` and `CalendarMonth` by default.

### Internal composition

Calendar owns selected, navigated-day, navigated-month, and picker-visibility state. It publishes shared date, range, formatting, and boundary configuration through `CalendarContext`. `CalendarDay`, `CalendarMonth`, and `CalendarYear` publish narrower contexts to their row and cell components so navigation and styling do not require cloning props through the tree.

The styled components use Tabster arrow-navigation groups. Base state hooks are exported for a headless layer and intentionally leave picker resolution or roving-focus behavior to the caller.

### DOM

The default DOM is equivalent to:

```html
<div class="fui-Calendar">
  <div aria-live="polite" aria-atomic="true">Selected: June 18, 2025</div>

  <div class="fui-CalendarDay">
    <div>
      <div><span aria-live="polite">June 2025</span></div>
      <div>
        <button type="button" title="Previous month May">...</button>
        <button type="button" title="Next month July">...</button>
      </div>
    </div>
    <table role="grid" aria-label="June 2025, Selected: June 18, 2025, Today: ...">
      <tbody>
        <tr>
          ... weekday column headers ...
        </tr>
        <tr>
          ... day gridcells ...
        </tr>
      </tbody>
    </table>
  </div>

  <div class="fui-Calendar__divider"></div>

  <div>
    <div class="fui-CalendarMonth">
      <div>... year heading and previous/next year buttons ...</div>
      <div role="grid" aria-label="2025">... month gridcells ...</div>
    </div>
    <button type="button">Go to today</button>
  </div>
</div>
```

Day rows use semantic `tr`, weekday and week-number headers use `th`, and dates use `td role="gridcell"` containing a presentational button. Month and year grids use `div role="grid"` containers with row and gridcell descendants. Motion components do not add DOM wrappers that would invalidate table structure.

## Migration

### From v8 or `@fluentui/react-calendar-compat`

Calendar Preview preserves the main date-selection concepts but is not a drop-in replacement.

- Replace v8 styling props (`styles`, `theme`, class-name maps) with v9 slot props, `className`, and Griffel styling.
- Update `onSelectDate` to the v9 event/data callback shape: `(event, { date, selectedDateRangeArray })`.
- Replace string resources and date-format callbacks with `formatLabel` and `formatDateTime`. Prefer `createCalendarLabelFormatter` and `createCalendarDateTimeFormatter` for partial label overrides and locale-aware formatting.
- Configure child-only behavior through the `dayPicker` and `monthPicker` slots.
- Replace `componentRef`/`ICalendar` usage with normal React refs and application-owned focus or popup behavior. Calendar's root ref is an `HTMLDivElement`; child picker handles expose their own focus methods.
- Re-test custom keyboard handling. Preventing default in a consumer `onKeyDown` intentionally suppresses Calendar's root key behavior.
- Do not migrate production code to this preview package. Continue using the compatibility component until the v9 API is stable.

### From Fluent UI React Northstar (v0)

There is no compatibility layer. Map selected dates and callbacks to `value` and `onSelectDate`, replace shorthand customization with v9 slots, and provide localization through the Calendar formatter functions. Revalidate range selection, focus management, and popup composition as a new integration.

## Behaviors

### State

- **Selected date:** controlled by `value` when supplied; otherwise initialized to `today` and updated on selection.
- **Navigated day:** the date represented by the active day cell. It can differ from the selected date while browsing.
- **Navigated month:** the active month in the month picker. It can differ from both the selected date and navigated day.
- **Controlled updates:** when a supplied `value` changes to a different date, both navigated states synchronize to it.
- **Picker visibility:** initialized from visibility and overlay props, then owned internally while switching overlay views.
- **Year picker visibility:** owned by `CalendarMonth`; selecting a year returns to the month grid.
- **Unavailable dates:** dates outside `minDate`/`maxDate` and dates in `restrictedDates` cannot be selected. Arrow navigation searches for the next available date.
- **Go to today:** enabled only when a picker is navigated away from today's month/year. It navigates and focuses today but does not commit a selection.

### Pointer and touch

Clicking or tapping an available day commits the configured range and moves navigation to that day. Hover and pressed treatments cover the complete prospective range, including week and month ranges. Marked dates remain selectable. Clicking a month changes the day view, or commits the month when only the month picker is rendered. Header and navigation actions use native buttons.

### Keyboard

| Focus area          | Key                  | Behavior                                                                                                                                                                                                          |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calendar            | `Escape`             | Stops propagation and calls `onDismiss`, when provided.                                                                                                                                                           |
| Calendar            | `PageUp`             | Navigates the day picker forward one month.                                                                                                                                                                       |
| Calendar            | `PageDown`           | Navigates the day picker backward one month.                                                                                                                                                                      |
| Calendar            | `Ctrl+PageUp`        | Navigates the day picker forward one year.                                                                                                                                                                        |
| Calendar            | `Ctrl+PageDown`      | Navigates the day picker backward one year.                                                                                                                                                                       |
| Calendar            | `Enter`, `Backspace` | Prevents the root browser default; focused descendants retain their own activation behavior.                                                                                                                      |
| Day grid            | Arrow keys           | Moves by one day horizontally and one week vertically. Horizontal direction follows text direction. Crossing the rendered grid navigates to the adjacent month and restores focus. Unavailable dates are skipped. |
| Day gridcell        | `Enter`              | Selects the focused date and reports the configured range.                                                                                                                                                        |
| Month/year grid     | Arrow keys           | Moves through the two-dimensional grid using roving focus.                                                                                                                                                        |
| Month/year gridcell | `Enter`              | Selects the focused month or year.                                                                                                                                                                                |
| Native button       | `Enter` or `Space`   | Activates navigation, heading, close, and Go to today actions using native button behavior.                                                                                                                       |

`Tab` follows DOM order through enabled header actions, the roving grid stop, and Go to today. Calendar does not trap focus. When a picker view changes, Calendar programmatically focuses the navigated cell in the newly visible view.

Consumer keyboard handlers run first. Calling `event.preventDefault()` prevents Calendar's root handler from performing its action.

### Motion

Day, month, and year rows use directional motion when navigating between time ranges. Motion wrappers remain DOM-transparent to preserve grid and table relationships. Motion must respect the user's reduced-motion preference through the Fluent motion implementation.

## Accessibility

### Semantics

- Calendar uses the ARIA `grid` pattern because dates, months, and years are spatially arranged composite widgets with two-dimensional keyboard navigation.
- Day cells expose `role="gridcell"`, `aria-selected`, `aria-current="date"` for today, and `aria-disabled` when unavailable. Their nested buttons provide localized full-date names.
- Weekday labels are column headers. Optional week numbers are row headers and require localized labels.
- Month and year cells expose `role="gridcell"` and their interactive buttons have localized month or year names.
- Previous/next actions retain `aria-disabled` instead of native `disabled` when a boundary is reached so focus is not lost after navigation. Unless `allFocusable` is set, unavailable actions and dates are removed from normal keyboard focus.
- Calendar's root has no dialog role. A consumer that places Calendar in a popover or dialog owns the trigger relationship, accessible name, modal semantics, light-dismiss behavior, initial focus, return focus, and any focus trap.

### Names and announcements

The day grid's accessible name includes the navigated month and year, selected date, and today's date. Month and year grids are named by their displayed year or year range. Picker headings use polite, atomic live regions so navigation announces the displayed time range. Calendar's `liveRegion` politely and atomically announces a committed selection.

The default strings are English. Localized applications must provide both `formatDateTime` and `formatLabel`; customizing only visible date formatting leaves surrounding instructions and state labels in English. A custom `formatLabel` must return meaningful text for every label or delegate unhandled labels to the default formatter.

Marked dates include the marked state in their accessible label. Visual range hover and pressed states are supplemental and do not reveal otherwise unavailable information.

### Focus management

- Each grid uses roving focus so arrow navigation does not add every cell to the tab sequence.
- Switching between overlaid day and month pickers moves focus to the navigated cell in the destination picker.
- Opening the year picker moves focus to its navigated year; selecting a year returns focus to the corresponding month.
- Go to today moves focus to today's day cell but does not select it.
- Calendar never traps focus and does not automatically return focus to an external trigger on dismissal.

### Forced colors and zoom

Selected, current, marked, focused, and disabled states must remain distinguishable in Windows forced-colors mode without relying on color alone. The layout must reflow or use overlay mode without clipping interactive content at 400% zoom and a 320 CSS pixel viewport.
