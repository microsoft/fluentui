Headless Dialog provides native dialog behavior without built-in styles. Modal dialogs make the background inert; non-modal dialogs allow interaction with the page.

### Exit animations

Native close restores focus immediately. With `unmountOnClose` (the default), removal waits for running, finite surface and backdrop animations to finish or cancel—not descendant, infinite, or already-paused animations.

These stories style `[data-open]` and `:not([data-open])`. Exit keyframes retain `display` until the end; discrete `overlay` transitions retain the top layer. Keep their durations synchronized and honor reduced motion. Browser support varies; without active motion, removal is immediate.

Keep the surface rendered in React during exit. Use `unmountOnClose={false}` to preserve content state, as in Keep Mounted.

### Accessibility

Modal and alert dialogs open as a native `<dialog>` with `showModal()`, so the page behind is inert and Tab order inside the surface is the browser's. Non-modal dialogs open with `showPopover()` and leave the page interactive. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays) for how Tab and focus behave inside a modal surface.
