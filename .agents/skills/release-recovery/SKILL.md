---
name: release-recovery
description: >-
  Diagnose and repair a release that published packages to npm but failed to push the version bumps and changelogs back to the repository. Accepts an optional failed Azure DevOps pipeline run URL for context. Always presents a read-only diagnosis first and requires explicit approval before changing branches, commits or pull requests.
disable-model-invocation: true
argument-hint: '[pipeline-url] [--ref upstream/master] [--remote upstream]'
allowed-tools: Bash Read Grep Glob
---

# Release Recovery

Repair the desync a failed release leaves behind: packages are live on npm, but the repository still
has the old versions.

npm publishes are irreversible, so **npm is the source of truth**. Recovery always means moving the
repository forward to match the registry — never the other way round.

The default operation is read-only. Do not create branches, commits or pull requests until the user
explicitly approves a proposed plan.

## Scope

Recovery restores **version bumps and changelogs**. It does **not** recreate release git tags:

- A recovery commit is not the commit the release was built from, so tags created against it would
  point at the wrong history — worse than having no tag.
- A single release spans dozens of packages (a v9 release touches ~90), so bulk tag creation is
  noisy and effectively unreviewable.
- Tags are not load-bearing for consumers; npm is what they install from.

Missing tags can still be _reported_ for awareness with `--check-tags` on the diagnostic, but they
are informational. If tags are genuinely needed for a specific release, create them deliberately as
a separate, explicitly-approved task.

## When to use

- A release pipeline failed after the "Publishing" step (typically a git push `403`/auth failure).
- A release was published to npm deliberately without pushing (a forced release that skips the git
  push).

## Defaults

| Argument       | Default                                 | Purpose                                             |
| -------------- | --------------------------------------- | --------------------------------------------------- |
| `pipeline-url` | none                                    | Failed ADO run, used only for context and reporting |
| `--ref`        | the release branch on the remote        | Git ref whose versions are compared against npm     |
| `--remote`     | remote pointing at `microsoft/fluentui` | Used for fetching and pushing                       |

Resolve `--remote` by inspecting `git remote -v` for the one pointing at `microsoft/fluentui`. It is
often `upstream` in a fork checkout, so never assume `origin`.

## Workflow

### Step 1 — Establish context

Confirm tooling and record the starting ref so it can be restored later:

```bash
gh auth status
git remote -v
git status --porcelain
```

Record `START_REF` (`git symbolic-ref --quiet --short HEAD || git rev-parse HEAD`).

If the working tree has uncommitted changes, stop and ask the user to deal with them. Recovery
rewrites `package.json`, changelog and lockfile content and must not mix with unrelated edits.

Fetch the release branch so the comparison is not made against a stale checkout:

```bash
git fetch "$REMOTE" master
```

### Step 2 — Read the failed pipeline (optional)

If a pipeline URL was supplied, use it for context only. Parse the organization, project and build id
from a URL of the form
`https://dev.azure.com/<org>/<project>/_build/results?buildId=<id>`.

```bash
az pipelines runs show --org "https://dev.azure.com/$ORG" --project "$PROJECT" --id "$BUILD_ID"
```

Useful signals in the log:

- `Publishing - <pkg>@<version>` followed by `Published!` — packages that reached npm.
- `Something went wrong with publishing! Manually update these package and versions:` — beachball's
  own list of what needs recovering.
- `remote: ... forbids access via a personal access tokens (classic)` or
  `The requested URL returned error: 403` — the push failed on auth, which is the usual cause.

Treat all of this as **corroboration only**. If `az` is not authenticated or the run has been purged,
say so and continue: the diagnosis in Step 3 does not depend on it.

### Step 3 — Diagnose (read-only)

Run the sync check against the up-to-date release branch:

```bash
node -r ./scripts/ts-node/src/register ./scripts/executors/src/check-release-sync.ts \
  --remote "$REMOTE" --ref "$REMOTE/master"
```

Add `--json` when the output needs parsing.

Always pass `--ref` pointing at the remote release branch. Comparing the working tree of a stale
checkout reports every package released since as a false desync.

The check classifies each public package:

| Status        | Meaning                                                              | Action           |
| ------------- | -------------------------------------------------------------------- | ---------------- |
| `in-sync`     | repo and npm agree                                                   | none             |
| `npm-ahead`   | published, but the repo never recorded the bump                      | recover versions |
| `repo-ahead`  | repo is newer than npm's `latest` (unreleased work, prerelease tags) | none — benign    |
| `unpublished` | never released                                                       | none             |

Only `npm-ahead` requires recovery.

### Step 4 — Present the plan and get approval

```markdown
## Release recovery plan

- Pipeline: <url or "not supplied">
- Remote: upstream
- Compared against: upstream/master
- Version desync: 2 package(s)

### Version desync

| Package         | Repo    | npm     |
| --------------- | ------- | ------- |
| @fluentui/react | 8.125.6 | 8.125.7 |

### Proposed actions

1. Regenerate bumps + changelogs from the pending change files
2. Verify the result matches npm exactly
3. Add `type: none` change files so the PR passes `beachball check`
4. Open a recovery PR

Release tags are not recreated - see the skill's Scope section.
```

Stop here if there is no `npm-ahead` drift. Otherwise ask the user to approve or cancel. Never treat
invoking the skill as approval to mutate anything.

### Step 5 — Recover versions

Skip this step when nothing is `npm-ahead`.

Create a branch from the current release branch:

```bash
git switch -c "release-recovery/$(date -u +%Y%m%d-%H%M%S)" "$REMOTE/master"
yarn install
```

Regenerate the release locally. The change files consumed by the failed run are still in the repo
(their deletion was never committed), so beachball reproduces the same bumps and changelogs:

