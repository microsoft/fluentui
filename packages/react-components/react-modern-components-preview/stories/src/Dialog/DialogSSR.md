## Server-Side Rendering

Dialogs render inline as native `<dialog>` elements and work in a server-side rendering environment. The browser-only `showModal()`, `showPopover()`, and `close()` calls run after hydration.

When `unmountOnClose` is set to `false` (default value is `true`), Dialog keeps the closed `<dialog>` element in the DOM so its content state can be preserved.
