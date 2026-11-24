## Best practices

### Do

- **Consider using `Select` with underline or outline appearances.** These are the preferred appearances.
- **Make filled controls visually identifiable.** Without another identifying visual cue, keep a visible selected option with at least **4.5:1** text contrast against the control background.
- **Use the appropriate surface for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

### Don't

- **Don't leave a filled `Select` without an identifying visual cue.** Native `Select` does not support a placeholder; keep a visible selected option when its text identifies the control instead of a contrasting border.
- **Don't use low-contrast option text or treat the selected option as a replacement for a label.**

The surface-token choices are Fluent design guidance, not WCAG requirements. The contrast thresholds come from [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
