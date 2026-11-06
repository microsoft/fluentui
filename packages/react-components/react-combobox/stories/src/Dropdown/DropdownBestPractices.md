## Best practices

### Do

- **Provide a label for the Dropdown.**
- **Set the Option's `value` prop if the content contains JSX.** The Option value is used for keyboard accessibility to enable users to type a letter or string and jump to the matching option. The value is calculated from the children by default, but if the Option contains JSX, the `value` prop should be used to directly provide a string value.
- **Consider using `Dropdown` with outline or underline appearances.** These are the preferred appearances. A boundary needed to identify an empty control must contrast at least **3:1** against the adjacent background.
- **Make filled controls visually identifiable.** Without another identifying visual cue, provide a descriptive placeholder when empty or a displayed value when populated. Normal-size placeholder and value text must contrast at least **4.5:1** against the control's own fill and help users recognize the selectable control.
- **Use the recommended surface for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

### Don't

- **Use `placeholder` as a replacement for label text.** Placeholder text disappears once an option is selected. Keep a persistent visible label; when the placeholder identifies the control, use descriptive text with sufficient contrast.
- **Leave a filled Dropdown without an identifying visual cue, or use low-contrast placeholder or value text.**

The surface-token choices are Fluent design guidance, not WCAG requirements. The contrast thresholds come from [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
