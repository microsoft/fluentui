# @fluentui/component-style-specs

Framework-agnostic **component style specifications** for Fluent UI components.

Each spec is plain JSON-shaped data (`ComponentStyleSpec`) describing slots, variants, states and
token-referencing style rules. Specs are consumed by `@fluentui/style-spec-compilers` to emit Griffel,
web-component CSS, or CSS Modules. They never contain selectors, class names or target-specific mapping.

## Package exports

| Entry                                     | Spec                                  |
| ----------------------------------------- | ------------------------------------- |
| `@fluentui/component-style-specs`         | All specs (`allSpecs`, named exports) |
| `@fluentui/component-style-specs/Badge`   | `BadgeSpec`                           |
| `@fluentui/component-style-specs/Button`  | `ButtonSpec`                          |
| `@fluentui/component-style-specs/Divider` | `DividerSpec`                         |

See `@fluentui/style-spec` for the schema, validation and normalization APIs, and the RFC at
`docs/react-v9/contributing/rfcs/shared/component-style-spec.md`.
