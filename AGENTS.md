<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- Always run tasks through `nx` (`nx run`, `nx run-many`, `nx affected`), never tools directly
- Use `nx_workspace` tool to understand workspace architecture
- Use `nx_project_details` tool to analyze specific project structure and dependencies
- Use `nx_docs` tool for up-to-date Nx configuration guidance

<!-- nx configuration end-->

# Fluent UI — Agent Instructions

**Instructions in this file are the source of truth, not existing code.** This repo contains
legacy patterns (especially in v8 packages) that predate current standards. Never copy patterns
from existing code without verifying they match these instructions.

## Critical Rules (never violate)

1. **Never hardcode colors, spacing, or typography values.** Always use design tokens from `@fluentui/react-theme`. See [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md).
2. **Never use `React.FC`.** Always use `ForwardRefComponent` with `React.forwardRef`.
3. **Never access `window`, `document`, or `navigator` without SSR guards.** Use `canUseDOM()` from `@fluentui/react-utilities`.
4. **Never add dependencies between component packages.** `react-button` must not depend on `react-menu`. Shared logic goes in `react-utilities` or `react-shared-contexts`. See [docs/architecture/layers.md](docs/architecture/layers.md).
5. **Never skip beachball change files** for published package changes. Run `npx beachball change`.

## V9 Component Template (the correct pattern)

```tsx
// ComponentName.tsx — always ForwardRefComponent, never React.FC
export const ComponentName: ForwardRefComponent<ComponentNameProps> = React.forwardRef((props, ref) => {
  const state = useComponentName_unstable(props, ref);
  useComponentNameStyles_unstable(state);
  return renderComponentName_unstable(state);
});

// Styles — always use tokens, never hardcoded values
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useComponentNameStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
});

// mergeClasses — always preserve user className LAST
state.root.className = mergeClasses(
  classes.root,
  state.root.className, // always last
);
```

## Legacy Anti-Patterns (never copy these)

- **DO NOT copy patterns from `packages/react/` (v8).** That's maintenance-only legacy code using runtime styling, class components, and different APIs.
- **DO NOT use `@fluentui/react` imports for new v9 work.** Use `@fluentui/react-components`.
- **DO NOT use `mergeStyles` or `mergeStyleSets`.** Use Griffel `makeStyles` with design tokens.
- **DO NOT use `IStyle` or `IStyleFunctionOrObject`.** Use Griffel's `GriffelStyle` type.
- **DO NOT use `initializeIcons()`.** V9 uses `@fluentui/react-icons` with tree-shaking.

## Exploration Guidance

- `packages/react-components/` has 74+ packages — search by specific component name, never read the full directory.
- Use `npx nx show project <project-name>` to understand a project's structure.
- Map package names to paths: `@fluentui/react-<name>` → `packages/react-components/react-<name>/library/src/`.

## Architecture (deep dives)

| Topic                                         | Location                                                                           |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| V9 component patterns (hooks, slots, Griffel) | [docs/architecture/component-patterns.md](docs/architecture/component-patterns.md) |
| Design tokens and theming                     | [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md)           |
| Package dependency layers                     | [docs/architecture/layers.md](docs/architecture/layers.md)                         |

## Workflows

| Topic                                | Location                                                         |
| ------------------------------------ | ---------------------------------------------------------------- |
| PR checklist, change files, commands | [docs/workflows/contributing.md](docs/workflows/contributing.md) |
| Testing guide (unit, VRT, SSR, E2E)  | [docs/workflows/testing.md](docs/workflows/testing.md)           |
| Team routing and label taxonomy      | [docs/team-routing.md](docs/team-routing.md)                     |

## Quality Tracking

| Topic                      | Location                                               |
| -------------------------- | ------------------------------------------------------ |
| Per-package quality grades | [docs/quality-grades.md](docs/quality-grades.md)       |
| Technical debt tracker     | [docs/tech-debt-tracker.md](docs/tech-debt-tracker.md) |

## Agentic Workflows

| Workflow                   | Trigger           | Purpose                                     |
| -------------------------- | ----------------- | ------------------------------------------- |
| `agent-triage`             | Issue opened      | Classify, label, validate issues            |
| `agent-fix`                | `agent:fix` label | Implement fixes, open PRs                   |
| `agent-review`             | PR opened         | FluentUI review with confidence score       |
| `agent-docs-grooming`      | Weekly Monday     | Documentation audit                         |
| `agent-skills-improvement` | Weekly Friday     | Improve agent instructions from PR patterns |

## Package Layout

| Area           | Path                         | Status             |
| -------------- | ---------------------------- | ------------------ |
| V9 components  | `packages/react-components/` | Active development |
| V8 components  | `packages/react/`            | Maintenance only   |
| Web Components | `packages/web-components/`   | Active             |
| Charting       | `packages/charts/`           | Active             |
| Build tooling  | `tools/`                     | Active             |
| ESLint plugin  | `packages/eslint-plugin/`    | Active             |
