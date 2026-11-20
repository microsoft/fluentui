The headless `TeachingPopover` is built on top of the headless `Popover`. It adds a structured header / title / body / footer composition and an optional paged carousel — without styling. Bring your own CSS.

`TeachingPopover` re-uses the `@fluentui/react-teaching-popover` base hooks for its sub-components (`Header`, `Title`, `Footer`, `Carousel*`) and bridges the `@fluentui/react-popover` `PopoverContext` internally so dismiss buttons, finish handlers, and the carousel state machine all work transparently.

### Accessibility

With `inertTrapFocus` (off by default), the teaching popover opens as a native `<dialog>` with `showModal()`, so the page behind is inert and Tab order inside the surface is the browser's. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays) for how Tab and focus behave inside a modal surface.
