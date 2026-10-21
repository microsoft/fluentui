Nav provides up to two levels of nesting for navigation. It is a headless component that manages selection state, category open/close state, and item registration without applying any visual styles.

Use Nav with NavItem for flat navigation, or combine with NavCategory, NavCategoryItem, NavSubItemGroup, and NavSubItem for hierarchical navigation. NavDivider and NavSectionHeader help organize content.

NavDrawer combines Nav behavior with Drawer layout, providing a navigation panel that can be displayed inline or as an overlay. Use NavDrawerHeader, NavDrawerBody, and NavDrawerFooter to structure the drawer content.

### Accessibility

An overlay NavDrawer opens as a modal native `<dialog>` with `showModal()`. The page behind is inert, so focus never reaches it, and Tab order inside the surface is the browser's. In Chrome and Edge, Tab from the last focusable element moves to the browser UI (address bar, tabs), and the next Tab comes back to the first element; Shift+Tab works the same way in reverse. This is native `<dialog>` behavior, not a focus leak: it keeps the browser UI reachable, so the modal is not a keyboard trap. Headless components don't wrap Tab; add wrapping in your own component if your product needs it. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays).
