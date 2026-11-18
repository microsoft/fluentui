A time picker (`TimePicker`) lets people pick a time of day from generated suggestions or type a valid custom time.
It is built on the headless `Combobox`, with time-specific keyboard and validation behavior. Custom times are
accepted by default; set `freeform={false}` to restrict selection to suggestions.

Options are generated from `startHour`, `endHour` and `increment`. The step controls suggestions, not valid custom
times. `locale`, `hourCycle` and `showSeconds` are shared by formatting and parsing; compact military input such as
`1030` is accepted independently of the display hour cycle. Selecting an option, clearing, or committing text calls
`onChange` with `value`, `displayValue` and `errorType`.

### Keyboard and validation

Typing opens and filters suggestions while focus stays on the input. Arrows navigate without wrapping.
Alt + Arrow Down opens without activation; Alt + Arrow Up closes without committing. Home/End keep native
caret behavior. Enter accepts an active suggestion or validates custom text. Tab validates only when leaving the
component, never by selecting the active suggestion.

Invalid text remains editable and exposes `aria-invalid` and `data-invalid`; it does not replace the last accepted
value. Escape cancels pending edits and restores that value. Compose a Field validation message from `errorType`.

With `clearable`, a non-empty input replaces the pointer-only chevron with a native Clear button. Clear is the
only additional tab stop. Moving to it does not validate text; activating it returns focus to the input.

### Remaining responsive integration

The popup defaults to below/start and uses shared CSS anchor positioning. Measured viewport clamping,
available-height auto-sizing and widening for localized labels remain shared positioning work; these changes do
not claim full Flex geometry alignment. Modern TimePicker should not implement a separate positioning controller.

### Accessible name

Label the input with a `<label htmlFor>` pointing at the TimePicker `id`, or with `aria-label` / `aria-labelledby`.
