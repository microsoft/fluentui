## Best practices

### Do

- Use the `DatePicker` control the way it's designed and built.
- The control provides the date in a specific format. If the date can be entered in an input field, provide helper text in the appropriate format.
- The control provides English strings by default. For localized apps, you must override these using the strings prop.
- Use `<Field>` when possible and provide the `required` prop through the `<Field>` component.
- For the inherited `Input` filled appearances, place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`. Without another identifying visual cue, provide a descriptive placeholder when empty; placeholder and value text must contrast at least **4.5:1** against the input background. Keep a persistent visible label and a sufficiently contrasting focus indicator.

### Don't

- Don't try to change its behavior or appearance.

The surface-token choices are Fluent design guidance, not WCAG requirements. See [WCAG 1.4.11: Boundaries](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
