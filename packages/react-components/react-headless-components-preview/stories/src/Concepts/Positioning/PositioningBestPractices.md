# Best practices

These examples are intended to document the `positioning` prop used in Fluent UI Headless Components; please refer to component-specific documentation for best practices for a specific component.

## Styling covering surfaces

The shared headless positioning hook adds `data-cover-target=""` to the actual positioned container when the resolved `coverTarget` option is `true`. The attribute is absent when the option is omitted or `false`. This applies to components using the shared hook, including `MenuPopover` and `PopoverSurface`, and to public hook/renderer compositions that preserve the positioning ref.

Use the presence of this attribute to distinguish covering surfaces from ordinary surfaces. `data-placement` describes placement and cannot distinguish the two modes: either mode can request the same placement.

Scope selectors to your own surface class, for example:

```css
.menuSurface:where(:not([data-cover-target])) {
  /* Ordinary-surface sizing rules belong here. */
}

.menuSurface:where([data-cover-target]) {
  /* Covering-surface sizing rules belong here. */
}
```

Covering surfaces use the target's center positioning area. Constraints intended for an ordinary surface's available area can therefore constrain a covering surface to the target's size instead. The attribute only exposes positioning state; headless does not apply menu height limits, scrolling rules, row dimensions, or theme styling.

`data-cover-target` is reserved for headless positioning, not a consumer-controlled prop. Do not set it yourself. Headless normalizes its presence and empty value when the container attaches and after the positioning owner commits, including when consumer attribute props change without changing positioning options. The marker is removed from a container when its positioning ref detaches or the positioning hook unmounts. Each independently positioned surface owns its own marker, including nested menus.
