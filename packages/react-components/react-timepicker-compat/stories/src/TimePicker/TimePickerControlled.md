A TimePicker may have controlled selection and value. There are a few things to keep in mind:

1. **Control `selectedTime` with `value` (or `defaultSelectedTime` with `defaultValue`)**: When the `selectedTime` is controlled or a `defaultSelectedTime` is provided, a controlled `value` or `defaultValue` must also be defined. Otherwise, the TimePicker will not be able to display a value before the Options are rendered.
2. **Clearing input with null**: when controlled, the `selectedTime` prop should use `null` instead of `undefined` to clear the value of the TimePicker.
