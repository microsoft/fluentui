A time picker (`TimePicker`) lets people pick a time of day from a list of generated options, or type a custom time in `freeform` mode. It is built on the headless `Combobox` and reuses the time logic from `@fluentui/react-timepicker-preview`.

Options are generated from `startHour`, `endHour` and `increment`, and formatted with `hourCycle` and `showSeconds`. Selecting an option, clearing, or committing freeform text calls `onSelectedTimeChange` with `selectedTime`, `selectedTimeText` and `errorType`.

### Accessible name

Label the input with a `<label htmlFor>` pointing at the TimePicker `id`, or with `aria-label` / `aria-labelledby`.

### State attributes

The root element exposes these attributes for styling:

| Attribute          | When present                               |
| ------------------ | ------------------------------------------ |
| `data-open`        | The listbox is open.                       |
| `data-disabled`    | The TimePicker is disabled.                |
| `data-placeholder` | The placeholder is visible.                |
| `data-invalid`     | The input has `aria-invalid`.              |
| `data-clearable`   | A time is selected and `clearable` is set. |
| `data-freeform`    | The TimePicker accepts freeform input.     |

Generated options expose `data-selected` and `data-activedescendant-focusvisible`. Style them through the listbox, e.g. `.listbox [role='option'][data-selected]`.
