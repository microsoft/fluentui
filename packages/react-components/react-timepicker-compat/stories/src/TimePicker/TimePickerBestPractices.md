## Best practices

### Do

- Use `freeform` to give users the flexibility to input and select a time that may not be present in the predefined options.
- Use TimePicker within `Field` component to ensure an accessible label and error message are provided.

### Filled appearances

TimePicker inherits Combobox appearances. Fluent recommends `colorNeutralBackground3` surroundings for `filled-lighter` and `colorNeutralBackground1` for `filled-darker`; these surface choices are not WCAG requirements. Without another identifying visual cue, provide a descriptive placeholder or displayed time that identifies the editable/selectable control. Normal-size placeholder and value text must contrast at least **4.5:1** against the control's own fill. A boundary needed to identify an empty control must contrast at least **3:1** against the adjacent background. Keep a persistent visible label and a sufficiently contrasting focus indicator. See [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
