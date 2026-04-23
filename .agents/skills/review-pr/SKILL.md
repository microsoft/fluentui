---
name: review-pr
description: Review a PR for correctness, pattern compliance, testing, accessibility, and safety. Produces a confidence score for merge readiness.
argument-hint: <PR-number-or-branch>
allowed-tools: Bash Read Grep Glob
---

# Review a Pull Request

Review PR **$ARGUMENTS** and produce a confidence score for merge readiness.

## Phase 1: Gather PR Context

```bash
# PR metadata
gh pr view $ARGUMENTS --json title,body,author,labels,files,additions,deletions,baseRefName,headRefName,state,isDraft,number

# Changed files list
gh pr diff $ARGUMENTS --name-only

# Full diff
gh pr diff $ARGUMENTS

# CI status
gh pr checks $ARGUMENTS
```

## Phase 2: Classify PR Type

Determine the PR type from changed files and metadata:

| Type             | Detection                                                            | Check scope                                    |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------- |
| **docs-only**    | All files are `*.md`, `docs/**`, `**/stories/**`, `**/.storybook/**` | Change file only                               |
| **test-only**    | All files are `*.test.*`, `*.spec.*`, `**/testing/**`                | Change file + test quality                     |
| **bug-fix**      | Branch starts with `fix/` or title contains "fix"                    | All checks, extra weight on tests              |
| **feature**      | Branch starts with `feat/` or adds new exports                       | All checks, extra weight on API + patterns     |
| **refactor**     | No new exports, restructures existing code                           | All checks, extra weight on no behavior change |
| **config/infra** | Changes to CI, configs, scripts only                                 | Change file + no regressions                   |

For **v8 packages** (`packages/react/`): skip V9 pattern checks — those are maintenance-only with different patterns.
For **web-components** (`packages/web-components/`): skip React-specific checks.

## Phase 3: Run Checks

Run each check category. For each finding, assign a severity:

- **BLOCKER** — must fix before merge
- **WARNING** — should address
- **INFO** — consider

### A. Beachball Change File

Required if any published package source code changed (not just tests/stories/docs).

- Check `change/` directory in the diff for new `.json` files
- Verify change type: `patch` for fixes, `minor` for features, never `major` without explicit approval
- Not required for changes that only affect tests, stories, docs, or snapshots

**BLOCKER** if missing for published source changes.

### B. V9 Component Pattern Compliance

Only for files in `packages/react-components/react-*/library/src/`:

| Check               | Look for                                                                                            | Severity |
| ------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| No `React.FC`       | `React.FC`, `: FC<`, `React.FunctionComponent` in added lines                                       | BLOCKER  |
| No hardcoded styles | Hex colors `#[0-9a-fA-F]{3,8}`, hardcoded `px` values for spacing/radius/font in `.styles.ts` files | WARNING  |
| Griffel usage       | Style files must use `makeStyles` from `@griffel/react`, not inline styles                          | WARNING  |
| mergeClasses order  | User `className` must be the LAST argument in `mergeClasses()`                                      | WARNING  |
| Slot system         | New components must use `slot.always`/`slot.optional` and `assertSlots`                             | WARNING  |

Reference: [docs/architecture/component-patterns.md](../../../docs/architecture/component-patterns.md)

### C. Dependency Layer Violations

For changes to `package.json` files or new imports in Tier 3 component packages:

- **BLOCKER** if a Tier 3 package (`react-button`, `react-menu`, etc.) adds a dependency on another Tier 3 package
- Allowed Tier 2 deps: `react-utilities`, `react-theme`, `react-shared-contexts`, `react-tabster`, `react-positioning`, `react-portal`
- Allowed Tier 1 deps: `@griffel/react`, `@fluentui/tokens`, `@fluentui/react-jsx-runtime`

Reference: [docs/architecture/layers.md](../../../docs/architecture/layers.md)

### D. SSR Safety

Grep added lines for unguarded browser API access:

| Pattern                                                       | Severity |
| ------------------------------------------------------------- | -------- |
| `window.` without `canUseDOM` or `typeof window` guard nearby | BLOCKER  |
| `document.` without guard                                     | BLOCKER  |
| `navigator.` without guard                                    | BLOCKER  |
| `localStorage` / `sessionStorage` without guard               | BLOCKER  |
| `instanceof HTMLElement`                                      | WARNING  |

Check 3 lines above each match for a guard (`canUseDOM`, `typeof window !== 'undefined'`).

### E. Testing

| Check                                                                       | Severity |
| --------------------------------------------------------------------------- | -------- |
| Source files changed but no corresponding `.test.tsx` changes               | WARNING  |
| New component missing `testing/isConformant.ts`                             | WARNING  |
| Snapshot files need updating (render/style changes without `.snap` updates) | INFO     |

### F. API Surface

| Check                                             | Severity |
| ------------------------------------------------- | -------- |
| Public API changed but `etc/*.api.md` not updated | WARNING  |
| Existing exports removed (breaking change)        | BLOCKER  |
| New exports added (flag for human review)         | INFO     |

### G. Accessibility

| Check                                              | Severity |
| -------------------------------------------------- | -------- |
| Existing `aria-*` attributes removed               | BLOCKER  |
| `onClick` without `onKeyDown`/`onKeyUp` handler    | WARNING  |
| Interactive elements missing `role` or `aria-*`    | WARNING  |
| Images/icons without `aria-label` or `aria-hidden` | WARNING  |

### H. Security and Quality

| Check                                         | Severity |
| --------------------------------------------- | -------- |
| `eval()` or `new Function()`                  | BLOCKER  |
| `dangerouslySetInnerHTML`                     | WARNING  |
| `console.log` / `debugger` in production code | WARNING  |
| `// @ts-ignore` without explanation           | WARNING  |
| `any` type in new code                        | INFO     |

## Phase 4: Calculate Confidence Score

```
Start at 100

For each BLOCKER:  -25 points
For each WARNING:  -5 points
For each INFO:     -1 point

Bonuses:
  +5 if tests added/updated alongside source changes
  +3 if change file present and well-described
  +2 if PR description is thorough

Floor at 0, cap at 100.
```

Score interpretation:

- **90–100**: High confidence — safe to merge
- **70–89**: Moderate confidence — minor concerns
- **50–69**: Low confidence — needs attention
- **0–49**: Not safe to merge — blockers present

## Phase 5: Produce Output

Use this exact format:

```
## PR Review: #<number> — <title>

**Author:** <author>
**Type:** <detected PR type>
**Packages affected:** <list>
**CI Status:** <passing/failing/pending>

### Confidence Score: <score>/100

<one-sentence summary>

### Findings

#### Blockers (must fix before merge)
- [ ] <finding with file:line reference>

#### Warnings (should address)
- [ ] <finding with file:line reference>

#### Info (consider)
- <finding>

### Category Breakdown

| Category | Status | Notes |
|----------|--------|-------|
| Change file | PASS/FAIL | ... |
| V9 patterns | PASS/WARN | ... |
| Dep layers | PASS/FAIL | ... |
| SSR safety | PASS/WARN | ... |
| Testing | PASS/WARN | ... |
| API surface | PASS/WARN | ... |
| Accessibility | PASS/WARN | ... |
| Security/Quality | PASS/WARN | ... |

### Recommendation

APPROVE / REQUEST_CHANGES / COMMENT

<brief rationale>
```

## Notes

- For large PRs (50+ files), prioritize: published source files > test files > config. Note reduced confidence due to review scope.
- Draft PRs: still review but note WIP status.
- Merge conflicts: flag as BLOCKER if detected.
- The `### Confidence Score: NN/100` line must always appear on its own line for machine parsing.
