## Best practices

### Do

- Create nested `Popover`s as separate components.
- If there are no interactive items in the `Popover` content, the browser focuses the `PopoverSurface` itself on open. Give it an accessible name (`aria-label` or `aria-labelledby`) and point `aria-describedby` at the content, so screen readers announce the popover and its text.
- Use `Popover` to reduce screen clutter and host non-essential information.

### Don't

- Don't use more than 2 levels of nested `Popover`s.
- Don't use `Popover`s to display too much content; consider if that content belongs on the main page.
