## Best practices

### Do

- Use the `trapFocus` prop when focusable elements are in the `Popover`.
- Create nested `Popovers` as separate components.
- If there are no interactive items in the `Popover` content, set `tabIndex={-1}` on the `PopoverSurface`.
- Use `Popover` to reduce screen clutter to host non-essential information.

### Don't

- Don't use more than 2 levels of nested `Popovers`.
- Don't use `Popovers` to display too much content, consider if that content should be on the main page.
