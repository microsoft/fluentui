## Best practices

### Do

- Use `MenuTrigger` as the first child of `Menu`.
- Use `MenuList` as the only child of `MenuPopover`.
- Create nested menus as separate components.
- Use the `hasIcons` prop for alignment if only some menu items have icons.
- Use the `hasCheckmarks` prop for alignment if only some menu items are selectable.
- Use `MenuItemLink` if the menu item should navigate to a new page

### Don't

- Don't render focusable or clickable items inside menu items.
- Don't use more than 2 levels of nested menus.
- Don't use verbose secondary content for menuitems.
- Don't mix checkboxes and radio items without `MenuGroup`.
