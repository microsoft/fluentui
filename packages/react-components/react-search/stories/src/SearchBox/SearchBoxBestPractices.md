## Best practices

### Do

- **Consider wrapping `SearchBox` in a role="search" container for top-level site or app search fields.** This role exposes the search field as a landmark, and makes it easier to find for screen reader users. It should not be used unless the SearchBox is the primary search area for the entire site or app.

- **Consider using `SearchBox` with underline or outline appearances.** These are the preferred appearances.

- **Use identifying placeholder or value text.** Without another identifying visual cue, provide a descriptive placeholder when empty and value text when populated. Both must have at least **4.5:1** contrast against the input background and help users recognize the search control.

- **Follow Fluent surface guidance for filled appearances:** Place `filled-lighter` on `colorNeutralBackground3` and `filled-darker` on `colorNeutralBackground1`.

- **Keep a persistent visible label and a sufficiently contrasting focus indicator.**

- **Consider composing `SearchBox` with a results dropdown for typeahead (autocomplete) patterns.** `SearchBox` can be paired with a results list to show suggestions as the user types. Use `aria-autocomplete="list"`, `aria-controls`, `aria-expanded`, and `aria-activedescendant` on the input, and `role="listbox"` / `role="option"` on the result elements to ensure the pattern is accessible. See the **Typeahead** story for a complete example.

### Don't

- **Don't leave a filled search box without an identifying visual cue.** If text identifies the control instead of a contrasting boundary, provide a descriptive placeholder while empty and value text when populated.
- **Don't treat a placeholder as a replacement for a label or persistent instructions.**

The surface-token choices are Fluent design guidance, not WCAG requirements. See [WCAG 1.4.11 on boundaries](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) and [WCAG 1.4.3 on text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
