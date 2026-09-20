## Best practices

### Do

- **Provide a label for the Dropdown.**
- **Set the Option's `value` prop if the content contains JSX.** The Option value is used for keyboard accessibility to enable users to type a letter or string and jump to the matching option. The value is calculated from the children by default, but if the Option contains JSX, the `value` prop should be used to directly provide a string value.
- **Consider using `Dropdown` with outline or underline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding color.

### Don't

- **Use `placeholder` for label text.** Placeholder text has lower contrast than label text, and disappears once an option is selected. If used, it should only contain temporary filler text.
