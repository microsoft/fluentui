## Best practices

### Do

- Use `focusable` property on the `List` where the items have no actionable elements inside.
- Use `focusableItems` property when the list items have more than one actionable element.

### Don't

- Don't use `focusableItems` prop if the list items have zero actionable elements, use `focusable` instead.
  This way the list itself is focusable and users can scroll by using up and down arrows after focusing it.
- Don't use `focusableItems` prop if the list items have 1 actionable element, make that element focusable instead.
