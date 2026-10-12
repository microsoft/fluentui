A popover displays lightweight content anchored to a trigger element.

Popovers are used for transient UI that appears on user interaction, such as additional information, forms, or menus. They support click, hover, and context-menu triggers, and can render with an arrow pointing to the trigger.

On close, the surface remains connected until the native `hidePopover()` or `close()` operation completes, so browser focus restoration can run before unmounting. If surface-owned focus would otherwise be lost (for example, an initially open popover with no native trigger snapshot), focus returns to its connected trigger. Successful native restoration and intentional focus movement outside the surface take precedence; closing a surface that never owned focus does not focus the trigger.
