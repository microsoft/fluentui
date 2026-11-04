## Best practices

### Do

- **Consider using `Textarea` with outline appearance.** This is the preferred appearance.
- **Make the textarea visually identifiable.** When no other cue identifies an empty control, provide a boundary with at least **3:1** contrast against its surroundings.
- **Use identifying placeholder or value text.** Visible text can identify a control without a contrasting boundary, but readability alone does not ensure identification. Placeholder and value text must have at least **4.5:1** contrast against the textarea background.
- **Follow Fluent surface guidance for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**
- Prefer using `<Field>` instead of `<Label>` to handle accessibility automatically.
- **When changing height related styles, apply them directly to the textarea slot like this: `<Textarea textarea={{ className: yourClassName }} />`.** This is needed due to the structure of the Textarea being a span wrapping the textarea native element and resizing based on the textarea element. It is also important to note that we add a default `maxHeight` so when typing text, a scrollbar will appear when the text becomes too long for the size of the Textarea. To remove this constraint, resetting the `maxHeight` prevents this issue as well as letting the textarea wrapper fully resize based on the textarea's size.

### Don't

- **Don't leave a filled textarea without an identifying visual cue.** If text identifies the control instead of a contrasting boundary, provide a descriptive placeholder while empty and value text when populated.
- **Don't treat a placeholder as a replacement for a label or persistent instructions.**

The surface-token choices are Fluent design guidance, not WCAG requirements. See [WCAG 1.4.11 on boundaries](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3 on text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
