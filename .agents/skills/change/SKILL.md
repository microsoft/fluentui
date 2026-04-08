---
name: change
description: Create a beachball change file for the current changes. Determines change type (patch/minor) and generates a description from the diff.
disable-model-invocation: true
allowed-tools: Bash Read Grep Glob
---

# Create a Beachball Change File

Generate a change file for the current branch's modifications.

## Steps

1. **Identify changed packages** by running:
   ```!
   git diff --name-only HEAD~1
   ```

2. **Determine the change type:**
   - `patch` — bug fixes, internal refactors, test-only changes
   - `minor` — new features, new exports, new component variants
   - `none` — changes that don't affect the published package (stories, docs, tests only)
   - Never use `major` without explicit user approval

3. **Generate a descriptive message** following the format: `fix(package-name): description` or `feat(package-name): description`

4. **Run beachball** to create the change file:
   ```bash
   yarn beachball change --type <type> --message "<message>"
   ```

5. If multiple packages are affected, create separate change files for each.

## Rules

- Every published package change MUST have a change file
- Do not create change files for unpublished packages (stories packages, internal tools)
- Do not create change files for changes that only affect tests, stories, or docs within a package
- The message should describe the user-facing impact, not the implementation detail
