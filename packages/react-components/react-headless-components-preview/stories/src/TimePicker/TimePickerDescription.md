A time picker (`TimePicker`) lets people type a time of day or pick one from a list of suggested times. It is built on the headless `Combobox`.

Options are generated from `startHour`, `endHour` and `increment`, formatted with `locale`, `hourCycle` and `showSeconds`, and filtered by the typed text. Selecting an option, clearing, or committing typed text calls `onChange` with `value`, `displayValue` and `errorType`. A failed commit keeps the value and reports its `errorType`; pass `freeform={false}` to accept only the listed times.

### Accessible name

Label the input with a `<label htmlFor>` pointing at the TimePicker `id`, or with `aria-label` / `aria-labelledby`.
