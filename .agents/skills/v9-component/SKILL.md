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

2. **Add styles** in `use${ARGUMENTS}Styles.styles.ts` using design tokens:

   ```tsx
   import { makeStyles } from '@griffel/react';
   import { tokens } from '@fluentui/react-theme';
   ```

3. **Create a default story** at the appropriate stories package location if not generated.

4. **Update API docs** after adding exports:
   ```bash
   yarn nx run <project>:generate-api
   ```

## Critical Rules

- Always use `ForwardRefComponent` with `React.forwardRef` — never `React.FC`
- Always use design tokens from `@fluentui/react-theme` — never hardcoded colors/spacing/typography
- Always preserve user `className` as the LAST argument in `mergeClasses()`
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
