## Best practices

### Do

- Create nested `Popover`s as separate components.
- If there are no interactive items in the `Popover` content, set `tabIndex={-1}` on the `PopoverSurface`.
- Use `Popover` to reduce screen clutter and host non-essential information.

### Don't

- Don't use more than 2 levels of nested `Popover`s.
- Don't use `Popover`s to display too much content; consider if that content belongs on the main page.
