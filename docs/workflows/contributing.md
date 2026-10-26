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

## Dependabot Maintenance

Run [`/dependabot-fix`](../../.agents/skills/dependabot-fix/SKILL.md) from your developer machine:

```text
Inspect open PRs -> repair failing PRs locally -> validate -> push to existing branches
  -> verify final-head CI -> approve -> enable squash auto-merge
```

Use `/dependabot-fix --dry-run` to inspect without changes, or `--pr 123` to select a PR. The default batch handles minor/patch updates; majors require explicit PR selection. The skill uses isolated worktrees and existing authentication, preserves required checks and code-owner protections, and reports blockers. Enabling auto-merge may merge immediately if all requirements are satisfied.

There are no repair workflows, publisher services, or new credentials to configure. GitHub Actions retains separate routine minor/patch and major groups, with advisory-driven security updates separate.

The skill uses a dependency-free [local Node CLI](../../.agents/skills/dependabot-fix/scripts/dependabot.mjs) for `inspect`, `checkout`, `push`, and explicit `finalize --reviewed` operations. Repairs and final diff review remain agent-driven. Commands emit JSON; exit code `2` means blocked and `1` means an error. `inspect --pr <number> --expect-head <sha> --wait <seconds>` observes CI for a bounded period and refuses a changed head. All commands accept `--dry-run`; no command automatically diagnoses or rewrites code.

Run fixture-based CLI tests, including real local Git worktrees and a local bare remote, with `yarn nx run scripts-github:test-dependabot-skill`. Tests never push, approve, or merge real GitHub PRs.

### Testing before merge

The CLI runs from the feature branch; it does not need to exist on `master`. With Node and authenticated `gh` available, read-only inspection does not require installing repository dependencies:

```bash
CLI="$PWD/.agents/skills/dependabot-fix/scripts/dependabot.mjs"
node "$CLI" --help
node "$CLI" inspect --account YOUR_GITHUB_LOGIN
node "$CLI" inspect --pr PR_NUMBER --account YOUR_GITHUB_LOGIN
```

An exit code of `2` means the inspected PR has blockers; read its JSON output. API/authentication errors exit `1`. Inspection never creates worktrees or changes GitHub state.

To preview a mutation without executing it, use `checkout`, `push`, or `finalize` with `--dry-run` and the PR's current `--expect-head` SHA (and `--worktree` for `push`). Mutation dry-runs check identity but do not simulate a repair or guarantee CI readiness; use `inspect` and the fixture tests for those checks. Omit `--dry-run` only when intentionally publishing repairs or submitting a review/auto-merge request.

Keep the feature-branch checkout and its absolute `CLI` path available while testing real repairs in the separate returned worktree. The dependency PR's branch will not contain this unmerged CLI, and must not supply the trusted script.

## What NOT to Do

- Don't refactor unrelated code alongside a bug fix
- Don't modify public API without explicit approval
- Don't skip beachball change files for published packages
- Don't add dependencies between component packages (Tier 3 → Tier 3)
