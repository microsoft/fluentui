# @fluentui/style-spec

Framework-agnostic, JSON-shaped **component style specification** for Fluent UI.

A spec describes a component's styles purely as data: slots, variant axes, boolean states, conditions and
token-referencing CSS declarations. It never contains selectors, class names, attribute names or any other
target-specific information — those live in the compiler adapters (`@fluentui/style-spec-compilers`).

See the RFC: `docs/react-v9/contributing/rfcs/shared/component-style-spec.md`.

## Authoring

Specs are plain object literals (or `.json` files) typed as `ComponentStyleSpec`:

```ts
import type { ComponentStyleSpec } from '@fluentui/style-spec';

export const BadgeSpec: ComponentStyleSpec = {
  $schema: 'https://fluentui.dev/schemas/component-style-spec/v1.json',
  name: 'Badge',
  version: 1,
  slots: ['root', 'icon'],
  variants: {
    appearance: { values: ['filled', 'ghost', 'outline', 'tint'], default: 'filled' },
  },
  rules: [
    { slot: 'root', declarations: { display: 'inline-flex', color: { token: 'colorNeutralForeground1' } } },
    { slot: 'root', when: { variants: { appearance: 'outline' } }, declarations: { borderColor: 'currentColor' } },
  ],
};
```

Values are `string | number | { token } | { var, fallback? } | { concat: [...] }`. No helper functions:
every spec round-trips through `JSON.stringify`/`JSON.parse` and validates against
`src/schema/component-style-spec.schema.json`.

## API

- `validateSpec(input)` / `assertValidSpec(input)`
- `normalizeSpec(spec)` — canonical intermediate representation
- `groupRules(rules)` — groups IR rules by slot + variants + states
