---
name: dependabot-rollup
description: >-
  Review and optionally combine open Dependabot patch and minor pull requests into a validated draft rollup PR. Use this skill to test Dependabot bundling locally or in a cloud agent without adding a scheduled GitHub Actions workflow. Always presents a dry-run plan and requires explicit approval before changing branches or GitHub pull requests.
disable-model-invocation: true
argument-hint: '[--repo owner/repo] [--base branch] [--max count] [--push-remote remote]'
allowed-tools: Bash Read Grep Glob
---

# Dependabot Rollup

Build a reviewable rollup of compatible Dependabot updates without scheduled automation. The default operation is read-only: discover candidates, classify them, and present a plan. Never create a branch, merge commits, push, close pull requests, or open a rollup PR until the user explicitly approves the proposed candidates.

## Defaults

| Argument        | Default                            | Purpose                                       |
| --------------- | ---------------------------------- | --------------------------------------------- |
| `--repo`        | `microsoft/fluentui`               | Repository containing the Dependabot PRs      |
| `--base`        | `master`                           | Base branch for discovery and the rollup      |
| `--max`         | `11`                               | Maximum eligible PRs in one proposed rollup   |
| `--push-remote` | Current branch's configured remote | Writable fork remote used only after approval |

Parse overrides from `$ARGUMENTS`. Reject an invalid repository name, a non-positive integer for `--max`, an unknown Git remote, or unknown arguments instead of guessing.

## Workflow

### Step 1 - Check prerequisites

Verify GitHub CLI authentication and confirm that the current checkout has a remote suitable for publishing a branch:

```bash
gh auth status
git remote -v
```

Unless `--push-remote` was provided, resolve `PUSH_REMOTE` from `remote.pushDefault`, then the current branch's configured remote. If neither is set, ask the user to select a writable remote before any publish step. Do not assume `origin` is writable.

Do not require a clean current working tree. Approved rollups must use a temporary Git worktree so unrelated local changes remain untouched.

### Step 2 - Discover open Dependabot PRs

Fetch open Dependabot PR metadata without changing Git or GitHub:

```bash
gh pr list \
  --repo "$REPO" \
  --state open \
  --app dependabot \
  --base "$BASE_BRANCH" \
  --limit 200 \
  --json number,title,url,updatedAt,baseRefName
```

Do not rely on the `dependencies` label: repositories may customize or omit it.

### Step 3 - Classify candidates

Parse the final `from <version> to <version>` segment of each PR title. Normalize a leading `v` and accept only strict three-part numeric versions (`major.minor.patch`).

Classify an update as eligible only when:

- Both versions parse as strict semantic versions.
- The target major equals the source major.
- The target version is greater than the source version.
- The change is a minor or patch update.

Exclude and report:

- Semver-major updates.
- Non-semver or unparseable updates, including action tags such as date-based releases.
- Downgrades and updates with no version change.

Sort eligible PRs by `updatedAt`, oldest first, and select at most `MAX_PRS` candidates. Do not infer eligibility from labels or branch names.

### Step 4 - Present the dry-run plan

Show a compact report before doing anything else:

```markdown
## Dependabot rollup plan

- Repository: owner/repo
- Base: master
- Eligible: 0
- Excluded: 0
- Selected: 0 of 11 maximum

| PR   | Update                 | Kind  | Last updated |
| ---- | ---------------------- | ----- | ------------ |
| #123 | package 1.0.0 -> 1.1.0 | minor | 2026-01-01   |

### Excluded

| PR   | Reason              |
| ---- | ------------------- |
| #456 | semver-major update |
```

If there are no selected PRs, stop after reporting that result. Otherwise ask the user to approve all candidates, approve specific PR numbers, edit the batch, or cancel. Do not treat the initial skill invocation as mutation approval.

### Step 5 - Create an isolated rollup

Run this step only after explicit approval. Use only the approved PR numbers, even if new candidates appear after the dry run.

Fetch the target base, record its SHA, and create a uniquely named temporary worktree and branch:

```bash
TARGET_URL="https://github.com/${REPO}.git"
ROLLUP_BRANCH="dependabot-rollup/$(date -u +%Y%m%d-%H%M%S)"
ROLLUP_DIR="$(mktemp -d)/fluentui-dependabot-rollup"

git fetch "$TARGET_URL" "$BASE_BRANCH"
BASE_SHA="$(git rev-parse FETCH_HEAD)"
git worktree add --detach "$ROLLUP_DIR" "$BASE_SHA"
git -C "$ROLLUP_DIR" switch -c "$ROLLUP_BRANCH"
```

For each approved PR, fetch and merge its head in the order shown in the plan:

```bash
git -C "$ROLLUP_DIR" fetch "$TARGET_URL" "pull/$PR_NUMBER/head"
git -C "$ROLLUP_DIR" merge --no-ff --no-edit FETCH_HEAD
```

If a merge conflicts, abort that merge, report the PR as skipped, and continue with the remaining approved PRs:

```bash
git -C "$ROLLUP_DIR" merge --abort
```

Never resolve dependency conflicts automatically. If no PRs merge successfully, report the result, remove the temporary worktree, and stop without creating an issue or PR.

### Step 6 - Validate the rollup

Run validation from the temporary worktree through the repository's Nx workflow:

```bash
yarn --cwd "$ROLLUP_DIR" install --frozen-lockfile
yarn --cwd "$ROLLUP_DIR" nx affected \
  -t build test lint type-check \
  --nxBail \
  --base="$BASE_SHA" \
  --head=HEAD
```

If installation or validation fails, report the failing command and keep the worktree available for inspection. Do not push the branch, open a PR, or create a tracking issue.

### Step 7 - Publish only after validation

After validation succeeds, summarize the merged and skipped PRs and ask for explicit confirmation to publish. On approval, push the rollup branch to the configured writable remote and open a draft PR:

```bash
PUSH_REPO="$(gh repo view "$(git remote get-url "$PUSH_REMOTE")" --json nameWithOwner --jq .nameWithOwner)"
PUSH_OWNER="${PUSH_REPO%%/*}"

git -C "$ROLLUP_DIR" push "$PUSH_REMOTE" "$ROLLUP_BRANCH"
gh pr create \
  --repo "$REPO" \
  --base "$BASE_BRANCH" \
  --head "${PUSH_OWNER}:${ROLLUP_BRANCH}" \
  --draft \
  --title "chore(deps): roll up Dependabot updates" \
  --body-file "$PR_BODY_FILE"
```

The PR body must list merged PRs, skipped PRs with reasons, and the exact validation commands. Do not close or modify the original Dependabot PRs automatically.

### Step 8 - Clean up and report

After publishing, or when the user declines publication, remove the temporary worktree unless the user asks to keep it:

```bash
git worktree remove "$ROLLUP_DIR"
```

Report:

- Candidate, excluded, merged, and skipped counts.
- Exclusion and skip reasons.
- Validation commands and outcome.
- Draft PR URL when one was created.
- Temporary worktree path when retained for investigation.

## Guardrails

- Always dry-run and obtain approval before mutation.
- Obtain a second confirmation before pushing or opening a draft PR.
- Never run on a schedule or add a GitHub Actions workflow.
- Never request or print a GitHub token; use the user's existing `gh` authentication.
- Never include semver-major, non-semver, downgrade, or unparseable updates.
- Never mutate the user's current working tree.
- Never auto-resolve merge conflicts or bypass failed validation.
- Never create failure-tracking issues or close source Dependabot PRs.
