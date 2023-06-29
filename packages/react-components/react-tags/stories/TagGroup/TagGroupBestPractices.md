## Best practices

### Do

- A Picker component is planned for displaying multiple selected values using `TagGroup` with `Combobox`, and will be the recommended approach once it's available. But for now, when using `TagGroup` with `Combobox`:
  - Set the `listbox` role for `TagGroup` and the `option` role for each `Tag`.
  - If using `InteractionTag`, set the `option` role for the content and make the dismiss button not focusable. When content is focused, Enter/Space should invoke the primary action, and Backspace/Delete remove the tag.

### Don't
