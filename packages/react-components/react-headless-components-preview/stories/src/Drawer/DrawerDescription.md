Headless Drawer provides supplementary content without built-in styles. Overlay drawers use native dialogs; inline drawers render in the page flow.

The overlay story uses exit keyframes with `unmountOnClose`. Focus restores immediately; removal waits for finite surface and backdrop motion. Display keyframes and discrete overlay transitions retain visibility during exit; reduced-motion styles disable motion.

Overlay NavDrawer shares this lifecycle. Inline drawers do not delay removal; the Inline story uses `unmountOnClose={false}` to animate while remaining mounted.

### Accessibility

Overlay drawers open as a modal native `<dialog>` with `showModal()`. The page behind is inert, so focus never reaches it, and Tab order inside the surface is the browser's. In Chrome and Edge, Tab from the last focusable element moves to the browser UI (address bar, tabs), and the next Tab comes back to the first element; Shift+Tab works the same way in reverse. This is native `<dialog>` behavior, not a focus leak: it keeps the browser UI reachable, so the modal is not a keyboard trap. Headless components don't wrap Tab; add wrapping in your own component if your product needs it. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays).
