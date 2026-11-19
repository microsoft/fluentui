A time picker (`TimePicker`) lets people pick a time of day from a list of generated options, or type a custom time in `freeform` mode. It is built on the headless `Combobox`.

Options are generated from `startHour`, `endHour` and `increment`, and formatted with `hourCycle` and `showSeconds`. Selecting an option, clearing, or committing freeform text calls `onChange` with `value`, `displayValue` and `errorType`.

### Accessible name

Label the input with a `<label htmlFor>` pointing at the TimePicker `id`, or with `aria-label` / `aria-labelledby`.
