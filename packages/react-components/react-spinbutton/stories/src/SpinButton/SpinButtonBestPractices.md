## Best practices

### Do

- **Consider using `SpinButton` with underline or outline appearances.** These are the preferred appearances.
- **Use identifying placeholder or value text.** Without another identifying visual cue, provide a descriptive placeholder when empty and value text when populated. Both must have at least **4.5:1** contrast against the input background and help users recognize the editable control. Use the native `placeholder` prop to keep a filled spin button identifiable when its value is cleared.
- **Follow Fluent surface guidance for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

### Don't

- **Don't leave a filled spin button without an identifying visual cue.** A default numeric value alone does not identify the control after the user clears it; provide a descriptive placeholder if relying on text rather than a contrasting boundary.
- **Don't treat a placeholder as a replacement for a label or persistent instructions.**

The surface-token choices are Fluent design guidance, not WCAG requirements. See [WCAG 1.4.11 on boundaries](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3 on text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
