## Best practices

### Do

- **Use `aria-label` on `TagPickerInput` to provide an accessible name for the input:** This attribute helps screen readers to understand the purpose of the input, making it more accessible and inclusive.

- **Inform the user about the [deletion interaction](https://github.com/microsoft/fluentui/issues/31165) of tags when pressing Backspace:** When `TagPickerInput` is focused, pressing the Backspace key will remove the last tag. This behavior should be communicated to the user to avoid confusion.

### Don't

- **Don't use `InteractionTag` with `TagPicker`** as it is not supported at the moment. This combination may lead to unexpected behavior.