```bash
yarn beachball bump --config scripts/beachball/src/<release>.config.js
```

Pick the config matching the failed pipeline:

| Release        | Config                                                   | Pipeline                                     |
| -------------- | -------------------------------------------------------- | -------------------------------------------- |
| v8             | `scripts/beachball/src/release-v8.config.js`             | `azure-pipelines.release.yml`                |
| v9 (vNext)     | `scripts/beachball/src/release-vNext.config.js`          | `azure-pipelines.release-vnext.yml`          |
| web-components | `scripts/beachball/src/release-web-components.config.js` | `azure-pipelines.release.web-components.yml` |
| headless       | `scripts/beachball/src/release-headless.config.js`       | `azure-pipelines.release.headless.yml`       |
| tools          | `scripts/beachball/src/release-tools.config.js`          | `azure-pipelines.release.tools.yml`          |

`beachball bump` only writes files — it does **not** commit, tag or push. Tagging and pushing live
exclusively in beachball's `bumpAndPush`, which is reachable only from the `publish` command.
Verified empirically against `3.0.0-alpha.7`: a full `bump` run changed 123 files and created 0 tags,
0 commits and 0 branches.

It does **not** run the `precommit` hook either (that also only runs on the push path), so apply the
same fixups a real release would. Keep this in sync with `hooks.precommit` in
[scripts/beachball/src/shared.config.ts](../../../scripts/beachball/src/shared.config.ts):

```bash
yarn nx g @fluentui/workspace-plugin:dependency-mismatch
yarn nx g @fluentui/workspace-plugin:normalize-package-dependencies
yarn install --mode=update-lockfile
```

Expect `bump` to consume **more change files than it bumps packages**. `type: "none"` change files
are deleted without producing a version bump — that is normal, and matches what a real release does.

**Verify before committing.** Re-run the sync check against the working tree:

```bash
node -r ./scripts/ts-node/src/register ./scripts/executors/src/check-release-sync.ts --remote "$REMOTE"
```

Every previously `npm-ahead` package must now be `in-sync`. If any version overshoots npm, extra
change files landed after the failed release, so a plain replay is not correct — stop, report the
mismatch, and let the user decide. Never hand-edit versions to force a match.

**Satisfy `beachball check`.** A real release pushes straight to `master` and never faces PR
validation, but a recovery PR does. The `change-files` job in
[.github/workflows/check-packages.yml](../../../.github/workflows/check-packages.yml) runs
`beachball check`, sees the bumped `package.json` files as changed packages, and fails with
`ERROR: Change files are needed!` — because the replay just consumed every change file that covered
them.

Generate `type: none` change files to cover exactly those packages:

```bash
yarn beachball change --type none --no-commit \
  --message "release recovery: versions already published to npm by the failed pipeline"
yarn beachball check
```

`--type none` is the correct type: the next release consumes these files without bumping a version
or writing a `CHANGELOG.md` entry. They leave only a `"none"` entry in `CHANGELOG.json`, which is a
useful audit trail of the recovery. Verified empirically on `3.0.0-alpha.7`: a follow-up `bump` with
38 such files produced 0 `package.json` and 0 `CHANGELOG.md` changes.

Do not skip this because a past recovery PR passed without it. [PR #36364](https://github.com/microsoft/fluentui/pull/36364)
did, but only by coincidence — unrelated change files had accumulated for the same packages in the
meantime, and beachball reported `Your local repository already has change files for these packages`.
That is not a property you can rely on.

Commit and open a PR. Stage explicitly rather than with `git add -A`, so unrelated untracked files in
the user's tree are not swept into a release commit:

```bash
git add -u          # bumps, changelogs, lockfile, consumed change files
git add change/     # the new type:none change files
git commit -m "release: applying package updates (manual recovery)"
git push "$PUSH_REMOTE" HEAD
gh pr create --repo microsoft/fluentui --base master \
  --title "release: applying package updates (manual recovery)" \
  --body-file "$PR_BODY_FILE"
```

Let the `precommit` git hook run — do not pass `--no-verify`. The manual fixups above replace
beachball's `precommit` hook, not the repository's.

The PR body must state which pipeline failed and that the packages are already on npm.

### Step 6 — Restore and report

```bash
git switch "$START_REF"
yarn install
```

The reinstall matters: the recovery branch rewrote `yarn.lock`, so the restored branch is left with
out-of-date `node_modules` otherwise.

Report:

- Packages recovered, with repo and npm versions.
- Recovery PR URL.
- Anything skipped, with the reason.
- A reminder to fix the underlying cause — usually rotating the GitHub PAT in the
  `Github and NPM secrets` variable group — since the next release fails identically otherwise.

## Guardrails

- Always diagnose and obtain approval before mutating anything.
- Never unpublish, deprecate or re-publish an npm package to "fix" a mismatch. npm is the source of
  truth; the repository moves to match it.
- Never hand-edit versions to force agreement with npm. Regenerate with beachball so changelogs and
  dependency ranges stay consistent, and stop if the result disagrees.
- Never commit directly to `master`; always go through a PR.
- Never bypass PR validation to land a recovery. Make `beachball check` pass with `type: none` change
  files rather than merging with an admin override or weakening the `change-files` job.
- Never `git add -A`. The user's tree may hold unrelated untracked work, and a release commit must not
  carry it.
- Never create or push release tags as part of recovery. They would point at a commit the release was
  not built from, and a single release spans dozens of packages.
- Never assume `origin` points at `microsoft/fluentui` — resolve the remote explicitly.
- Never trust a diagnosis made against a stale checkout; always compare against the fetched release
  branch.
- Never request or print a GitHub or npm token.
- Do not proceed when the working tree has uncommitted changes.
