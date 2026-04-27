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

A code change frequently lands something that **someone downstream** needs to learn about. The "someone" splits into two audiences with very different reading habits, so this check actually walks two passes:

- **Pass 1 — user-facing docs.** Component consumers (storybook stories, migration guides, docsite, MDX, change-file comments).
- **Pass 2 — harness / agent-facing docs.** Future agent sessions reading the skills, `AGENTS.md`, `docs/workflows/*`, and `docs/architecture/*`. When a PR changes a build target, a script, a CI step, a label taxonomy, a project-board field, or an assumption that a skill makes, the skill or harness doc has to be updated **in the same PR** — otherwise every fresh `/triage-issues`, `/visual-test`, `/review-pr`, etc. invocation pays the discovery cost over again.

Both passes ask the same two questions: should this PR have updated docs, and if so, did it? Bug fixes that restore documented behavior, internal refactors, and test-only PRs default to PASS in both passes — the interesting cases are below.

#### Pass 1 — user-facing docs

| Source change                                                                                                         | Expected doc surface                                                                                           |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| New prop on a public component (added in `*.types.ts`)                                                                | A Storybook story or MDX entry under `packages/react-components/react-<name>/stories/` that exercises the prop |
| New public export added to a `library/src/index.ts` barrel                                                            | A story or MDX entry covering it (or a justified note in the PR body)                                          |
| New component package (new directory under `packages/react-components/react-*`)                                       | Stories package, `library/docs/Spec.md`, and an entry on the docsite (`apps/public-docsite-v9`)                |
| Behavior change to a public API's defaults (e.g. a new conditional in `use*_unstable` that changes observable output) | Mention in `library/docs/MIGRATION.md` or a "BREAKING CHANGE / behavior change" section in the PR body         |
| Removal or deprecation of a public export                                                                             | `library/docs/MIGRATION.md` entry and/or a `@deprecated` JSDoc on the symbol                                   |
| New design token, classname constant, or CSS custom property                                                          | A line in the relevant docs (often the component's stories MDX) explaining how to use/override it              |

#### Pass 2 — harness engineering / agent-facing docs

This pass exists because skills are part of the contract, not just convenience. When the skills are stale, the agents are wrong — quietly. Symptoms: a `/visual-test` invocation that points at a nonexistent project name, a `/triage-issues` flow that recommends a label the repo no longer has, a `/triage-board` skill that misses a new view filter the maintainers added.

Walk the diff for any of these and check whether the matching agent-facing doc was updated:

| Source change                                                                                       | Expected harness update                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New / renamed nx target (`project.json`, `nx.json`, generators)                                     | Any skill that invokes that target — `visual-test`, `lint-check`, `package-info`, `v9-component`. The skill literally types the target name; it's not auto-discovered.                                 |
| New / renamed top-level `package.json` script                                                       | Same. Plus `docs/workflows/contributing.md` if it's contributor-facing.                                                                                                                                |
| New label, label rename, or label taxonomy change in the repo (`gh api repos/.../labels`)           | `triage-issues/references/triage-labels.md` — the skill uses an allow-list and `gh issue edit` rejects unknown labels.                                                                                 |
| New / changed project-board field, view filter, or option ID                                        | `triage-board/references/team-mapping.md` (option IDs) and the view-filter mirror in `triage-board/SKILL.md`.                                                                                          |
| New convention contributors are expected to follow (file layout, naming, "always do X")             | `AGENTS.md` / `CLAUDE.md` (they're symlinked) — the rules section is the agent's first read.                                                                                                           |
| New layered dependency rule, package-tier reshuffle, or CODEOWNERS rewrite                          | `docs/architecture/layers.md`, `docs/team-routing.md`, plus `triage-board/references/team-mapping.md` if a CODEOWNERS handle gained or lost a confident mapping.                                       |
| New first-time-setup requirement (e.g. a workspace package whose `lib-commonjs/` must be pre-built) | `docs/workflows/contributing.md` "First-time setup" section AND the troubleshooting block of any skill that hits the failure mode (`visual-test` already does this for the unstable-deps case).        |
| New skill, agent hook, or `.claude/`-level configuration                                            | `AGENTS.md` skills table + the `.claude/skills/<name>/SKILL.md` bridge file.                                                                                                                           |
| Removal or move of a path that any skill greps for or hard-codes                                    | The skill that referenced it. Search the skills (`grep -rn "<old-path>" .agents/skills/`) before merging.                                                                                              |
| Authentication / token-scope / permission changes that affect `gh` calls                            | The skill's preflight section. Concrete past examples: the EMU vs non-EMU active-account gotcha and the `read:project` vs `project` scope distinction now baked into `triage-board`'s preflight.       |
| New external-tool name or behavior change (e.g. assignee identity for an automated agent)           | The relevant skill. Concrete past example: assigning to `Copilot` literally fails with "Bot does not have access" — only `copilot-swe-agent` works. That belongs in any skill that assigns to Copilot. |

#### When docs are NOT expected (default to PASS)

- Pure bug fix that restores documented behavior
- Internal refactor with no exported-symbol or behavior change
- Build / CI changes that have no contributor-facing or skill-facing impact
- Test-only PRs
- Style-only PRs (typo, formatting) on internal code

#### Severity

| Situation                                                                                                               | Severity |
| ----------------------------------------------------------------------------------------------------------------------- | -------- |
| Public export removed or behavior-changed without `MIGRATION.md` entry                                                  | BLOCKER  |
| Skill references a renamed or removed path / target / label that this PR changes (skill will literally fail next run)   | BLOCKER  |
| New public component / new public hook with no story or MDX                                                             | WARNING  |
| New public prop with no story exercising it                                                                             | WARNING  |
| New design token / className constant with no usage example                                                             | WARNING  |
| Behavior change to public defaults with no PR-body callout                                                              | WARNING  |
| New label / project field / nx target / convention without the matching skill or `AGENTS.md` / `docs/workflows/` update | WARNING  |
| New first-time-setup requirement without `contributing.md` mention                                                      | WARNING  |
| PR description explicitly defers docs to a follow-up (link cited)                                                       | INFO     |
| Docs / harness change exists but feels minimal — could be more thorough                                                 | INFO     |

#### How to actually run this check

The model should walk the diff, not guess.

1. **Group changed files into surfaces.** Code surfaces (`library/src/**`, `index.ts` barrels, `*.types.ts`); user-doc surfaces (`stories/**`, `library/docs/**`, `apps/public-docsite-v9/**`); harness surfaces (`.agents/skills/**`, `.claude/**`, `AGENTS.md`, `CLAUDE.md`, `docs/workflows/**`, `docs/architecture/**`, `docs/team-routing.md`, `project.json`, `nx.json`, root `package.json` scripts, `.github/CODEOWNERS`, `.github/labeler.yml`).
2. **If the PR is purely a doc/harness surface**, the check is PASS — it's documentation already.
3. **For each row in the user-facing table that matches a code change in the diff**, verify the corresponding doc surface was also touched. If not, raise the matching severity.
4. **For each row in the harness-engineering table that matches**, verify the corresponding skill or harness doc was also touched. Be specific: name the skill that needs updating, not just "a skill."
5. **Cross-search**: when a PR renames a path, target, or label, run `grep -rn "<old-name>" .agents/skills/ docs/ AGENTS.md` to find references that will break. Anything that turns up is a BLOCKER unless this PR also updates it.
6. **Read the PR body** before reporting. Authors often pre-empt with "docs follow-up tracked in #NNNN" or "harness skills updated in commit X" — those move findings from WARNING to INFO when the deferral is explicit and reasonable.

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
