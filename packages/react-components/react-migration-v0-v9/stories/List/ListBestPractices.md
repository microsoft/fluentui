## Best practices

### Do

- Use `tabIndex={0}` property on the `List` where the items have no actionable elements inside.
- Use `focusableItems` property when the list items have more than one actionable element.
- If the ListItem has one action, make sure the component inside of the ListItem is actionable, or use the `ListItemButton` component as your child, which if just preconfigured `Button`.

### Don't

- Don't use `focusableItems` prop if the list items have zero actionable elements, use `tabIndex={0}` on the `List` instead.
  This way the list itself is focusable and users can scroll by using up and down arrows after focusing it.
- Don't use `focusableItems` prop if the list items have 1 actionable element, make that element focusable instead.
