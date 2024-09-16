## Best practices

### Do

- **Create CSS rules outside of component lifecyles.**
  CSS rule creation involves iterating the entire theme and is relatively costly. Aim to create CSS rules only as needed, for example, during application boot prior to rendering any UI.

- **Prefer using `FluentProvider`.**
  `FluentProvider` generates CSS rules using `createCSSRuleFromTheme()` and should cover most cases. Only reach for `createCSSRuleFromTheme()` when
  `FluentProvider` cannot address your needs.
