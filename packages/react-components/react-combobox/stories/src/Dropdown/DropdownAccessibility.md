## Accessibility

### Do

- **Provide a label for the Dropdown.** This can be done either by using the `Field` component with a `label` prop, or by using a custom labeling technique like a custom `<label for="dropdownId">` element, `aria-label` or `aria-labelledby`.
- **Use Dropdown when you need JSX or styled options, otherwise use Select.** For simple single-select use cases, consider using `Select` for better accessibility and mobile support.
- **Use multi-select Dropdown when you have 10+ options, otherwise use a Checkbox group.** For simple multiselect use cases with less than 10 options, consider using a group of `Checkbox` components.
- **Set `inlinePopup={true}` when possible for better VoiceOver support.** The `inlinePopup` prop will cause the listbox popup to be rendered immediately after the button in the DOM. Safari does not support `aria-owns`, so this enables iOS VoiceOver swipe navigation between the button and options.
- **Review [known accessiblity issues](./?path=/docs/concepts-developer-accessibility-components-dropdown--docs).**
- **Keep filled controls visually identifiable.** Without another identifying cue, provide a descriptive placeholder when empty and displayed value text when populated. Both must contrast at least **4.5:1** against the control's own fill.
- **Use the recommended surface for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`. These surface-token choices are Fluent guidance, not WCAG requirements.
- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

### Don't

- **Don't nest interactive controls in Dropdown slots or children.** The `Dropdown`'s `button` slot and children of `<Option>` components will not expose nested interactive elements to screen reader users, and additional non-`Option` children in the `listbox` slot will not be keyboard accessible.
- **Don't leave a filled Dropdown without an identifying visual cue.** Without another cue, provide a descriptive placeholder or displayed value that identifies the selectable control. Normal-size placeholder and value text must contrast at least **4.5:1** against the control's own fill; a placeholder never replaces a visible label.

The contrast thresholds come from [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Read the [Dropdown accessibility spec](./?path=/docs/concepts-developer-accessibility-components-dropdown--docs) for more detailed information, as well as full descriptions of semantics and keyboard behavior.
