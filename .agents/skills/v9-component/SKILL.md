---
name: v9-component
description: Scaffold a new v9 component with all required files following Fluent UI patterns (hook, styles, render, types, tests, stories, conformance)
disable-model-invocation: true
argument-hint: <ComponentName>
allowed-tools: Read Write Bash Glob Grep
---

# Scaffold a V9 Component

Create a new v9 component named **$ARGUMENTS** using the repo's Nx generators.

## Steps

### Adding a component to an existing package

Use the `react-component` generator:

```bash
yarn nx g @fluentui/workspace-plugin:react-component --name $ARGUMENTS --project <project-name>
```

Where `<project-name>` is the Nx project (e.g., `react-button`). This generates all required files: component, types, hook, styles, render, index barrel, and conformance test.

### Creating a new package + component

Use the `react-library` generator first, then add the component:

```bash
# Create the package (will prompt for owner team)
yarn create-package

# Or non-interactively:
yarn nx g @fluentui/workspace-plugin:react-library --name <package-name> --owner "<team>"

# Then add the component inside it:
yarn nx g @fluentui/workspace-plugin:react-component --name $ARGUMENTS --project <package-name>
```

### After scaffolding

1. **Review generated files** against [docs/architecture/component-patterns.md](../../../docs/architecture/component-patterns.md) and fill in component-specific logic.

2. **Add styles** in a co-located `${ARGUMENTS}.module.css`, using token custom properties:

   ```css
   @reference '#theme';

   @layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;

   @layer fui.components.l1 {
     .root {
       @apply flex items-center;

       color: var(--colorNeutralForeground1);
     }
   }
   ```

   Then compose the class names in `use${ARGUMENTS}Styles.styles.ts`:

   ```tsx
   import { clsx } from 'clsx';
   import styles from './${ARGUMENTS}.module.css';
   ```

3. **Create a default story** at the appropriate stories package location if not generated.

4. **Update API docs** after adding exports:
   ```bash
   yarn nx run <project>:generate-api
   ```

## Critical Rules

- Always use `ForwardRefComponent` with `React.forwardRef` — never `React.FC`
- Always use design tokens — `var(--colorNeutralForeground1)` in CSS, the `tokens` object from
  `@fluentui/react-theme` in TS — never hardcoded colors/spacing/typography
- Always preserve user `className` as the LAST argument to `clsx()` (convention; the cascade layer,
  not the argument position, decides which rule wins)
- Styles hooks must **return** the composed state, never mutate the state they are handed
- Use `_unstable` suffix on exported hooks: `use$ARGUMENTS_unstable`, `use${ARGUMENTS}Styles_unstable`, `render${ARGUMENTS}_unstable`
- Guard any `window`/`document`/`navigator` access with `canUseDOM()` from `@fluentui/react-utilities`
- Do not add dependencies on other Tier 3 component packages (see [docs/architecture/layers.md](../../../docs/architecture/layers.md))

## Available Generators Reference

| Generator                         | Command                                                                | Purpose                                             |
| --------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------- |
| `react-component`                 | `yarn nx g @fluentui/workspace-plugin:react-component`                 | Add component to existing package                   |
| `react-library`                   | `yarn nx g @fluentui/workspace-plugin:react-library`                   | Create new v9 package                               |
| `recipe-generator`                | `yarn nx g @fluentui/workspace-plugin:recipe-generator`                | Create a v9 recipe                                  |
| `prepare-initial-release`         | `yarn nx g @fluentui/workspace-plugin:prepare-initial-release`         | Prepare package for release (compat/preview/stable) |
| `bundle-size-configuration`       | `yarn nx g @fluentui/workspace-plugin:bundle-size-configuration`       | Setup bundle-size tracking                          |
| `cypress-component-configuration` | `yarn nx g @fluentui/workspace-plugin:cypress-component-configuration` | Setup Cypress component tests                       |
