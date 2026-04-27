Three popovers nested as JSX descendants using `Popover` (manual mode). All
dismiss behaviour runs through React handlers — the browser is just a
top-layer painter for the surface, not a state authority.

**Behaviour:**

- **Open inner** — `useOnClickOutside` on each Popover treats clicks on its
  own `triggerRef` and `contentRef` as "inside". Because the inner trigger
  and surface are JSX descendants of the outer surface, opening the inner
  doesn't fire the outer's outside-click dismiss. Outers stay open.
- **Escape** — `PopoverSurface.onKeyDown` filters via
  `e.target.closest('[data-popover-surface]') === ownSurface`, so the
  Escape keydown event bubbles through every ancestor surface but only the
  innermost surface (the closest one) matches and closes. Outers stay open.
- **Click outside** — every popover's `useOnClickOutside` fires
  independently; the entire chain closes.
- **Open an unrelated peer** — manual popovers do **not** auto-dismiss each
  other. Two unrelated chains can be open at the same time.

## How this differs from `Nested` (auto mode)

| Aspect                | `Popover` (manual)                                   | `PopoverAuto` (auto)                                         |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| Source of truth       | React state                                          | React state mirrored from browser `toggle` events            |
| Light dismiss         | `useOnClickOutside`, `useOnScrollOutside`, React Esc | Browser-driven (Escape, click-outside, popover stack)        |
| Esc filter            | `closest('[data-popover-surface]') === self`         | Browser closes only the topmost popover in its stack         |
| Stack ancestry        | DOM nesting + React click/Escape filters             | DOM nesting (or `popovertarget` linkage) per HTML spec       |
| Multiple open peers   | ✅ Allowed — any number of unrelated popovers open   | ❌ Browser dismisses non-ancestor popovers when a peer opens |
| `popover` attribute   | `popover="manual"`                                   | `popover="auto"`                                             |
| Hover / context modes | Fully supported (`openOnHover`, `openOnContext`)     | Open paths still React-driven; close paths defer to browser  |
| Focus restoration     | None built in                                        | Browser restores focus to the invoker on dismiss             |
| Predictability        | Behaviour is whatever React handlers say             | Behaviour follows the HTML Popover spec across all browsers  |

**When to pick which:**

- Reach for `PopoverAuto` when the popover is a single, modal-ish surface and
  you want the browser's dismiss timing, focus restoration, and stack
  semantics for free.
- Reach for `Popover` when you need multiple unrelated popovers open at once,
  hover/context-driven open with custom dismiss timing
  (`mouseLeaveDelay`, `closeOnScroll`), or precise control over which event
  closes which surface.
