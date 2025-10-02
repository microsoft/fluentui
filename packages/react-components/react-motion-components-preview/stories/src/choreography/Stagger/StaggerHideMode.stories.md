hideMode — how Stagger shows/hides children. Stagger auto-selects a sensible default; override only when you need different layout or animation behavior.

Quick summary

- visibleProp: Best for motion components that accept a visible prop (preserves mount + layout, uses component animations).
- visibilityStyle: Keeps elements mounted but toggles CSS visibility (preserves layout, minimal visual change).
- unmount: Mounts/unmounts children (causes layout reflow, useful for one-way lists).

When to override

- Choose `unmount` when items must affect layout on enter/exit.
- Choose `visibilityStyle` when you need stable layout without remounts.
- Choose `visibleProp` for custom motion components that can animate via a visible prop.

Examples

```tsx
// layout reflow
<Stagger visible={isVisible} hideMode="unmount">...</Stagger>

// stable layout
<Stagger.In hideMode="visibilityStyle">...</Stagger.In>

// use component-level visibility
<Stagger hideMode="visibleProp">...</Stagger>
```
