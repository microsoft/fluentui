`DatePicker` lets someone choose one calendar date, such as a due date or an appointment day. It composes a field
with a non-modal [Calendar](?path=/docs/components-calendar--docs) dialog, and can accept typed dates with
`allowTextInput`.

DatePicker is unstyled and ships no icon. Pass the calendar icon as `icon` children and style the parts through slots
and state attributes.

### Composition

- **Field**: a native `<button>` that shows the formatted date or `placeholder`, or a native `<input type="text">`
  when `allowTextInput` is set. Native props, including `id` and ARIA props, and the forwarded ref target this control,
  so their types follow `allowTextInput`: `HTMLButtonElement` by default and `HTMLInputElement` with `allowTextInput`.
  `className` and `style` go to the `root` wrapper.
- **Icon**: a native sibling button that toggles the calendar on click, Enter or Space. With `allowTextInput`, it
  is the next tab stop after the input; otherwise it has `tabindex="-1"`. Associate a labeling Tooltip through
  `icon.aria-labelledby`, using the same localized "Open calendar" label for hover and focus.
- **Popup surface**: a `role="dialog"` named by the visible month and year. It is shown in the top layer with
  `popover="manual"` and anchored below the field, flipping above when there is no room. It does not trap focus.
- **Calendar**: configure it with the `calendar` slot. DatePicker owns its selection, `today`, `minDate`, `maxDate` and
  displayed month, and defaults to three-column month and year grids. The day heading opens the year grid in both
  layouts; set `calendar.dayHeadingView` to change that.
  `showGoToToday` alone controls the Go-to-today button.
- **Error message**: a polite live region after the field, referenced by `aria-describedby` while a typed date is
  rejected. Set `errorMessage={null}` to show errors through a Field instead.

### Accessibility

Name the field with a Field label, `aria-labelledby` or `aria-label`. The button's name combines that label with the
displayed date or placeholder. Both field modes expose `role="combobox"`, `aria-haspopup="dialog"`,
`aria-expanded` and, when required, `aria-required`. The editable input has `aria-autocomplete="none"`.
`aria-controls` references the dialog while open. Set `aria-describedby` and `aria-invalid` on
DatePicker or its `input`/`trigger` slot; description IDs are combined with the validation message ID, and a
validation error sets `aria-invalid="true"`. The popup is a calendar dialog, not a listbox.

### Behavior

- Every opening, including `defaultOpen` and a controlled `open` change, synchronizes Calendar to the accepted
  date, otherwise today, within the date bounds. Unavailable dates remain keyboard-inspectable by default, but
  cannot be selected.
- Selecting a day commits it, closes the calendar and returns focus to the field. Month and year cells only change the
  view. Browsing or choosing a picker year does not change the day grid until a month is chosen.
- Escape first closes an internal overlay picker, or returns the beside year grid to month choices, and focuses
  the corresponding Calendar heading. A subsequent Escape closes DatePicker and returns focus to the field.
  Tab out and outside clicks close and keep the new focus destination.
- Alt + Arrow Down opens the calendar from the field. Click, Enter and Space toggle the button field. An editable field
  keeps focus on click, and Enter validates typed text.
- Typed text is validated on Enter and when focus leaves the date picker. Moving between the field, icon and
  calendar does not validate it. `locale` (default `en-US`) is shared by field formatting, parsing and Calendar
  labels. The parser accepts localized long/short month dates and numeric date order, including localized digits,
  plus `YYYY-MM-DD` and English month-first names. Numeric input must match the locale's order and separators:
  `3/4/2026` means March 4 in `en-US`, April 3 in `en-GB`, and is rejected in `de-DE` (use `3.4.2026`).
  Localized month punctuation and date suffixes are required, such as `19 nov. 2026` in French and the trailing
  year suffix in Russian. Use `parseDate` to accept more permissive input. Impossible dates such as February 30 are rejected.
  `formatDate`, `parseDate` and `formatErrorMessage` support custom formats and localized correction messages.
  Default Intl formatters and parsers are shared across instances with the same locale.
- Rejected text restores the previous date and shows an error until an accepted date, a calendar selection, or
  clearing an optional field. Repeated blur does not re-announce it.

### State attributes

| Attribute          | Element | Present when                |
| ------------------ | ------- | --------------------------- |
| `data-open`        | root    | The calendar is open        |
| `data-disabled`    | root    | The date picker is disabled |
| `data-invalid`     | root    | A typed date was rejected   |
| `data-editable`    | root    | `allowTextInput` is set     |
| `data-placeholder` | root    | No date is committed        |

Calendar cells keep their own state attributes, such as `data-selected`, `data-today` and `data-current`.

### Remaining responsive integration

`calendar.layout` is still consumer-controlled. Automatic Beside-to-Overlay switching and measured popup
viewport clamping/auto-sizing are not implemented by these behavioral changes. They should be resolved in shared
Calendar/positioning infrastructure, not duplicated in modern DatePicker. See the library's
[positioning strategy RFC](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-headless-components-preview/library/docs/rfc-positioning-strategy.md).

### Migrating from 0.4

The embedded Calendar moved to the single-component API (see the Calendar docs). For DatePicker this means
`calendar.closeButton` replaces the day panel's close button, `calendar.renderCell`/`renderRow`/`renderWeekdayCell`
replace the prop getters, and the day heading opens the year grid (`dayHeadingView="year"`) by default.
