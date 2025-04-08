## Best practices

### Do

- Use `MenuTrigger` as the first child of `Menu`.
- Use `MenuList` as the only child of `MenuPopover`.
- Create nested menus as separate components.
- Use the `hasIcons` prop for alignment if only some menu items have icons.
- Use the `hasCheckmarks` prop for alignment if only some menu items are selectable.
- Use `MenuItemLink` if the menu item should navigate to a new page
- Use `positioning={{ autoSize: true }}` if the Menu could potentially be clipped by the top of the page when forced to render above the trigger, or render past the bottom of the page when forced to render below the trigger (these can happen at high zoom or on small devices). Optionally: use `autoSize: true` for all Menus to force them to stay within the viewport and have their own scrollbars if there is overflow.

### Don't

- Don't render focusable or clickable items inside menu items.
- Don't use more than 2 levels of nested menus.
- Don't use verbose secondary content for menuitems.
- Don't mix checkboxes and radio items without `MenuGroup`.
