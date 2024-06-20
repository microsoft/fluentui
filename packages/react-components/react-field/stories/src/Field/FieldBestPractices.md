## Best practices

### Do

- Use Field to add a label and validation message to form controls.
- Use Field to label other unlabeled controls like ProgressBar.

### Don't

- Avoid including both a validationMessage and hint text.
- Don't add multiple controls as a child of a single Field. The label is only associated with one control.
- Don't use the Field's label with Checkbox. Use the Checkbox's label instead (the Field can still be used to add a validationMessage or hint).
