---
name: s360-remediation
description: >-
  Investigate and resolve Fluent UI S360 dependency alerts. Query open items,
  summarize Merged / In PR / No PR, delegate failing PR checks to Copilot, merge
  ready fixes, create one aggregate issue and Copilot PR for uncovered items,
  and run production pipelines in dry-run mode after all fixes merge.
disable-model-invocation: true
argument-hint: '[item-id-or-url ...] [--repo owner/repo] [--wait-minutes 0-30]'
---

# S360 Remediation

Query open items, show their fix status, then act on the approved summary.
Creating this skill or invoking it is not approval to change GitHub or queue builds.

## Inputs and prerequisites

- Default repository: `microsoft/fluentui`. Discover its current default branch.
- Optional item IDs or URLs restrict the run; otherwise discover all open dependency
  alerts for the repository's mapped S360 services.
- Work-item source: `https://dev.azure.com/uifabric/UI%20Fabric/_workitems/edit/<id>`.
- Pipelines: [UI Fabric folders](https://uifabric.visualstudio.com/UI%20Fabric/_build?view=folders).
- Parse `$ARGUMENTS`; reject unknown options, invalid `owner/repo`, nonpositive item
  IDs, mismatched item URLs, or a wait duration outside 0-30 minutes. Default wait: 0.
- Use authenticated S360 Breeze, ADO, and GitHub tools; load deferred tools before
  calling them. CLI fallbacks use existing `gh` / corporate `az` authentication.
  Missing access is a blocker, not permission to invent data or request tokens.

## Flow

### 1. Query open items

Follow [S360 investigation](./references/s360-investigation.md) to discover services,
retrieve all relevant pages, and enrich alerts with ADO work items. Deduplicate
mirrored alerts and retain the selected item scope throughout follow-up.

### 2. Generate the summary

Compare every affected dependency version against public advisory ranges at a
recorded default-branch commit. Inspect related PR contents, not just titles.

| Item      | Dependency / advisory | Status                  | PR              | CI                                    | Next action        |
| --------- | --------------------- | ----------------------- | --------------- | ------------------------------------- | ------------------ |
| Item link | Package / advisory    | Merged, In PR, or No PR | PR link or none | Passing, pending, failing, or unknown | Specific next step |

- **Merged:** the fix is merged and all affected dependency paths are patched on
  the default branch. Wait for remaining fixes before production dry runs.
- **In PR:** an open PR contains the fix. Repair failing CI, then merge when ready.
- **No PR:** a verified outstanding fix has no covering PR. Include it in the
  aggregate issue; a partially covering PR leaves only its uncovered paths here.
- Put insufficient evidence in a separate **Blocked** list, not in an invented
  status. Blocked selected items prevent production runs.

Show totals and ask approval for the exact PR merges, Copilot repair requests,
and aggregate issue contents. Do not silently drop items to make the run complete.

### 3. Handle existing PRs

Use the **Existing PRs** section in [GitHub operations](./references/github-and-pipelines.md).
Merge approved ready PRs; delegate failing checks to Copilot on the existing PR
where supported. Do not open a duplicate remediation PR. Recheck the changed head
and required reviews/checks before merging or enabling auto-merge. Report draft,
permission, fork, unsupported-check, and review blockers; never bypass protections.

### 4. Handle items without PRs

Create or reuse **one aggregate issue**, not one issue per alert. Include all
approved uncovered dependency fixes, public advisories, affected paths, and
validation requirements. Assign Copilot to implement them in **one PR** and enable
auto-merge on that linked PR once permitted. Follow the
**Aggregate issue** section in [GitHub operations](./references/github-and-pipelines.md).

If there are no uncovered fixes, skip issue creation. Flag incompatible fixes
before dispatch instead of silently splitting into multiple issues or PRs.

### 5. Run production dry runs and confirm resolution

Only after **all covering PRs are merged** and all selected fixes are verified at
one default-branch commit, present the required pipelines and obtain separate
approval. Follow the **Production runs** section in [GitHub operations](./references/github-and-pipelines.md)
to queue each required pipeline once with `dryRun=true`, pinned to that commit.

Confirm scan execution and requery S360 for the same alerts. A merged PR or passing
build alone does not prove S360 resolution. Never update S360/ADO status manually.

## Follow-up

Keep an ignored local run record under `tmp/s360-remediation/` with selected item
identities, evidence commit, issue/PR links, desired auto-merge, approvals, and run
IDs. Confirm it is Git-ignored before writing; never commit internal alert data.
Requery before mutations and after ambiguous API responses to avoid duplicates.
Changed scope, PR content, or pipeline commit requires renewed approval.

Default follow-up reads current state once and reports pending work. An explicit
wait uses available tool wait facilities within its deadline; do not sleep or
poll indefinitely. Resume after background PRs merge; this skill is not a scheduler.
Report what merged, what Copilot is fixing, the aggregate issue/PR, pipeline
outcomes, S360 resolution, and any blockers without claiming pending work finished.
