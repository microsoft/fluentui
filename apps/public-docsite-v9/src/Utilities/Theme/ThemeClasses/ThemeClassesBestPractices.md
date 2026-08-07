## Best practices

### Do

- **Prefer using `FluentProvider`.**
  Passing a theme class to `<FluentProvider themeClassName={...}>` also propagates the class to
  React portals (menus, dialogs, popovers), which a bare class on a DOM node does not. Reach for a
  raw theme class on an element only for leaf subtrees that do not open portals.

- **Author custom theme classes as custom-property declarations only.**
  A custom theme is a CSS class containing only custom-property declarations using the canonical
  kebab-case token names (`--color-brand-background`, …). Declare just the tokens you change —
  everything else falls through to the surrounding theme or the `:root` Web Light defaults.

- **Rely on the cascade for defaults.**
  The stylesheet emits the Web Light values at `:root, :host`, and all theme classes live in the
  `@layer fui.theme` cascade layer, so a theme class predictably overrides the defaults.
