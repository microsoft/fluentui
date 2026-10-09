## Best practices

### Do

- Prefer `MenuTrigger` as the first child of `Menu`.
- When using experimental `unstable_triggerElement` instead, supply activation, keyboard handling, expanded state, ARIA relationships, and an explicit accessible name for `MenuList` (override its default `aria-labelledby`). Keep the registered element connected and programmatically focusable through close for focus restoration.
- Use `unstable_disableAutoFocus` only when the owner provides a keyboard path into the menu. It suppresses automatic focus while open, not close restoration or Tab behavior, and does not change nested Menu defaults. Changing it to `false` while open focuses the first item.
- Distinguish `positioning.target`, which only anchors the popup, from `unstable_triggerElement`, which also registers containment and focus restoration. An explicit positioning target takes precedence for geometry.
- Use `MenuList` as the only child of `MenuPopover`.
- Create nested menus as separate components.
- Use the `hasIcons` prop for alignment if only some menu items have icons.
- Use the `hasCheckmarks` prop for alignment if only some menu items are selectable.
- Use `MenuItemLink` if the menu item should navigate to a new page
- Use `positioning={{ autoSize: true }}` if the Menu could potentially be clipped by the top of the page when forced to render above the trigger, or render past the bottom of the page when forced to render below the trigger (these can happen at high zoom or on small devices). Optionally: use `autoSize: true` for all Menus to force them to stay within the viewport and have their own scrollbars if there is overflow.

### Don't

- Don't combine `unstable_triggerElement` with `MenuTrigger`; the rendered trigger takes precedence.
- Don't treat autofocus suppression as combobox or virtual-focus support. Normal Menu keyboard navigation requires DOM focus inside the menu.

- Don't render focusable or clickable items inside menu items.
- Don't use more than 2 levels of nested menus.
- Don't use verbose secondary content for menuitems.
- Don't mix checkboxes and radio items without `MenuGroup`.
