Headless Dialog provides native dialog behavior without built-in styles. Modal dialogs make the background inert; non-modal dialogs allow interaction with the page.

### Exit animations

Native close restores focus immediately. With `unmountOnClose` (the default), removal waits for running, finite surface and backdrop animations to finish or cancel—not descendant, infinite, or already-paused animations.

These stories style `[data-open]` and `:not([data-open])`. Exit keyframes retain `display` until the end; discrete `overlay` transitions retain the top layer. Keep their durations synchronized and honor reduced motion. Browser support varies; without active motion, removal is immediate.

Keep the surface rendered in React during exit. Use `unmountOnClose={false}` to preserve content state, as in Keep Mounted.

### Accessibility

Modal and alert dialogs open with `showModal()`. The page behind is inert, so focus never reaches it, and Tab order inside the surface is the browser's. In Chrome and Edge, Tab from the last focusable element moves to the browser UI (address bar, tabs), and the next Tab comes back to the first element; Shift+Tab works the same way in reverse. This is native `<dialog>` behavior, not a focus leak: it keeps the browser UI reachable, so the modal is not a keyboard trap. Headless components don't wrap Tab; add wrapping in your own component if your product needs it. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays).
