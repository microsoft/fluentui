delayMode — how Stagger schedules per-item timing. Stagger picks a reasonable default; only override to change performance or compatibility.

Quick summary

- delayProp: Best when children are motion components that accept `delay`/`exitDelay` (native/browser timing, best performance).
- timing: JS-driven timing (setTimeout-based). Works for plain DOM or mixed content but is less performant.

When to override

- Use `delayProp` when all children support native delay props for smoother, browser-driven timing.
- Use `timing` when children are plain DOM nodes or you mix components that don't accept delay props.

Examples

```tsx
// best performance when using motion components
<Stagger visible={isVisible} itemDelay={80} delayMode="delayProp">...</Stagger>

// fallback for plain elements or mixed content
<Stagger visible={isVisible} itemDelay={80} delayMode="timing">...</Stagger>
```
