## Accessibility

### Do

- Use `href` on all NavItems that alter the URL, even if using JS routing
- Ensure all `Hamburger` icon buttons have an accessible name
- Add `aria-expanded` to buttons that toggle the expanded/collapsed state of inline Navs (this is not needed for overlay navs)

### Don't

- Combine expand/collapse items with linking behavior. Voice control and screen reader users cannot perform different actions through the same semantic button, even if a nested item has a separate click event attached.
