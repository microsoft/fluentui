---
name: v9-component
description: Scaffold a new v9 component with all required files following Fluent UI patterns (hook, styles, render, types, tests, stories, conformance)
disable-model-invocation: true
argument-hint: <ComponentName>
allowed-tools: Read Write Bash Glob Grep
---

# Scaffold a V9 Component

Create a new v9 component named **$ARGUMENTS** following the exact patterns in [docs/architecture/component-patterns.md](docs/architecture/component-patterns.md).

## Steps

1. **Determine the package path.** If creating inside an existing package, use that path. If creating a new package, the path is `packages/react-components/react-<lowercase-name>/library/src/`.

2. **Read an existing well-structured component** for reference. Good examples:

   - `packages/react-components/react-badge/library/src/components/Badge/`
   - `packages/react-components/react-tag/library/src/components/Tag/`
     Read at least the types, hook, styles, render, and main component files from one of these.

3. **Generate all required files** under `components/$ARGUMENTS/`:

   | File                              | Purpose                                                                                                    |
   | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
   | `$ARGUMENTS.tsx`                  | `ForwardRefComponent` with `React.forwardRef`. Never use `React.FC`.                                       |
   | `$ARGUMENTS.types.ts`             | Props, State, Slots types                                                                                  |
   | `use$ARGUMENTS.ts`                | State hook — processes props/slots into normalized state                                                   |
   | `use${ARGUMENTS}Styles.styles.ts` | Griffel styling with `makeStyles` using design tokens from `@fluentui/react-theme`. Never hardcode values. |
   | `render$ARGUMENTS.tsx`            | Pure JSX render using `assertSlots`                                                                        |
   | `$ARGUMENTS.test.tsx`             | Unit tests with React Testing Library                                                                      |
   | `index.ts`                        | Barrel export for the component                                                                            |

4. **Update barrel exports** — add the component to the package's root `index.ts`.

5. **Create conformance test** at `testing/isConformant.ts` if it doesn't exist.

6. **Create a default story** at the appropriate stories package location.

## Critical Rules

- Always use `ForwardRefComponent` with `React.forwardRef` — never `React.FC`
- Always use design tokens from `@fluentui/react-theme` — never hardcoded colors/spacing/typography
- Always preserve user `className` as the LAST argument in `mergeClasses()`
- Use `_unstable` suffix on exported hooks: `use$ARGUMENTS_unstable`, `use${ARGUMENTS}Styles_unstable`, `render${ARGUMENTS}_unstable`
- Guard any `window`/`document`/`navigator` access with `canUseDOM()` from `@fluentui/react-utilities`
- Do not add dependencies on other Tier 3 component packages (see [docs/architecture/layers.md](docs/architecture/layers.md))
