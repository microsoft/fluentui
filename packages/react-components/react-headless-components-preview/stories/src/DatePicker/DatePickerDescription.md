`DatePicker` lets someone choose one calendar date, such as a due date or an appointment day. It composes a field
with a non-modal [Calendar](?path=/docs/components-calendar--docs) dialog, and can accept typed dates with
`allowTextInput`.

DatePicker is unstyled and ships no icon. Pass the calendar icon as `icon` children and style the parts through slots
and state attributes.

### Composition

- **Field**: a native `<button>` that shows the formatted date or `placeholder`, or a native `<input type="text">`
  when `allowTextInput` is set. Native props, including `id` and ARIA props, and the forwarded ref target this control;
  `className` and `style` go to the `root` wrapper.
- **Icon**: decorative inside the button. With `allowTextInput`, it toggles the calendar on click without adding a
  tab stop.
- **Popup surface**: a `role="dialog"` named by the visible month and year. It is shown in the top layer with
  `popover="manual"` and anchored below the field, flipping above when there is no room. It does not trap focus.
- **Calendar**: configure it with the `calendar` slot. DatePicker owns its selection, `today`, `minDate`, `maxDate` and
  displayed month, and defaults to three-column month and year grids. The day heading opens the year-range grid.
  `showGoToToday` alone controls the Go-to-today button.
- **Error message**: a polite live region after the field, referenced by `aria-describedby` while a typed date is
  rejected. Set `errorMessage={null}` to show errors through a Field instead.

### Accessibility

Name the field with a Field label, `aria-labelledby` or `aria-label`. The button's name combines that label with the
displayed date or placeholder. The field exposes `aria-haspopup="dialog"` and `aria-controls` while open; the button
and the editable mode's icon expose `aria-expanded`. Text inputs do not support `aria-expanded`, and buttons do not
support `aria-required`, so those states are omitted on those elements. The field is never a combobox because its
popup holds grids, not a listbox.

### Behavior

- Opening moves focus to the selected day, otherwise today, otherwise the first available day of the shown month, and
  falls back to Next month when no visible day is available.
- Selecting a day commits it, closes the calendar and returns focus to the field. Month and year cells only change the
  view.
- Escape closes without changing the value and returns focus to the field. Tab out and outside clicks close and keep
  the new focus destination.
- Alt + Arrow Down opens the calendar from the field. Click, Enter and Space toggle the button field. An editable field
  keeps focus on click, and Enter validates typed text.
- Typed text is validated on Enter and when focus leaves the date picker. Moving between the field and the calendar
  does not validate it. By default it accepts `YYYY-MM-DD`, a full or abbreviated English month name followed by the
  day and a four-digit year with an optional comma, and `M/D/YYYY`. Impossible dates such as February 30 are rejected.
  Supply `formatDate`, `parseDate` and `formatErrorMessage` for other locales.
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
