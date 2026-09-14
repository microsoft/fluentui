# Package Dependency Layers

## Layer Hierarchy

Packages in this monorepo follow a layered dependency model.
Dependencies may only flow **downward** — never upward or sideways within the same tier.

```
┌─────────────────────────────────────┐
│  Tier 4: Barrel Package             │  @fluentui/react-components
│  (aggregates all v9 components)     │  (depends on all component packages)
├─────────────────────────────────────┤
│  Tier 3: Component Packages         │  @fluentui/react-button, react-dialog, etc.
│  (individual UI components)         │  (depend on utilities and theme)
├─────────────────────────────────────┤
│  Tier 2: Foundation Packages        │  @fluentui/react-utilities, react-theme,
│  (shared utilities, theme, context) │  react-shared-contexts, react-tabster,
│                                     │  react-positioning, react-portal
├─────────────────────────────────────┤
│  Tier 1: Core Packages              │  @griffel/react, @fluentui/tokens,
│  (tokens, CSS-in-JS engine)         │  @fluentui/react-jsx-runtime
└─────────────────────────────────────┘
```

## Rules

1. **Component packages (Tier 3) must NOT depend on other component packages.**
   If `react-button` needs something from `react-menu`, it should go through
   a shared context or utility in Tier 2.

2. **Foundation packages (Tier 2) must NOT depend on component packages (Tier 3).**

3. **Stories packages may depend on anything** — they are leaf nodes.

4. **Cross-cutting concerns** (contexts, portals, positioning) live in Tier 2
   and are shared through explicit imports, not peer dependencies.

## Nx Tags

Projects are tagged for identification:

| Tag              | Meaning                        |
| ---------------- | ------------------------------ |
| `vNext`          | v9 packages                    |
| `v8`             | v8 packages (maintenance only) |
| `platform:web`   | Browser-targeted               |
| `platform:node`  | Node.js-targeted               |
| `type:stories`   | Storybook story packages       |
| `web-components` | Web Components packages        |
| `charting`       | Charting packages              |
| `tools`          | Build tooling                  |
