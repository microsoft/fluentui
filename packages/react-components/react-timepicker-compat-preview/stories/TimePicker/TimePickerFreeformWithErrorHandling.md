TimePicker supports the `freeform` prop, which allows freeform text input.
The selection behavior of freeform TimePicker aligns with the native `change` event behavior for text input:

- When the value in the TimePicker input changes, and the TimePicker loses focus, the selected time is computed from the `input` value.
- When TimePicker input value has changed and Enter key is pressed on the `input`:
  - if the dropdown is expanded and the `input` value is prefix of an option, the selected time is set to the matching option.
  - if the dropdown is collapsed or the `input` value does not match any option, the selected time is computed from `input` value.

The selected time is available in `onTimeChange` callback. Use Field to display the error message based on the error type provided by `onTimeChange`.
