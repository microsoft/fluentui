## Best practices

### Do

- **Preserve the expand icon's accessible button behavior when customizing it.** The default icon supports pointer and click-only activation, Enter and Space to toggle the listbox, and Escape to dismiss an open listbox without dismissing a parent dialog. Keep its accessible name and event handlers when replacing the `expandIcon` slot.
- **Consider using `Combobox` with outline or underline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding color.

### Don't

- **Don’t place input on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.
