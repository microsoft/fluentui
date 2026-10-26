# Best practices

These examples are intended to document the `positioning` prop used in Fluent UI Headless Components; please refer to component-specific documentation for best practices for a specific component.

## Available-space sizing

Headless `Menu` defaults to `positioning.autoSize: 'height'`. Ordinary menus are constrained to the space available among their permitted placements, and `MenuPopover` supplies `overflow-y: auto`. Keyboard navigation can therefore reveal long-menu items by scrolling inside the surface instead of leaving focus outside the viewport. Styled consumers inherit this behavior through the public hooks and renderers; no consumer-side sizing rule or positioning adapter is required.

The size cap accounts for viewport dimensions, target geometry, offset margins, surface padding and borders. It is refreshed when positioning options, targets, viewport size, or observed element sizes change. Shrinking the available height also reveals a retained focused item by adjusting the surface's scroll position, without scrolling the surrounding page.

The cap considers the requested placement and permitted fallbacks rather than shrinking immediately to the requested side. This preserves native fallback selection when, for example, a long menu has little room below its trigger but sufficient room above. `pinned` restricts the cap to the requested placement; explicit fallback positions retain their order.

Covering surfaces remain content-sized: their target's center area is not used as a menu-height limit. Each surface receives its own constraint, so covering submenus do not inherit an ordinary parent's maximum.

Use `positioning={{ autoSize: false }}` to opt out. `MenuPopover` spreads consumer inline styles after its defaults, so explicit `maxHeight`, `maxWidth`, and `overflowY` remain available as overrides. When automatic sizing is disabled, existing stylesheet maximum sizes remain in effect.

Other shared positioned surfaces opt in through `autoSize`. The canonical `'height'`, `'width'`, `true` and legacy `*-always` values select the constrained axes. Their hooks supply overridable size styles; only Menu adds scrolling by default. The underlying available-size custom properties are internal implementation details, not a consumer state-transport API.

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

Covering surfaces use the target's center positioning area. Constraints intended for an ordinary surface's available area can therefore constrain a covering surface to the target's size instead. Headless Menu already handles its height constraints and scrolling; this attribute is available for additional consumer styling, not required to obtain that behavior. Row dimensions and theme styling remain the styled consumer's responsibility.

`data-cover-target` is reserved for headless positioning, not a consumer-controlled prop. Do not set it yourself. Headless normalizes its presence and empty value when the container attaches and after the positioning owner commits, including when consumer attribute props change without changing positioning options. The marker is removed from a container when its positioning ref detaches or the positioning hook unmounts. Each independently positioned surface owns its own marker, including nested menus.
