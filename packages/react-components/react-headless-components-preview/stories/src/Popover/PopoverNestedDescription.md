Three popovers nested as JSX descendants. Because every Popover renders its
surface with `popover="auto"`, the browser's popover-stack semantics keep
ancestors open while a descendant is open and dismiss the entire chain on
light-dismiss interactions.

**Behaviour:**

- **Open inner** — outer surfaces stay open. The inner trigger is a DOM
  descendant of the outer surface, so the browser places the inner popover
  on top of the outer one in the popover stack.
- **Escape** — closes only the topmost popover. Each press unwinds the
  stack one level.
- **Click outside** — closes the entire chain at once.
- **Open an unrelated peer** — the browser's auto-popover stack dismisses
  any current root popover; opening a sibling chain replaces it.
