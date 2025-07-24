# MenuGrid

## Keyboard interactions

The `MenuGrid` component should enable the following grid-like navigation:

- The Down and Up arrow keys should navigate vertically to the next and previous menu items, respectively.
- The Right and Left arrow keys should navigate horizontally to the next and previous interactive element within the current menu item, respectively, that is, between the current menu item actions.

### Submenus

Unlike with the `MenuList` component, submenus should not be open using the Right arrow key or by activating the menu item that has a submenu with Enter or spacebar. Instead, submenus should be implemented using a menu button located in the next column and reachable using the Right arrow key.

## Accessibility

Compared to the `MenuList` component, the `MenuGrid` component should use different ARIA roles for its elements. The roles and other ARIA attributes should be as follows:

- The `MenuGrid` element should use the "grid" role.
- The possible `MenuGridRowGroup` elements should use the "rowgroup" role and be by default labelled using aria-labelledby referencing the respective `MenuGridRowGroupHeader` element.
- The possible `MenuGridRowGroupHeader` elements should use the "presentation" role and be hidden from assistive technologies using the aria-hidden="true" attribute.
- The `MenuGridRow` element should use the "row" role.
- The `MenuGridCell` element should use the "gridcell" role.
