---
name: change
description: Create a beachball change file for the current changes. Determines change type (patch/minor) and generates a description from the diff.
disable-model-invocation: true
allowed-tools: Bash Read Grep Glob
---

# Create a Beachball Change File

Generate a change file for the current branch's modifications using the repo's beachball setup.

## Steps

1. **Determine the change type:**

   - `patch` — bug fixes, internal refactors, test-only changes
   - `minor` — new features, new exports, new component variants
   - `none` — changes that don't affect the published package (stories, docs, tests only)
   - Never use `major` without explicit user approval

2. **Generate a descriptive message** following the format: `fix(package-name): description` or `feat(package-name): description`

3. **Run the repo's change script** to create the change file:

   ```bash
   yarn change
   ```

   This runs `beachball change --no-commit` (configured in root `package.json`).
   Beachball automatically detects which packages need change files.

   For non-interactive usage with a specific type and message:

   ```bash
   yarn beachball change --no-commit --type <type> --message "<message>"
   ```

4. **Verify** the change file was created:

   ```bash
   yarn check:change
   ```

## Rules

- Always use `yarn change` or `yarn beachball change` — never manually create change files
- The message should describe the user-facing impact, not the implementation detail
