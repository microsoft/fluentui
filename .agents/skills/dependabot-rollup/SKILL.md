---
name: dependabot-rollup
description: >-
  Review and optionally combine at most 11 open individual Dependabot patch and minor pull requests into a validated draft rollup PR. Use this skill as a local or cloud-agent fallback to native Dependabot groups without adding a custom scheduled GitHub Actions workflow. Always presents a dry-run plan and requires explicit approval before changing branches or GitHub pull requests.
disable-model-invocation: true
argument-hint: '[--repo owner/repo] [--base branch] [--max count] [--push-remote remote]'
allowed-tools: Bash Read Grep Glob
---

# Dependabot Rollup

Build a reviewable manual rollup of compatible individual Dependabot updates as a fallback to the repository's native Dependabot groups. The default operation is read-only: discover candidates, classify them, and present a plan. Never create a branch, merge commits, push, close pull requests, or open a rollup PR until the user explicitly approves the proposed candidates.

## Defaults

| Argument        | Default                            | Purpose                                       |
| --------------- | ---------------------------------- | --------------------------------------------- |
| `--repo`        | `microsoft/fluentui`               | Repository containing the Dependabot PRs      |
| `--base`        | `master`                           | Base branch for discovery and the rollup      |
| `--max`         | `11`                               | Eligible PR limit, from 1 through 11          |
| `--push-remote` | Current branch's configured remote | Writable fork remote used only after approval |

Parse overrides from `$ARGUMENTS`. Reject an invalid repository name, a `--max` value that is not an integer from 1 through 11, an unknown Git remote, or unknown arguments instead of guessing. The value 11 is an absolute ceiling, not only the default.

## Workflow

### Step 1 - Check prerequisites

Verify GitHub CLI authentication and confirm that the current checkout has a remote suitable for publishing a branch:

```bash
gh auth status
git remote -v
```

Unless `--push-remote` was provided, resolve `PUSH_REMOTE` from `remote.pushDefault`, then the current branch's configured remote. If neither is set, ask the user to select a writable remote before any publish step. Do not assume `origin` is writable.

Do not create or switch branches during prerequisite checks or analysis. Unrelated local changes may remain in the checkout, but stop if the root `yarn.lock` has staged or unstaged changes because they could contaminate conflict resolution. Record the current branch, or the current commit when detached, as `START_REF` so it can be restored after the rollup is published or cancelled. If creating the rollup branch would overwrite a local change, stop and ask the user to resolve it.

### Step 2 - Discover open Dependabot PRs

Fetch open Dependabot PR metadata without changing Git or GitHub:

```bash
gh pr list \
  --repo "$REPO" \
  --state open \
  --app dependabot \
  --base "$BASE_BRANCH" \
  --limit 200 \
  --json number,title,url,updatedAt,baseRefName,headRefName
```

Do not rely on the `dependencies` label: repositories may customize or omit it.

### Step 3 - Classify candidates

Before parsing individual updates, strip an optional conventional commit prefix of `chore(deps): ` or `chore(deps-dev): ` from the title. Detect native grouped PRs by either the remaining title being in the form `bump the <group> group ...` (case-insensitive) or a `headRefName` containing one of the configured group identifiers: `github-actions-minor-patch`, `github-actions-security`, `production-dependencies`, `development-dependencies`, or `security-dependencies`. Exclude and report these PRs as `already grouped by Dependabot`; never place one rollup inside another.

After removing the optional conventional commit prefix, parse each title case-insensitively as `bump <dependency> from <version> to <version>`. Use the parsed dependency name as the deduplication key. Normalize a leading `v` in versions and accept only strict three-part numeric versions (`major.minor.patch`).

Classify an update as eligible only when:

- Both versions parse as strict semantic versions.
- The target major equals the source major.
- The target version is greater than the source version.
- The change is a minor or patch update.

Exclude and report:

- Semver-major updates.
- PRs already grouped by Dependabot.
- Non-semver or unparseable updates, including action tags such as date-based releases.
- Downgrades and updates with no version change.

