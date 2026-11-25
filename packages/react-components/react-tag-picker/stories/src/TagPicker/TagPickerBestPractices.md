## Best practices

### Do

- **Use `aria-label` on `TagPickerInput` to provide an accessible name for the input:** This attribute helps screen readers to understand the purpose of the input, making it more accessible and inclusive.

- **Use `TagPickerOptionGroup` with a descriptive `label` to group suggestions:** Groups expose their labels to assistive technology, while each `TagPickerOption` exposes its selection state through `aria-selected`.

- **Inform the user about the [deletion interaction](https://github.com/microsoft/fluentui/issues/31165) of tags when pressing Backspace:** When `TagPickerInput` is focused, pressing the Backspace key will remove the last tag. This behavior should be communicated to the user to avoid confusion.

- **Keep filled controls visually identifiable.** Without another identifying visual cue, provide a descriptive `TagPickerInput` placeholder when there are no selected tags. Placeholder and value text must contrast at least **4.5:1** against their background. Keep a persistent visible label and a sufficiently contrasting focus indicator.

- **Use the appropriate surface for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.

### Don't

- **Don't use `InteractionTag` with `TagPicker`** as it is not supported at the moment. This combination may lead to unexpected behavior.

- **Don't leave a filled control without an identifying visual cue when the last tag is removed, or treat a placeholder as a replacement for a label.**

The surface-token choices are Fluent design guidance, not WCAG requirements. The contrast thresholds come from [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
