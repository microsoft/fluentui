## Best practices

### Do

- When using `TagGroup` with `Combobox` to display multiple selected values:
  - Set the `listbox` role for `TagGroup` and the `option` role for each `Tag`.
  - If using `TagButton`, set the `option` role for the content and make the dismiss button not focusable. When content is focused, Enter/Space should invoke the primary action, and Backspace/Delete remove the tag.

### Don't
