# Contributing Workflow

## Development Commands

Use Node.js 22.18 or newer in the 22.x line, or Node.js 24.x. Nx 23 requires at least
22.12, and the existing `@microsoft/fast-build` dependency requires at least 22.18.

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

### Nx tooling

Pass Jest-specific flags after `--`, for example:

```bash
yarn nx run workspace-plugin:test --skipNxCache --output-style=static -- --runInBand --no-cache
```

The workspace-plugin test target enables Node's VM modules for Nx's dynamic formatter imports.
The root Jest configuration explicitly includes workspace-plugin because Nx cannot discover its
Node-based Jest command. To run this suite through root Jest with VM modules enabled:

```bash
yarn nx exec --projects=fluentui-repo --excludeTaskDependencies -- node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config=./jest.config.ts --selectProjects=workspace-plugin --runInBand
```

Generator test trees explicitly select Prettier to match this repository rather than Nx's default formatter.
The workspace compiler is TypeScript 5.8.3 because Nx 23's JavaScript generators require at least 5.8.
Generator compatibility tests must include the workspace's TypeScript dependency, not just an empty tree.
Nx tree traversal returns POSIX paths on every platform; compare those paths with forward-slash segments,
not platform-native `path.normalize()` results.
Keep lint commands and working directories in the workspace plugin; a conflicting command in
`nx.json` target defaults replaces the inferred target in Nx 23.

The Nx 23 migration plan keeps only the applicable generated-output ignore and CreateNodes type
migrations. The earlier deferred entries remain in `migrations.todo.json`. The other generated
migrations were no-ops for this workspace: release tags and executor cache settings were already
current; flat ESLint configuration and snapshot headers were already migrated; removed ESLint rules,
pnpm outputs and obsolete Jest options were absent. The ts-jest solution-setup migration does not
apply to this workspace's non-solution TypeScript configuration. The TypeScript 5.8 update is required
for generator compatibility; no optional Jest, SWC, or formatter upgrades were applied.

After the initial non-agentic upgrade, Nx's agentic handoff flow was run separately with Copilot
processing the official flat-config, ban-types, and ts-jest verification prompts. Flat-config
verification passed lint across all 258 lint-enabled projects without changing rules; ban-types
was absent and the ts-jest solution-setup migration was inapplicable. The helpers made no source
changes. Their final affected validation selected no projects against the supplemental run's
starting commit, so it adds no build or unit-test coverage for the original upgrade.

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
