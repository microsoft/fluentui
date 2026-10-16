A TimePicker may have a controlled value:

1. **`value` and `onChange`** control the selected time. The display text is derived from `value` with `formatDateToTimeString`, so it does not need to be controlled separately.
2. **Clearing with `null`**: when controlled, pass `null` instead of `undefined` to clear the value.
