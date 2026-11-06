## Best practices

### Do

- **Preserve the expand icon's accessible button behavior when customizing it.** The default icon supports pointer and click-only activation, Enter and Space to toggle the listbox, and Escape to dismiss an open listbox without dismissing a parent dialog. Keep its accessible name and event handlers when replacing the `expandIcon` slot.
- **Consider using `Combobox` with outline or underline appearances.** These are the preferred appearances. A boundary needed to identify an empty control must contrast at least **3:1** against the adjacent background.
- **Make filled controls visually identifiable.** Without another identifying visual cue, provide a descriptive placeholder when empty or a displayed value when populated. Normal-size placeholder and value text must contrast at least **4.5:1** against the control's own fill and help users recognize the editable/selectable control.
- **Use the recommended surface for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

### Don't

- **Don't leave a filled Combobox without an identifying visual cue.** If text identifies the control instead of a contrasting boundary, always provide either descriptive placeholder or value text.
- **Don't use low-contrast placeholder or value text, or treat a placeholder as a replacement for a label.**

The surface-token choices are Fluent design guidance, not WCAG requirements. The contrast thresholds come from [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
