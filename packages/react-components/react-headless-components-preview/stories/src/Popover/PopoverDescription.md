A popover displays lightweight content anchored to a trigger element.

Popovers are used for transient UI that appears on user interaction, such as additional information, forms, or menus. They support click, hover, and context-menu triggers, and can render with an arrow pointing to the trigger.

### Accessibility

With `trapFocus`, the popover opens as a modal native `<dialog>` with `showModal()`. The page behind is inert, so focus never reaches it, and Tab order inside the surface is the browser's. In Chrome and Edge, Tab from the last focusable element moves to the browser UI (address bar, tabs), and the next Tab comes back to the first element; Shift+Tab works the same way in reverse. This is native `<dialog>` behavior, not a focus leak: it keeps the browser UI reachable, so the modal is not a keyboard trap. Headless components don't wrap Tab; add wrapping in your own component if your product needs it. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays).
