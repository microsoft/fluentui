## Best practices

### Do

- Include a focusable element when the `Popover` supports an action. Focus moves to the first focusable element when the `Popover` opens.
- Use the `trapFocus` prop when interaction with the `Popover` should be modal.
- Create nested `Popovers` as separate components.
- If there are no interactive items in the `Popover` content, set `tabIndex={-1}` on the `PopoverSurface` and give it an accessible name.
- Use `Popover` to reduce screen clutter to host non-essential information.

### Don't

- Don't use more than 2 levels of nested `Popovers`.
- Don't use `Popover` for simple labels; use `Tooltip` instead.
- Don't use `Popovers` to display too much content, consider if that content should be on the main page.
