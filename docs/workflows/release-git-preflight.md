# Release safety: git push preflight

## Why this exists

`beachball publish` runs in this order:

1. bump versions on disk → **publish to npm**
2. commit, tag, **push to git** (5 retries)

npm publishes are irreversible, so if the GitHub token turns out to be unable to push, the packages
are already public while the repo still has the old versions.

This happened on **2026-06-30**: an enterprise policy started rejecting classic PATs with a lifetime
greater than 8 days. All 18 v8 packages published successfully, then every push attempt failed with
`403`. npm and `master` were out of sync until a manual recovery commit two days later, and the git
tags for that release were never created.

To prevent a repeat, release pipelines now **verify git push access before publishing**.

## What runs

Two checks, because they catch different failures:

| Check                          | Catches                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `GET /user` via the GitHub API | expired / revoked tokens, org or enterprise policy rejections, missing scopes |
| `git push --dry-run`           | valid credentials that nevertheless lack push permission on the branch        |

Implemented in [`scripts/executors/src/check-git-push-access.ts`](../../scripts/executors/src/check-git-push-access.ts),
wired up by [`.devops/templates/release-git-preflight.yml`](../../.devops/templates/release-git-preflight.yml).

The preflight runs twice:

- **early**, right after `yarn`, so a broken token fails the run in ~2 minutes instead of after a
  full build/test cycle. This is only an optimization.
- **immediately before publish**, which is the check that actually provides the guarantee (it also
  catches a token that expires part-way through a long build).

A non-fast-forward rejection is deliberately **not** treated as a failure: it means authentication
succeeded and the branch simply moved on, which beachball already handles by fetching and merging
before it pushes. Failing there would block healthy releases.

## Normal behavior

If the token is fine, nothing changes — the release publishes and pushes as before.

If the token is broken, the pipeline **fails before publishing anything**. npm and the repo stay in
sync. Fix it by rotating the PAT in the `Github and NPM secrets` variable group.

## Forcing a release with a broken token

If a release genuinely cannot wait for the PAT to be rotated, re-run the pipeline with:

> **Force release even if git PAT is invalid (npm only, manual repo update required)**

| `forceReleaseWithoutGitPush` | Token valid | Result                                                |
| ---------------------------- | ----------- | ----------------------------------------------------- |
| `false` (default)            | yes         | normal release                                        |
| `false` (default)            | no          | **fails before publishing**                           |
| `true`                       | yes         | normal release                                        |
| `true`                       | no          | publishes to npm, skips push, emits a recovery bundle |

The flag is a _permission to proceed_, not an instruction to skip pushing — with a healthy token it
still performs a complete, normal release.

### What force mode produces

beachball runs with `--no-push`, so packages reach npm but nothing is committed, tagged or pushed.
The run finishes as **partiallySucceeded** (green with a warning): the release really did succeed on
npm, so red would be misleading, but plain green would let the outstanding manual step slip by.

The run also prints the exact command to fix it.

### Recovering afterwards

Run the **`release-recovery`** skill from a clean checkout, pointing it at the failed run:

```
/release-recovery https://dev.azure.com/<org>/<project>/_build/results?buildId=<id>
```

It diagnoses the drift against npm (the source of truth), shows a read-only plan, and — only after
you approve — regenerates the bumps and changelogs with beachball and opens a recovery PR.

The diagnosis alone can be run at any time:

```bash
node -r ./scripts/ts-node/src/register ./scripts/executors/src/check-release-sync.ts \
  --remote upstream --ref upstream/master
```

Rotate the PAT first — otherwise the next release fails exactly the same way.

### What recovery does not do

Recovery restores **version bumps and changelogs only**. It does not recreate release git tags:

- a recovery commit is not the commit the release was built from, so tags against it would point at
  the wrong history
- a single release spans dozens of packages (a v9 release touches ~90), making bulk tag creation
  noisy and unreviewable
- tags are not load-bearing for consumers — npm is what they install from

Pass `--check-tags` to the diagnostic to _report_ missing tags for awareness. If tags are genuinely
required for a particular release, create them as a separate deliberate task.

## Implementation notes

Verified against beachball `3.0.0-alpha.7`; re-check these on upgrade:

- `--no-push` **still writes** bumps, changelogs and lockfile changes to disk (`performBump` runs
  during the publish step) — but they are discarded by the pipeline's `git reset --hard`, which is
  why recovery replays them locally rather than trying to salvage them from the agent.
- Neither `--no-push` **nor** the `bump` command runs beachball's `precommit` hook (it only runs on
  the push path, inside `mergePublishBranch`). Recovery therefore has to run the
  `dependency-mismatch` / `normalize-package-dependencies` generators and refresh the lockfile
  itself. Keep that in sync with `hooks.precommit` in
  [`scripts/beachball/src/shared.config.ts`](../../scripts/beachball/src/shared.config.ts).
- `beachball bump` **never commits, tags or pushes** — it only writes files. `tagPackages` and
  `git push` exist solely in `bumpAndPush`, which only the `publish` command reaches. Verified
  empirically: a full `bump` run changed 123 files and produced 0 tags, 0 commits, 0 branches.
- `--no-push` **skips tagging**. Tags are intentionally left uncreated (see above).

The four experimental/nightly release pipelines already pass `--no-push` and never push, so they are
unaffected.

### Recovering an already-broken release

The `release-recovery` skill works on **any** desync, including releases that predate this tooling —
it derives everything from npm rather than from a pipeline artifact.

Check at any time whether the repo and npm agree:

```bash
node -r ./scripts/ts-node/src/register ./scripts/executors/src/check-release-sync.ts \
  --remote upstream --ref upstream/master
```

It reports the problem that matters:

- **version desync** — published to npm, but the repo never recorded the bump

Add `--check-tags` to also list published versions with no git tag. That is informational only —
recovery does not recreate tags (see above).

## Known limitation

The preflight shrinks the window in which a token can go bad from "the whole build" to "the seconds
between the check and the push" — it cannot eliminate it. Genuine atomicity is not achievable while
npm publish precedes the git push.

The durable fix is to stop using long-lived classic PATs (a GitHub App installation token or a
fine-grained PAT with automated rotation), which addresses the cause rather than the blast radius.
