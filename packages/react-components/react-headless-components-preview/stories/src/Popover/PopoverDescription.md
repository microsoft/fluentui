A popover displays lightweight content anchored to a trigger element.

Popovers are used for transient UI that appears on user interaction, such as additional information, forms, or menus. They support click, hover, and context-menu triggers, and can render with an arrow pointing to the trigger.

Non-modal popovers follow the browser's normal Tab order and do not close on focus exit by default. Set `closeOnFocusOutside` to close when focus leaves the trigger, surface, and their DOM, shadow, or Fluent virtual-parent descendants. Returning to the trigger keeps the popover open; closing preserves focus on the destination control. A hover or programmatic opening while focus is elsewhere waits for focus to enter this boundary before focus-exit dismissal applies. Window blur or an unknown destination alone does not dismiss. Arbitrary portals without a Fluent virtual-parent link are outside this boundary. This option has no effect when `trapFocus` is enabled.
