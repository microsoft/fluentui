## Best practices

### Do

- Use the `DatePicker` control the way it's designed and built.
- The control provides the date in a specific format. If the date can be entered in an input field, provide helper text in the appropriate format.
- The control provides English strings by default. For localized apps, you must override these using the strings prop.
- Use `<Field>` when possible and provide the `required` prop through the `<Field>` component.

### Don't

- Don't try to change its behavior or appearance.
