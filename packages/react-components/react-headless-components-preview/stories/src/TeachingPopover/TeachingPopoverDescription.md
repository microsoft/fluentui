The headless `TeachingPopover` is built on top of the headless `Popover`. It adds a structured header / title / body / footer composition and an optional paged carousel — without styling. Bring your own CSS.

`TeachingPopover` re-uses the `@fluentui/react-teaching-popover` base hooks for its sub-components (`Header`, `Title`, `Footer`, `Carousel*`) and bridges the `@fluentui/react-popover` `PopoverContext` internally so dismiss buttons, finish handlers, and the carousel state machine all work transparently.

### Accessibility

With `trapFocus`, the teaching popover opens as a modal native `<dialog>` with `showModal()`. The page behind is inert, so focus never reaches it, and Tab order inside the surface is the browser's. In Chrome and Edge, Tab from the last focusable element moves to the browser UI (address bar, tabs), and the next Tab comes back to the first element; Shift+Tab works the same way in reverse. This is native `<dialog>` behavior, not a focus leak: it keeps the browser UI reachable, so the modal is not a keyboard trap. Headless components don't wrap Tab; add wrapping in your own component if your product needs it. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays).
