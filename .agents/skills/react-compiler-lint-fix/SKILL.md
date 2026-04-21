---
name: react-compiler-lint-fix
description: Fix react-compiler / react-hooks eslint errors in a v9 package by adding inline disable comments and 'use no memo' directives
argument-hint: <package-name>
allowed-tools: Bash Read Edit Grep Glob
---

# React Compiler Lint Fix

Fix `react-hooks/immutability` (and related react-compiler) lint errors for the package **$ARGUMENTS** by adding targeted inline disable comments.

## Rules

- **Only inline `// eslint-disable-next-line <rule>` comments** — never file-level or module-level `/* eslint-disable */`.
- **Every function that receives an inline disable MUST have `'use no memo'`** as its first statement. If the directive is missing, add it.
- **Emit the directive verbatim as `'use no memo';`** — single-quoted string statement, no parentheses. Never write `('use no memo')`.
- Only hooks/functions whose name starts with `use` are eligible for `'use no memo'`.
- Preserve any existing eslint-disable comments on the same line (combine rules with comma separation).
- If a lint error is NOT inside a `use no memo` function, flag it as a **violation** in the final report instead of adding a disable comment.

## Steps

1. **Run lint** to discover all react-compiler related errors:

   ```bash
   yarn nx run $ARGUMENTS:lint 2>&1
   ```

   Parse the output to collect:

   - File path
   - Line number and column
   - ESLint rule name (e.g. `react-hooks/immutability`, `react-hooks/rules-of-hooks`)
   - Error message

2. **For each affected file**, read the file and locate each error line.

3. **Check the enclosing function** of each error line:

   - Does it already have `'use no memo'` as its first statement?
   - If **yes** → add `// eslint-disable-next-line <rule>` on the line above the error.
   - If **no** and the function name starts with `use` → add `'use no memo';` as the first statement, then add the inline disable.
   - If the function does NOT start with `use` → **do not add disable**, flag as a violation.

4. **When adding the inline disable comment**:

   - If the line above already has an `eslint-disable-next-line` comment, append the new rule to it (comma-separated).
   - Otherwise, add a new `// eslint-disable-next-line <rule>` line with the same indentation as the error line.

5. **Re-run lint** to verify all errors are resolved:

   ```bash
   yarn nx run $ARGUMENTS:lint 2>&1
   ```

   If errors remain, repeat from Step 2 for the remaining issues.

6. **Audit and report** in this format:

   ```
   ## react-compiler lint fix: @fluentui/<package>

   **Files modified:**

   | File | Function | `'use no memo'` | Inline disables (count) |
   |------|----------|:---:|:---:|
   | path/to/file.ts | useFooStyles_unstable | Added / Already present | N |

   **Violations** (errors NOT in a `use no memo` function):
   - <file>:<line> — <rule> in function `<name>` (not a hook, cannot add 'use no memo')

   **Verification:** `yarn nx run <project>:lint` → ✅ pass / ❌ fail
   ```

## References

- React compiler docs: https://react.dev/learn/react-compiler
- Griffel styling hooks follow the `use*Styles_unstable` naming pattern
- Component patterns: [docs/architecture/component-patterns.md](../../../docs/architecture/component-patterns.md)
