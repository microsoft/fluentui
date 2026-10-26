A popover displays lightweight content anchored to a trigger element.

Popovers are used for transient UI that appears on user interaction, such as additional information, forms, or menus. They support click, hover, and context-menu triggers, and can render with an arrow pointing to the trigger.

Non-modal popovers follow the browser's normal Tab order and automatically close when focus leaves the trigger, surface, and their DOM, shadow, or Fluent virtual-parent descendants. Returning to the trigger keeps the popover open; closing preserves focus on the destination control. No additional prop or consumer focus handler is required. A hover or programmatic opening while focus is elsewhere waits for focus to enter this boundary before focus-exit dismissal applies. Window blur or an unknown destination alone does not dismiss. Arbitrary portals without a Fluent virtual-parent link are outside this boundary. Modal popovers (`trapFocus`) retain native dialog focus trapping.

Hover-triggered content remains open while the pointer is over the trigger or surface branch, including owned Portal content, even after keyboard focus leaves. Opening from a focused trigger-owned shadow Portal establishes observation before the first Tab exit. A Popover hosted in a same-origin iframe also detects focus leaving for a parent-page control.

Same-origin iframe focus is observed directly. A 100 ms fallback runs only while a descendant frame holds focus to observe transitions unavailable across document boundaries. A complete inside/outside round trip within inaccessible cross-origin content between samples may not be observed.
