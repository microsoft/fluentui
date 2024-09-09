## Best Practices

### Do

- Always enclude a `DataGridHeader` row.
- When the DataGrid is preceded by a heading or other visible labelling text, use `aria-labelledby` to point to the heading's `id`.
- When the DataGrid does not have any visible text label, use `aria-label` to give it an accessible name.
- Set a `min-width` style to ensure the DataGrid displays properly at high zoom levels or small screens.

### Don't

- Use DataGrid to display single-column content.
- Override the `role` attribute of DataGrid controls.
