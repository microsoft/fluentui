---
name: s360-remediation
description: >-
  Compare Component Governance and GitHub Dependabot inventories and remediate
  their critical/high union. Verify advisory validity and dependency paths,
  summarize Merged / In PR / No PR, repair existing PRs or dispatch one aggregate
  Copilot PR, and verify scans after approved merges and production dry runs.
disable-model-invocation: true
argument-hint: '[item-id-or-url ...] [--repo owner/repo] [--cg-url URL] [--cg-scope all|production] [--compare-only] [--wait-minutes 0-30]'
---

# S360 Remediation

Compare both security inventories, show critical/high fix status, then act on
the approved summary. A skill is an agent-run procedure, not a scheduled service.
Creating this skill or invoking it is not approval to change GitHub or queue builds.

## Inputs and prerequisites

- Default repository: `microsoft/fluentui`. Discover its current default branch.
- `--cg-url` supplies the approved CG portal view; validate its repository and
  branch. A governed repository ID is **not** an ADO work-item ID.
- `--cg-scope all|production` defaults to `all`: retrieve production and
  non-production/stale inventories separately. Preserve the supplied view's
  pipeline scope as a separate comparison, not a filter silently applied to GitHub.
- `--compare-only` stops after the inventory comparison and dispositions, before
  PR actions, issue creation, agent dispatch, merges, or pipeline runs.
- Optional work-item IDs or URLs restrict the remediation selection, not the
  comparison inventory. Label such a run partial; never claim it covers all alerts.
- Without a CG URL, resolve an approved runtime CG source or ask for one.
  Repository-tagged ADO work items can supplement discovery but cannot prove CG
  inventory parity.
- Resolve `ADO_ORG_URL`, `ADO_PROJECT`, and the discovery filter `ADO_SECURITY_TAG`
  from supplied context, environment, or approved ignored local configuration.
  Require the tag only for tag-based work-item discovery. Ask for missing values;
  never guess or embed private defaults in this skill.
- Validate supplied item URLs against that organization/project. Derive pipeline
  links at runtime; do not publish internal links or configuration in GitHub.
- Parse `$ARGUMENTS`; reject unknown options, invalid `owner/repo`, nonpositive item
  IDs, mismatched item URLs, or a wait duration outside 0-30 minutes. Default wait: 0.
- Use existing corporate `az` authentication as the primary route for ADO item
  discovery and retrieval, with `az rest` for documented API operations. Follow
  [S360 investigation](./references/s360-investigation.md).
- Authenticated status integrations are optional enrichment, not a prerequisite.
  Load available deferred tools without requiring a particular private interface.
- Distinguish a missing connector from an actual authentication/permission error.
  Do not declare all item access blocked based only on tool absence or
  `az account show`; probe the ADO work-item API. Never invent data or request tokens.

## Flow

### 1. Compare security inventories

Follow [Inventory comparison](./references/inventory-comparison.md). Retrieve all
open Dependabot alerts and active CG security alerts, including development
dependencies. Exclude legal/license alerts from security counts. Report common,
CG-only, GitHub-only, and unmatchable identities, severity disagreements, source
timestamps/commits, pipeline scope, raw counts, and unique advisory/package counts.

Select the union where **either source** reports critical or high severity; never
use only the intersection or require a linked S360 work item. Preserve all affected
versions/paths and source IDs when grouping fixes. Lower severities are comparison
context, not remediation scope. Verify withdrawn advisories and scanner disagreement
before proposing a repair. Missing source access makes coverage partial, not empty.

Retrieve linked ADO evidence using [S360 investigation](./references/s360-investigation.md)
when needed. ADO state is not authoritative S360 activity. A live CG alert is not
proof that its dependency version is still present on the current default branch.
Stop here for `--compare-only`.

### 2. Generate the summary

Compare every affected dependency version against public advisory ranges at a
recorded default-branch commit. Inspect related PR contents, not just titles.
Keep comparison membership separate from fix status: a GitHub-only alert may need
repair, while a CG-only alert may already be patched or have a withdrawn advisory.

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
- Record withdrawn/recalled advisories separately with authoritative evidence,
  without upgrading, dismissing, or changing ADO state just to equalize inventories.
- Non-production/stale records absent from the current dependency graph are
  **stale scan candidates**, not automatic upgrade requests or proven resolutions.
- No published patch is not a successful mitigation. Verify parent upgrades,
  removal/replacement, or an upstream-supported workaround; otherwise report the
  item blocked. Do not invent a secure target or force an incompatible major.

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

Confirm scan execution and check authoritative CG/S360 status through a documented
authenticated API (including `az rest`), portal evidence, or an approved integration.
If unavailable, report S360 resolution unverified, not resolved. This does not
block investigation, approved fixes, or dry runs. Never edit S360/ADO status.

## Follow-up

Keep an ignored local run record under `tmp/s360-remediation/` with both source
inventories, comparison dispositions, selected identities, evidence commit,
issue/PR links, desired auto-merge, approvals, and run
IDs. Confirm it is Git-ignored before writing; never commit internal alert data.
Requery before mutations and after ambiguous API responses to avoid duplicates.
Changed scope, PR content, or pipeline commit requires renewed approval.

Default follow-up reads current state once and reports pending work. An explicit
wait uses available tool wait facilities within its deadline; do not sleep or
poll indefinitely. Resume after background PRs merge; this skill is not a scheduler.
Requery both sources after verification. Report repository fixes, Dependabot
closure, CG scan ingestion, and S360 resolution separately; none implies the others.
Report what merged, what Copilot is fixing, the aggregate issue/PR, pipeline outcomes,
remaining critical/high identities, and blockers without claiming pending work finished.
