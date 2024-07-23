## Best practices

### Do

- Use an `indeterminate` `ProgressBar` when the total units to completion is unknown
- Provide a clear description of the progress operation
- Show text above and/or below the bar
- Combine steps of a single operation into one bar
- Use `Field` to add a `validationMessage` and `hint` message for the `indeterminate` `ProgressBar` when `reduced-motion` is active

### Don't

- Use only a single word description
- Show text to the right or left of the bar
- 'Rewind' progress to show new steps
