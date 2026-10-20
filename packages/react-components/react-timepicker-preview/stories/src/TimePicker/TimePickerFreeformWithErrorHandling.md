TimePicker supports the `freeform` prop, which allows freeform text input.
A freeform TimePicker commits the typed text the way the native `change` event of a text input fires:

- When the typed text has changed and focus leaves the TimePicker, the value is parsed from the typed text.
- When the typed text has changed and Enter is pressed in the input:
  - if the listbox is open and the typed text is a prefix of an option, that option is selected.
  - if the listbox is closed or the typed text does not match any option, the value is parsed from the typed text.

The value and the `errorType` are available in the `onChange` callback. Use Field to display the error message based on the error type provided by `onChange`.
