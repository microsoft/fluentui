A popover displays lightweight content anchored to a trigger element.

Popovers are used for transient UI that appears on user interaction, such as additional information, forms, or menus. They support click, hover, and context-menu triggers, and can render with an arrow pointing to the trigger.

### Accessibility

With `inertTrapFocus`, the popover opens as a native `<dialog>` with `showModal()`, so the page behind is inert and Tab order inside the surface is the browser's. See [Tab in modal overlays](?path=/docs/overview-accessibility-overlays--docs#tab-in-modal-overlays) for how Tab and focus behave inside a modal surface.