Before applying the batch limit, group eligible PRs by dependency. For each dependency, retain the PR with the highest target version. If target versions are equal, retain the most recently updated PR. Report every other PR in the group as superseded, including the retained PR number and target version.

Check each retained candidate against the dependency versions currently declared on `BASE_BRANCH` before applying the batch limit. Inspect only the `package.json` files changed by that PR and parse them as JSON; do not infer versions with text matching. Ignore range operators when comparing the declared semantic version with the target version.

- Exclude the candidate as obsolete when the dependency was removed from every changed manifest or every current declaration is equal to or newer than the target.
- Exclude and report the candidate as ambiguous when changed manifests contain conflicting current versions that cannot be compared safely.
- Keep lockfile-only updates eligible because they have no direct manifest declaration to compare.

Sort the deduplicated candidates by `updatedAt`, oldest first, then by PR number ascending when timestamps are equal. Select at most `MAX_PRS` candidates. Apart from detecting configured native group identifiers, do not infer eligibility from labels or branch names. Do not include superseded PRs in the eligible or selected counts.

### Step 4 - Present the dry-run plan

Show a compact report before doing anything else:

```markdown
## Dependabot rollup plan

- Repository: owner/repo
- Base: master
- Eligible: 0
- Excluded: 0
- Superseded: 0
- Selected: 0 of 11 maximum

| PR   | Update                 | Kind  | Last updated |
| ---- | ---------------------- | ----- | ------------ |
| #123 | package 1.0.0 -> 1.1.0 | minor | 2026-01-01   |

### Excluded

| PR   | Reason              |
| ---- | ------------------- |
| #456 | semver-major update |

### Superseded

| PR   | Dependency | Superseded by | Reason                     |
| ---- | ---------- | ------------- | -------------------------- |
| #789 | package    | #790          | newer target version 1.2.0 |
```

If there are no selected PRs, stop after reporting that result. Otherwise ask the user to approve all candidates, approve specific PR numbers, edit the batch, or cancel. Do not treat the initial skill invocation as mutation approval.

### Step 5 - Create the rollup branch

Run this step only after the dry-run analysis and explicit approval. Use only the approved PR numbers, even if new candidates appear after the dry run.

Immediately before merging each approved PR, repeat the base-version check against the current rollup branch. Skip the PR as obsolete if another merged update made its target unnecessary or removed its dependency. This preflight is required even when Git predicts a clean merge; never allow a stale PR to downgrade or reintroduce a dependency.

Fetch the target base, record its SHA, and create a uniquely named branch in the current checkout. The rollup pull request will target `BASE_BRANCH`; never commit directly to the base branch:

```bash
TARGET_URL="https://github.com/${REPO}.git"
ROLLUP_BRANCH="dependabot-rollup/$(date -u +%Y%m%d-%H%M%S)"
START_REF="$(git symbolic-ref --quiet --short HEAD || git rev-parse HEAD)"

test -z "$(git status --porcelain -- yarn.lock)"
git fetch "$TARGET_URL" "$BASE_BRANCH"
BASE_SHA="$(git rev-parse FETCH_HEAD)"
git switch -c "$ROLLUP_BRANCH" "$BASE_SHA"
```

For each approved PR, fetch and merge its head in the order shown in the plan:

```bash
git fetch "$TARGET_URL" "pull/$PR_NUMBER/head"
git merge --no-ff --no-edit FETCH_HEAD
```

Dependency rollups commonly conflict because several PRs modify the same manifests and lockfile. If a merge conflicts, list the unmerged files:

```bash
git diff --name-only --diff-filter=U
```

Resolve the conflict only when every unmerged file is a `package.json` file or the root `yarn.lock`:

1. For each conflicted `package.json`, preserve the current rollup branch content and apply only the approved dependency's target version from the PR title. Preserve the existing range operator. If the current version is already equal to or newer than the target, abort the merge and report the PR as obsolete.
2. Reject ambiguous manifest changes. Do not copy the PR's entire stale manifest or select all of either side of a conflict.
3. If `yarn.lock` is conflicted, restore its current rollup branch version. Regenerate it from the resolved manifests instead of manually editing lockfile conflict markers:

