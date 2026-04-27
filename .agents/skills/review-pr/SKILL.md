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

### I. Documentation coverage

A code change frequently lands a new prop, component, behavior, or migration step that consumers need to learn about. This check asks two questions, in order:

1. **Should this PR have updated docs?** — based on what the diff actually touches.
2. **If yes, did it?**

Bug fixes by themselves usually don't need docs — the existing behavior already matches the existing docs by definition; the bug _was_ the divergence. Internal refactors, build/CI changes, and test-only PRs don't either. The interesting cases are below.

**When docs ARE expected** (compare the diff against these paths):

| Source change                                                                                                         | Expected doc surface                                                                                           |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| New prop on a public component (added in `*.types.ts`)                                                                | A Storybook story or MDX entry under `packages/react-components/react-<name>/stories/` that exercises the prop |
| New public export added to a `library/src/index.ts` barrel                                                            | A story or MDX entry covering it (or a justified note in the PR body)                                          |
| New component package (new directory under `packages/react-components/react-*`)                                       | Stories package, `library/docs/Spec.md`, and an entry on the docsite (`apps/public-docsite-v9`)                |
| Behavior change to a public API's defaults (e.g. a new conditional in `use*_unstable` that changes observable output) | Mention in `library/docs/MIGRATION.md` or a "BREAKING CHANGE / behavior change" section in the PR body         |
| Removal or deprecation of a public export                                                                             | `library/docs/MIGRATION.md` entry and/or a `@deprecated` JSDoc on the symbol                                   |
| New design token, classname constant, or CSS custom property                                                          | A line in the relevant docs (often the component's stories MDX) explaining how to use/override it              |
| New skill, agent feature, or hook in `.agents/skills/` or `.claude/`                                                  | Update `AGENTS.md` (the registry table) and any cross-referenced doc                                           |
| Workflow / contributor-facing tooling change                                                                          | Update `docs/workflows/contributing.md` or the relevant `docs/workflows/*.md`                                  |

**When docs are NOT expected** (default to PASS):

- Pure bug fix that restores documented behavior
- Internal refactor with no exported-symbol or behavior change
- Build / CI / tooling changes that don't affect contributors
- Test-only PRs
- Style-only PRs (typo, formatting) on internal code

**Severity:**

| Situation                                                                     | Severity |
| ----------------------------------------------------------------------------- | -------- |
| Public export removed or behavior-changed without `MIGRATION.md` entry        | BLOCKER  |
| New public component / new public hook with no story or MDX                   | WARNING  |
| New public prop with no story exercising it                                   | WARNING  |
| New design token / className constant with no usage example                   | WARNING  |
| Behavior change to public defaults with no PR-body callout                    | WARNING  |
| New skill or workflow change without updating `AGENTS.md` / `docs/workflows/` | WARNING  |
| PR description explicitly defers docs to a follow-up (link cited)             | INFO     |
| Docs change exists but feels minimal — could be more thorough                 | INFO     |

**How to actually run this check** (the model should walk the diff, not guess):

1. Look at the changed-files list. Group into "code surfaces" (`library/src/**`, `index.ts` barrels, `*.types.ts`) and "doc surfaces" (`stories/**`, `library/docs/**`, `apps/public-docsite-v9/**`, `docs/**`, `*.md`, `AGENTS.md`).
2. If the PR is purely doc-surface, this check is trivially PASS.
3. If the PR is purely code-surface AND the code change doesn't fall into the "expected docs" rows above, PASS.
4. Otherwise, pick the strictest matching row from the severity table and report it. **Always cite the specific file or symbol** in the finding so the author can act on it.
5. Read the PR body before reporting — authors often pre-empt this with "docs follow-up tracked in #NNNN" or "no docs needed because X." That moves the finding from WARNING to INFO if the deferral is explicit and reasonable.

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

Use this exact format (also used verbatim as the PR-comment body in Phase 6 — don't duplicate work).

Start directly with the score. Skip a header title, author, type, packages-affected, and CI-status preamble — when this is posted as a PR comment, all of that is already visible in the GitHub UI immediately above the comment, so repeating it just pushes the actually-useful content (score + findings) below the fold. The classification work from Phase 2 still happens; it just isn't echoed back at the reader.

```
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
| Docs coverage | PASS/WARN/FAIL | ... |

### Recommendation

APPROVE / REQUEST_CHANGES / COMMENT

<brief rationale>
```

## Phase 6: Post the review back to the PR

After presenting the output in the chat, post the same text as a comment on the PR so the review is visible to maintainers and to Copilot (when the PR author is `copilot-swe-agent`, the comment becomes actionable feedback).

Save the output from Phase 5 to a temp file so the markdown isn't mangled by shell quoting, then:

```bash
gh pr comment $ARGUMENTS --repo microsoft/fluentui --body-file /tmp/pr-review-$ARGUMENTS.md
```

Append a single trailer line to the body so the post is identifiable:

```
---
*Posted via the `/review-pr` skill.*
```

The posted comment should be **identical** to what you rendered in chat — don't paraphrase or summarize. The chat output and the PR comment must match so the user can trust that what they saw is what the maintainers see.

**Pre-checks before posting:**

1. Confirm the active `gh` account has write access to the PR's repo (EMU accounts read fine but silently fail on writes):
   ```bash
   gh api graphql -f query='{ viewer { login } repository(owner:"microsoft", name:"fluentui") { viewerPermission } }'
   ```
   If `viewerPermission` is `NONE`, stop and ask the user to `gh auth switch --user <non-emu-account>`.
2. Don't post on PRs from your own branches unless explicitly asked — self-review comments are noise.
3. If `REQUEST_CHANGES` is the recommendation, still post the comment but note to the user that only a formal review (`gh pr review --request-changes`) actually blocks merge; a comment is advisory.

**When to skip posting:**

- The user explicitly asks for a review without posting ("review but don't post").
- The PR has an existing comment from this skill within the last day on the same head SHA — avoid duplicate noise. Look for the `*Posted via the \`/review-pr\` skill.\*` trailer.
- Draft PRs where the user is clearly still iterating (state=OPEN, isDraft=true, recent force-push) — offer to post but don't do it by default.

## Notes

- For large PRs (50+ files), prioritize: published source files > test files > config. Note reduced confidence due to review scope.
- Draft PRs: still review but note WIP status.
- Merge conflicts: flag as BLOCKER if detected.
- The `### Confidence Score: NN/100` line must always appear on its own line for machine parsing.
