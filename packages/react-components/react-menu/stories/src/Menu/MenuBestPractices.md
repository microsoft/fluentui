## Best practices

### Do

- Prefer `MenuTrigger` as the first child of `Menu`.
- When using experimental `unstable_triggerElement` instead, supply activation, keyboard handling, ARIA relationships supported by the trigger's role, and an explicit accessible name for `MenuList` (override its default `aria-labelledby`). Keep the registered element connected and programmatically focusable through close for focus restoration. A textbox supports `aria-haspopup` and `aria-controls`, but not `aria-expanded`.
- Use `unstable_disableAutoFocus` only when the owner provides a keyboard path into the menu. It suppresses automatic focus while open, not close restoration or Tab behavior, and does not change nested Menu defaults. Changing it to `false` while open focuses the first item.
- For experimental editable-trigger compositions, discover actual focusable items with `useFocusFinders`, not a role-only DOM query. Preserve native Tab exit and do not intercept IME composition keys. Keep Enter behavior in the input separate from activating a focused menu item.
- Keep focus in the input when asynchronously loaded commands arrive, and announce loading, result counts, and empty results through a pre-existing `role="status"` region outside the menu. Require a fresh navigation key rather than replaying an earlier key after loading. Cancel obsolete or dismissed requests so they cannot reopen the menu.
- Do not expose an empty Menu for settled zero results. The editable-trigger example allows entry only after results settle; applications that update results while a menu item owns focus must manage focus before removing that item. These props do not provide an asynchronous focus-recovery policy.
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
- Don't present an editable textbox with a menu popup as a standard menu-button or combobox pattern. A combobox popup may be a listbox, tree, grid, or dialog, not a menu. The experimental example still needs assistive-technology and host validation before production use.
- Don't assume external registration supplies v8 `ContextualMenu` parity. Migration flags, custom restoration callbacks, result loading, and host-specific keyboard behavior remain consumer responsibilities.

- Don't render focusable or clickable items inside menu items.
- Don't use more than 2 levels of nested menus.
- Don't use verbose secondary content for menuitems.
- Don't mix checkboxes and radio items without `MenuGroup`.
