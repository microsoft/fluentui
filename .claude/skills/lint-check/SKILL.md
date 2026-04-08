---
name: lint-check
description: Run lint on affected packages, parse errors, and auto-fix common issues (design tokens, React.FC, SSR safety, import restrictions)
disable-model-invocation: true
argument-hint: "[package-name]"
allowed-tools: Bash Read Edit Grep Glob
---

# Lint Check and Auto-Fix

Run linting and fix common issues for Fluent UI packages.

## Steps

1. **Determine scope.** If `$ARGUMENTS` is provided, lint that specific package. Otherwise, lint affected packages:

   ```bash
   # Specific package
   npx nx run @fluentui/$ARGUMENTS:lint

   # Or affected packages
   npx nx affected -t lint
   ```

2. **Parse the output** and categorize errors by the custom Fluent UI ESLint rules:

   | Rule | What it catches | How to fix |
   |------|----------------|------------|
   | `@fluentui/ban-context-export` | Context exported from wrong layer | Move to `react-shared-contexts` package |
   | `@fluentui/ban-instanceof-html-element` | `instanceof HTMLElement` (breaks iframes) | Use element.tagName or feature detection |
   | `@fluentui/no-global-react` | `React.FC`, `React.useState` etc. | Use named imports: `import { useState } from 'react'` |
   | `@fluentui/no-restricted-imports` | Banned import paths | Use the allowed import path from the error message |
   | `@fluentui/no-context-default-value` | Context created without `undefined` default | Use `createContext(undefined)` and add a guard hook |

3. **Auto-fix** any issues found by editing the source files directly. For each fix:
   - Read the file
   - Apply the fix
   - Verify the fix by re-running lint on that specific file

4. **Report** a summary of what was found and fixed.

## References

- ESLint plugin source: `packages/eslint-plugin/src/rules/`
- Design tokens guide: [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md)
- Component patterns: [docs/architecture/component-patterns.md](docs/architecture/component-patterns.md)
