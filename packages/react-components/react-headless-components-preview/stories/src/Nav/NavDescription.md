Nav provides up to two levels of nesting for navigation. It is a headless component that manages selection state, category open/close state, and item registration without applying any visual styles.

Use Nav with NavItem for flat navigation, or combine with NavCategory, NavCategoryItem, NavSubItemGroup, and NavSubItem for hierarchical navigation. NavDivider and NavSectionHeader help organize content.

NavDrawer combines Nav behavior with Drawer layout, providing a navigation panel that can be displayed inline or as an overlay. Use NavDrawerHeader, NavDrawerBody, and NavDrawerFooter to structure the drawer content.

### Accessibility

An overlay NavDrawer is an overlay Drawer: with `modalType` `modal` (the default) or `alert` it opens as a native `<dialog>` with `showModal()`, and with `modalType="non-modal"` it opens with `showPopover()` and leaves the page interactive. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays) for how Tab and focus behave inside a modal surface.
