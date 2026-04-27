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

`PopoverAuto` defers dismiss to the browser via `popover="auto"`, so Escape,
click-outside, and the popover-stack peer-dismissal happen at HTML-spec
timing and focus is restored to the invoker for free. The trade-off is
that the browser only allows one root chain open at a time — opening an
unrelated peer dismisses the existing root.

Use `PopoverAuto` when you want native, single-root behaviour. Use
`Popover` when you need multiple unrelated popovers open simultaneously
or hover/context-driven open with custom dismiss timing.
