## Best practices

### Do

- **Consider using `Input` with underline or outline appearances.** These are the preferred appearances.
- **Make the input visually identifiable.** Use either:
  - **A contrasting border:** Choose `outline` or `underline`, ensuring the visible border contrasts at least **3:1** against the surrounding background. These appearances can be empty, with or without a placeholder.
  - **Identifying text content:** Provide a placeholder when empty and value text when populated. Both must contrast at least **4.5:1** against the input background and help users recognize the editable control.
- **Use the appropriate surface for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

### Don't

- **Don't leave a filled input without an identifying visual cue.** If text identifies the control instead of a contrasting border, always provide either placeholder or value text.
- **Don't use low-contrast placeholder or value text, or treat a placeholder as a replacement for a label.**

The surface-token choices are Fluent design guidance, not WCAG requirements. The contrast thresholds come from [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