```bash
git diff --name-only --diff-filter=U -- yarn.lock | grep -q . && \
  git checkout HEAD -- yarn.lock
yarn install
```

4. Stage the resolved manifests and lockfile, then inspect the staged diff against the merge's first parent. It must contain only the approved dependency update and lockfile changes derived from it.
5. Complete the merge with `git commit --no-edit` and report the PR as merged with resolved dependency conflicts.

If any conflict is outside dependency manifests and the root lockfile, the intended version change is unclear, lockfile generation fails, or the reviewed diff contains unrelated stale changes, abort that merge, report the PR as skipped with the specific reason, and continue with the remaining approved PRs:

```bash
git merge --abort
```

If no PRs merge successfully, report the result, switch back to `START_REF`, delete the empty rollup branch, and stop without creating an issue or PR:

```bash
git switch "$START_REF"
git branch -D "$ROLLUP_BRANCH"
```

### Step 6 - Validate the rollup

Deduplicate the lockfile after all approved PRs have been merged and before running immutable installation or Nx validation:

```bash
yarn dedupe
```

If `yarn.lock` changed, commit that change separately so the rollup history records the normalization:

```bash
if ! git diff --quiet -- yarn.lock; then
  git add yarn.lock
  git commit -m "chore(deps): dedupe lockfile"
fi

yarn dedupe --check
```

Stop if deduplication or the dedupe check fails. Then run validation from the rollup branch through the repository's Nx workflow:

```bash
yarn install --immutable
yarn nx affected \
  -t build test lint type-check \
  --nxBail \
  --base="$BASE_SHA" \
  --head=HEAD
```

If deduplication, installation, or validation fails, report the failing command and leave the rollup branch checked out for inspection. Do not push the branch, open a PR, or create a tracking issue.

### Step 7 - Publish only after validation

After validation succeeds, summarize the merged and skipped PRs and ask for explicit confirmation to publish. On approval, push the rollup branch to the configured writable remote and open a draft PR:

```bash
PUSH_REPO="$(gh repo view "$(git remote get-url "$PUSH_REMOTE")" --json nameWithOwner --jq .nameWithOwner)"
PUSH_OWNER="${PUSH_REPO%%/*}"

git push "$PUSH_REMOTE" "$ROLLUP_BRANCH"
gh pr create \
  --repo "$REPO" \
  --base "$BASE_BRANCH" \
  --head "${PUSH_OWNER}:${ROLLUP_BRANCH}" \
  --draft \
  --title "chore(deps): roll up Dependabot updates" \
  --body-file "$PR_BODY_FILE"
```

The PR body must list merged PRs, skipped PRs with reasons, and the exact validation commands. Do not close or modify the original Dependabot PRs automatically.

### Step 8 - Restore the starting branch and report

After publishing, or when the user declines publication, return to the starting ref only when no merge is in progress and doing so will not overwrite local changes. Keep the local rollup branch for PR follow-up:

```bash
git switch "$START_REF"
```

Report:

- Candidate, excluded, merged, and skipped counts.
- Exclusion, superseded, and skip reasons.
- Validation commands and outcome.
- Draft PR URL when one was created.
- Local rollup branch name when retained for investigation or PR follow-up.

## Guardrails

- Always dry-run and obtain approval before mutation.
- Obtain a second confirmation before pushing or opening a draft PR.
- Never run on a schedule or add a GitHub Actions workflow.
- Never request or print a GitHub token; use the user's existing `gh` authentication.
- Never include a PR already grouped by Dependabot.
- Never include semver-major, non-semver, downgrade, or unparseable updates.
- Never propose, merge, or publish a rollup containing more than 11 updates.
- Never include more than one PR for the same dependency in a proposed rollup.
- Never change branches or files before approval, and never proceed when the root `yarn.lock` has local changes.
- Never resolve conflicts by blindly choosing an entire side. Resolve only reviewed dependency manifest and lockfile conflicts as described above.
- Never bypass failed validation.
- Never create failure-tracking issues or close source Dependabot PRs directly.
