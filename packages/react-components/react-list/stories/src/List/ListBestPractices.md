## Best practices

### Do

- Use `tabIndex={0}` property on the `List` where the items have no actionable elements inside.
- Use `navigationMode="items"` property on the `ListItem` when the list items should be focusable.
- Use `navigationMode="composite"` property on the `ListItem` when the list items should be and there are other focusable elements inside of them.
- use `onAction` callback to register primary action (click or `Enter` key)
- Use `aria-label` property on the `ListItem` for custom screen reader label.
- Rely on default accessibility roles, which are switched based on the `navigationMode` prop.
- When `navigationMode` is `composite`, wrap each interactive item in `ListItem` in its own element with `role="gridcell"`.

### Don't

- Don't use `tabIndex` on the `ListItem`, use `navigationMode` to get proper accessibility and keyboard navigation.
- Don't use `navigationMode` on the `ListItem` if the list items have zero actionable elements, use `tabIndex={0}` on the `List` instead.
  This way the list itself is focusable and users can scroll by using up and down arrows after focusing it.
- Don't use `onClick` for the list action, use `onAction` instead which adds automatic support for `Enter` and `Spacebar` keys
  and works well with selection (`Enter`/`click` triggers the `onAction` callback, `Space` or checkbox click trigger selection)
