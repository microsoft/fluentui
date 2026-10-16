## Best practices

### Do

- Use `MenuTrigger` as the first child of `Menu`.
- Use `unstable_disableAutoFocus` only when the owner provides a keyboard path into the menu. It suppresses automatic focus while open, not close restoration or Tab behavior, and does not change nested Menu defaults. Changing it to `false` while open focuses the first item.
- Use `MenuList` as the only child of `MenuPopover`.
- Create nested menus as separate components.
- Use the `hasIcons` prop for alignment if only some menu items have icons.
- Use the `hasCheckmarks` prop for alignment if only some menu items are selectable.
- Use `MenuItemLink` if the menu item should navigate to a new page
- Use `positioning={{ autoSize: true }}` if the Menu could potentially be clipped by the top of the page when forced to render above the trigger, or render past the bottom of the page when forced to render below the trigger (these can happen at high zoom or on small devices). Optionally: use `autoSize: true` for all Menus to force them to stay within the viewport and have their own scrollbars if there is overflow.

### Don't

- Don't treat autofocus suppression as combobox or virtual-focus support. Normal Menu keyboard navigation requires DOM focus inside the menu.
- Don't assume autofocus suppression supplies v8 `ContextualMenu` parity. Result loading, keyboard entry, custom focus restoration, and host accessibility validation remain consumer responsibilities.
- Don't render focusable or clickable items inside menu items.
- Don't use more than 2 levels of nested menus.
- Don't use verbose secondary content for menuitems.
- Don't mix checkboxes and radio items without `MenuGroup`.
