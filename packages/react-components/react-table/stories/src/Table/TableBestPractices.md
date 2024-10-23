## Best Practices

### Do

- Always enclude a `TableHeader` row.
- When the Table is preceded by a heading or other visible labelling text, use `aria-labelledby` to point to the heading's `id`.
- When the Table does not have any visible text label, use `aria-label` to give it an accessible name.
- Set a `min-width` style to ensure the Table displays properly at high zoom levels or small screens.

### Don't

- Use Table to display single-column content.
- Override the `role` attribute of Table controls.
