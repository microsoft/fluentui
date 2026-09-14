# Contributing Workflow

## Development Commands

```bash
# Setup
yarn                                      # Install dependencies
yarn clean                                # Clean build artifacts

# Development
yarn start                                # Interactive project selector
yarn nx run <project>:build                # Build specific project
yarn nx run <project>:start               # Start Storybook for component
yarn nx run <project>:test                # Run unit tests
yarn nx run <project>:test -u             # Update snapshots
yarn nx run <project>:lint                # Lint
yarn nx run <project>:type-check          # Type check
yarn nx run <project>:generate-api        # Update API docs

# Multi-project
yarn nx run-many -t build                 # Build multiple
yarn nx affected -t test                  # Test affected projects

# Component generation (v9 only)
yarn create-component                     # Interactive generator
```

## PR Checklist

1. **Change file** — Required for any published package change:

   ```bash
   yarn beachball change --type patch --message "fix(react-button): description"
   ```

   Use `patch` for fixes, `minor` for features. Never `major` without approval.

2. **Tests pass** — `yarn nx run <project>:test`

3. **Lint passes** — `yarn nx run <project>:lint`

4. **Types check** — `yarn nx run <project>:type-check`

5. **API docs updated** — If public API changed: `yarn nx run <project>:generate-api`

6. **Link issue** — Use `Fixes #<number>` in PR body

## Branch Naming

- Bug fixes: `fix/<issue>-<description>`
- Features: `feat/<issue>-<description>`
- Docs: `docs/<description>`

## What NOT to Do

- Don't refactor unrelated code alongside a bug fix
- Don't modify public API without explicit approval
- Don't skip beachball change files for published packages
- Don't add dependencies between component packages (Tier 3 → Tier 3)
