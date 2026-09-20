## Best practices

### Do

- **Consider using `Textarea` with outline appearance.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding.
- Prefer using `<Field>` instead of `<Label>` to handle accessibility automatically.
- **When changing height related styles, apply them directly to the textarea slot like this: `<Textarea textarea={{ className: yourClassName }} />`.** This is needed due to the structure of the Textarea being a span wrapping the textarea native element and resizing based on the textarea element. It is also important to note that we add a default `maxHeight` so when typing text, a scrollbar will appear when the text becomes too long for the size of the Textarea. To remove this constraint, resetting the `maxHeight` prevents this issue as well as letting the textarea wrapper fully resize based on the textarea's size.

### Don't

- **Don’t place `Textarea` on a surface which doesn't have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.
