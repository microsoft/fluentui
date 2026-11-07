Headless Drawer provides supplementary content without built-in styles. Overlay drawers use native dialogs; inline drawers render in the page flow.

The overlay story uses exit keyframes with `unmountOnClose`. Focus restores immediately; removal waits for finite surface and backdrop motion. Display keyframes and discrete overlay transitions retain visibility during exit; reduced-motion styles disable motion.

Overlay NavDrawer shares this lifecycle. Inline drawers do not delay removal; the Inline story uses `unmountOnClose={false}` to animate while remaining mounted.

### Accessibility

Overlay drawers with `modalType` `modal` (the default) or `alert` open as a native `<dialog>` with `showModal()`, so the page behind is inert and Tab order inside the surface is the browser's. With `modalType="non-modal"` they open with `showPopover()` and leave the page interactive. Inline drawers render in the page flow. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays) for how Tab and focus behave inside a modal surface.
