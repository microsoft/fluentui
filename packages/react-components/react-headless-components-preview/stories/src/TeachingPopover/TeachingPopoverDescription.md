The headless `TeachingPopover` is built on top of the headless `Popover`. It adds a structured header / title / body / footer composition and an optional paged carousel — without styling. Bring your own CSS.

`TeachingPopover` re-uses the `@fluentui/react-teaching-popover` base hooks for its sub-components (`Header`, `Title`, `Footer`, `Carousel*`) and bridges the `@fluentui/react-popover` `PopoverContext` internally so dismiss buttons, finish handlers, and the carousel state machine all work transparently.

When closing removes the focused surface and leaves focus on the document body, `TeachingPopover` restores focus to its trigger, including for initially open controlled tours. Native focus restoration and intentional focus movement to another element take precedence.
