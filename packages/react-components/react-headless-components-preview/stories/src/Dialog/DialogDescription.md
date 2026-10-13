Headless Dialog provides native dialog behavior without built-in styles. Modal dialogs make the background inert; non-modal dialogs allow interaction with the page.

When composing a modal dialog with a legacy portaled overlay, such as the v9 `Popover`, set the overlay's `mountNode` to the `DialogSurface` element. Portaling to the document body places the overlay outside the native modal's non-inert subtree, preventing interaction with it.

### Exit animations

Native close restores focus immediately. With `unmountOnClose` (the default), removal waits for running, finite surface and backdrop animations to finish or cancel—not descendant, infinite, or already-paused animations.

These stories style `[data-open]` and `:not([data-open])`. Exit keyframes retain `display` until the end; discrete `overlay` transitions retain the top layer. Keep their durations synchronized and honor reduced motion. Browser support varies; without active motion, removal is immediate.

Keep the surface rendered in React during exit. Use `unmountOnClose={false}` to preserve content state, as in Keep Mounted.
