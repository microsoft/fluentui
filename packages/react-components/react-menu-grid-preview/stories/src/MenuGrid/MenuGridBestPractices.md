## Best practices

### Do

- Use `MenuTrigger` as the first child of `Menu`.
- Use `MenuGrid` as the only child of `MenuPopover`.
- Use `MenuGridItem` instead of the `MenuGridRow` and `MenuGridCell` components when possible because `MenuGridItem` with its slots creates the proper grid structure for you.
- Use `{ visuallyHidden: true }` for the `firstSubAction` or `secondSubAction` slots of `MenuGridItem` if you want to omit a sub-action for certain menu grid items making the sub-actions asymmetric. This is necessary to maintain the proper grid structure.
- Use small transparent buttons inside of the cells for best layout.
- Use the `aria-label` attribute on `MenuGridItem` or `MenuGridRow` to set a proper row name which will be narrated for screen reader users when navigating in menu grid using the Down or Up arrow keys.

### Don't

- Don't use the `MenuGridItem` or `MenuGridRow` components as children of `MenuList`. They are only intended to work within `MenuGrid`.
- Don't place more than one actionable element to the `firstSubAction` or `secondSubAction` slot. If you need to provide more than two actionable elements for a menu grid item, use the `MenuGridRow` and `MenuGridCell` compound components and place each actionable element into its own `MenuGridCell` as instructed in the story below. Alternatively, consider creating a menu button as a submenu using one of the sub-action slots as also instructed in the story below and place your actions into the submenu.
- Don't make `MenuGridCell` components, `firstSubAction` and `secondSubAction` slots focusable using the `tabIndex` attribute with value `0` if they are empty or `visuallyHidden`, respectively.
