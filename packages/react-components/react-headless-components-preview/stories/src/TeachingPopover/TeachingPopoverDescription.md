The headless `TeachingPopover` is built on top of the headless `Popover`. It adds a structured header / title / body / footer composition and an optional paged carousel — without styling. Bring your own CSS.

`TeachingPopover` re-uses the `@fluentui/react-teaching-popover` base hooks for its sub-components (`Header`, `Title`, `Footer`, `Carousel*`) and bridges the `@fluentui/react-popover` `PopoverContext` internally so dismiss buttons, finish handlers, and the carousel state machine all work transparently.

### Paired carousel footer focus

When an accepted carousel update replaces a focused Previous button's content with `altText={null}` and your presentation hides or disables that now-empty action, the headless footer moves focus to its paired Next button. Next must be connected, visible, enabled, outside an inert subtree, and keyboard-focusable. Null alternate text alone does not hide the action or move focus; a visible alternative action keeps focus. Rejected controlled updates do not move focus, and delayed acceptance only transfers it if Previous still owns focus.

Moving focus elsewhere or explicitly blurring Previous while it is still available cancels the handoff. A browser may instead drop focus to the document body when the committed update hides Previous; that fallback may transfer to Next. Explicit blur after Previous is already hidden is indistinguishable from that native fallback and may also transfer. Concrete outside focus is never overridden.

Pairing is private to `useTeachingPopoverCarouselFooter`: it tracks the designated slots through their refs and observes committed empty, unavailable Previous content. A pending handoff survives transient Next ref detachment, but outside focus or Previous becoming available again cancels it.

Presentation adapters must preserve the effective footer root and slot refs and focus/blur handlers, plus the button hook's normalized root fields, when adding styling. Rebuilding slots from raw consumer props bypasses behavior. When replacing a slot component, update both its `elementType` and corresponding `state.components` entry. No extra provider, renderer arguments, or public API changes are required.

Carousel footer buttons default to `type="button"` rather than submitting surrounding forms; an explicit `type="submit"` is preserved. Anchor roots use button keyboard and disabled semantics. The paired handoff does not focus headings, announce pages, or change dismissal behavior.
