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

1. **Never hardcode colors, spacing, or typography values.** Always use design tokens — as
   `var(--colorNeutralForeground1)` in a `.module.css`, or the `tokens` object from
   `@fluentui/react-theme` in TS (it resolves to the same custom property). See
   [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md).
2. **Never use `React.FC`.** Always use `ForwardRefComponent` with `React.forwardRef`.
3. **Never access `window`, `document`, or `navigator` directly.** In v9 components, use `useFluent_unstable()` to get `targetDocument` and `targetDocument.defaultView` instead of `document`/`window`. For non-component code, use `canUseDOM()` from `@fluentui/react-utilities`.
4. **Never add dependencies between component packages.** `react-button` must not depend on `react-menu`. Shared logic goes in `react-utilities` or `react-shared-contexts`. See [docs/architecture/layers.md](docs/architecture/layers.md).
5. **Never skip beachball change files** for published package changes. Run `yarn beachball change`.

## V9 Component Template (the correct pattern)

```tsx
// ComponentName.tsx — always ForwardRefComponent, never React.FC
export const ComponentName: ForwardRefComponent<ComponentNameProps> = React.forwardRef((props, ref) => {
  let state = useComponentName_unstable(props, ref);

  // Styles hooks RETURN the composed state — they no longer mutate the argument.
  state = useComponentNameStyles_unstable(state);
  state = useCustomStyleHook_unstable('useComponentNameStyles_unstable')(state);

  return renderComponentName_unstable(state);
});
```

```css
/* ComponentName.module.css — Tailwind-flavored CSS Modules, co-located with the component */
@reference '#theme';

/* Repeated in every module: `@reference` emits nothing, so without this the layer ranking
   would be decided by whichever Fluent stylesheet happened to load first. */
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;

/* Library components author into `fui.components.l1`. `l2` is for a component styling
   another component's output; `l3`–`l5` belong to consumers and must stay empty here. */
@layer fui.components.l1 {
  .root {
    @apply flex items-center;

    /* Tokens are CSS custom properties — never hardcoded values. */
    color: var(--colorNeutralForeground1);
    padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  }
}
```

```tsx
// ComponentName.styles.ts — compose with clsx; consumer className LAST by convention
import { clsx } from 'clsx';
import styles from './ComponentName.module.css';

export const componentNameClassNames: { root: string } = {
  // The root's public identity class is the named group marker, not a BEM static.
  root: 'group/fui-component-name',
};

export const useComponentNameStyles_unstable = (state: ComponentNameState): ComponentNameState => ({
  ...state,
  root: {
    ...state.root,
    // Unconditional module class FIRST (the marker must never be classList[0]),
    // then the marker, then conditionals, then the consumer's className.
    className: clsx(styles.root, 'group/fui-component-name', state.root.className),
  },
});
```

Ordering note: `clsx` argument order carries **no** cascade meaning — it is a plain string join with
no merge or de-duplication. Which rule wins is decided by the `@layer` the rules live in. Put the
consumer's `className` last by convention, and record the winner in the module's layer assignment.

## Legacy Anti-Patterns (never copy these)

- **DO NOT copy patterns from `packages/react/` (v8).** That's maintenance-only legacy code using runtime styling, class components, and different APIs.
- **DO NOT use `@fluentui/react` imports for new v9 work.** Use `@fluentui/react-components`.
- **DO NOT use `mergeStyles` or `mergeStyleSets`.** Author a co-located `*.module.css` and reference
  token custom properties (`var(--colorNeutralForeground1)`).
- **DO NOT use `makeStyles`, `makeResetStyles`, `mergeClasses`, `shorthands` or `GriffelStyle` in
  library code.** Those symbols are still re-exported from `@fluentui/react-components` so existing
  consumer apps keep compiling, but the library no longer authors styles with them. New library
  styles are CSS Modules; class names are composed with `clsx`.
- **DO NOT mutate `state` in a styles hook.** Return a new state object (`react-hooks/immutability`
  enforces this).
- **DO NOT hand-write a selector for a `group/fui-*` marker.** The `/` is legal in a class _token_
  but terminates the name in a _selector_, so use `fuiSelector(xClassNames.root)`.
- **DO NOT select a component's internal classes.** They are hashed CSS-Module identifiers
  (`fuicm-…`) and are not public API — use the slot `className` props.
- **DO NOT use `initializeIcons()`.** V9 uses `@fluentui/react-icons` with tree-shaking.

## Exploration Guidance

- `packages/react-components/` has 74+ packages — search by specific component name, never read the full directory.
- Use `yarn nx show project <project-name>` to understand a project's structure.
- Map package names to paths: `@fluentui/react-<name>` → `packages/react-components/react-<name>/library/src/`.

## Architecture (deep dives)

| Topic                                             | Location                                                                           |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| V9 component patterns (hooks, slots, CSS Modules) | [docs/architecture/component-patterns.md](docs/architecture/component-patterns.md) |
| Design tokens and theming                         | [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md)           |
| Package dependency layers                         | [docs/architecture/layers.md](docs/architecture/layers.md)                         |

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

## Skills (Slash Commands)

| Skill                | Command                    | Purpose                                                                   |
| -------------------- | -------------------------- | ------------------------------------------------------------------------- |
| `v9-component`       | `/v9-component Name`       | Scaffold a new v9 component with all required files                       |
| `headless-component` | `/headless-component Name` | Author an unstyled v9 primitive with state attributes, tests, and stories |
| `change`             | `/change`                  | Create beachball change file from current diff                            |
| `lint-check`         | `/lint-check [pkg]`        | Run lint, parse errors, and auto-fix common issues                        |
| `token-lookup`       | `/token-lookup val`        | Find the design token for a hardcoded CSS value                           |
| `package-info`       | `/package-info pkg`        | Quick lookup: path, deps, owner, tests, structure                         |
| `visual-test`        | `/visual-test Name`        | Visually verify a component via Storybook + playwright-cli                |
| `review-pr`          | `/review-pr #123`          | Review a PR with confidence scoring and category checks                   |
| `triage-issues`      | `/triage-issues`           | Walk the Needs-Triage queue and recommend labels/assignee                 |
| `dependabot-rollup`  | `/dependabot-rollup`       | Dry-run and optionally roll up at most 11 Dependabot patch/minor PRs      |

## Package Layout

| Area           | Path                         | Status             |
| -------------- | ---------------------------- | ------------------ |
| V9 components  | `packages/react-components/` | Active development |
| V8 components  | `packages/react/`            | Maintenance only   |
| Web Components | `packages/web-components/`   | Active             |
| Charting       | `packages/charts/`           | Active             |
| Build tooling  | `tools/`                     | Active             |
| ESLint plugin  | `packages/eslint-plugin/`    | Active             |
