# GitHub and Pipeline Operations

Prefer authenticated tools with equivalent capabilities. CLI examples assume
validated `REPO`, discovered `BASE_BRANCH`, and an explicitly approved scope.
Check `gh auth status` and use the authorized OSS identity; ask before switching
accounts. Corporate ADO authentication is separate. Never request or print tokens.

## Existing PRs

Read current metadata and required checks for every proposed PR:

```bash
gh pr view "$PR_NUMBER" --repo "$REPO" \
  --json number,url,state,isDraft,baseRefName,headRefName,headRefOid,isCrossRepository,mergeable,mergeStateStatus,reviewDecision,statusCheckRollup
gh pr checks "$PR_NUMBER" --repo "$REPO" --required
gh api "repos/$REPO" \
  --jq '{allow_auto_merge,allow_squash_merge,allow_merge_commit,allow_rebase_merge}'
```

Distinguish pending checks from failures; do not interpret every nonzero check
exit as failure. Inspect public-safe failing logs before assigning repair.

### Delegate failing CI

- For a Copilot-authored PR, use its existing session or a supported `@copilot`
  follow-up. Give the failing check, current head SHA, public-safe evidence, and
  instructions to fix the **same branch and PR**, not open another remediation PR.
- For eligible same-repository PRs, GitHub Agent Merge's **Watch and fix** can fix
  failed **GitHub Actions** workflows and conflicts. Use an exposed supported
  operation when available; otherwise report that the maintainer must enable the
  UI control. Do not claim a fabricated REST/GraphQL call enabled it.
- Agent Merge does not support fork or stacked PRs and is not a generic repair
  mechanism for ADO checks. For those, use a verified existing-PR delegation
  integration/session if available; otherwise report the exact delegation blocker.
  Starting an issue-assignment task on the PR branch is not proof it will reuse
  the PR; do not use it as a workaround that silently creates another PR.
- Record the repair request/session and head/check identity. Before retrying,
  inspect the PR timeline or session to avoid duplicate Copilot requests. Requery
  the PR after repair and review the new diff; never disable tests to make CI pass.

[Agent Merge documentation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/get-pull-requests-ready-to-merge)

### Merge or enable auto-merge

Require approval of the PR and reviewed head, full alert coverage, correct target,
non-draft state, and repository-required checks/reviews. Pick a permitted merge
method. This example assumes squash is permitted:

```bash
gh pr merge "$PR_NUMBER" --repo "$REPO" --squash \
  --match-head-commit "$APPROVED_HEAD_SHA"
```

For an approved PR waiting on requirements, use the corresponding `--auto` option
only when auto-merge is supported and desired. `gh pr merge --auto` can merge or
enqueue immediately if requirements already pass, so approval must cover that
effect. Respect a required merge queue and never use `--admin`, approve your own
changes, change repository settings, or bypass required checks/reviews.
Read back PR state and auto-merge/queue status. Agent Merge does **not** itself
enable auto-merge. A changed reviewed head requires renewed approval; if enabling
auto-merge is blocked, retain it as a requested follow-up rather than report success.

## Aggregate issue

Create **one aggregate issue** for all approved No PR fixes and ask Copilot for
**one PR**. Do not create one issue per alert or later roll up competing PRs.
If no uncovered fixes remain, skip this step. Surface incompatible fixes for a
scope decision before dispatch; do not silently split the user's batch.

Use this public marker to find an existing aggregate issue:

```text
<!-- fluentui-dependency-remediation:v1 -->
```

Search existing open issues and linked agent tasks before creating anything.
Inspect bodies for the actual marker and advisory/path coverage; search indexing
alone is not a uniqueness guarantee. Reuse a matching aggregate issue and update
only approved missing fixes. If Copilot is already working, report its session/PR
instead of reassigning it. Adding scope to an active task requires approval.
If another issue/task already handles a fix, link it and avoid duplicate dispatch.

### Public issue template

```markdown
<!-- fluentui-dependency-remediation:v1 -->

## Dependency fixes

Implement all rows together in one pull request against <default-branch>.
Evidence snapshot: <default-branch-SHA>.

| Package   | Public advisory | Affected paths / parents    | Verified repair             |
| --------- | --------------- | --------------------------- | --------------------------- |
| <package> | <advisory URL>  | <manifest / lockfile paths> | <compatible patched target> |

## Acceptance criteria

- Patch every listed affected path; preserve compatible dependency ranges.
- Regenerate the lockfile with the repository's pinned Yarn, without unrelated churn.
- Run immutable installation, dedupe checks, item-specific audit, and relevant Nx
  build, test, lint, and type-check targets, including affected parent/tooling paths.
- Follow the security-fix instructions and add consolidated Beachball changes
  when published packages change.
- Report validation results and any remaining blocked fix in this same PR.
- Do not merge the PR, queue production pipelines, publish packages, or edit S360.
```

Include only publicly shareable evidence. Keep the mapping from internal item
identities to this issue in the ignored local record, never in the issue body.

### Assign Copilot

Check the repository's GraphQL `suggestedActors(capabilities: [CAN_BE_ASSIGNED])`
for the documented `copilot-swe-agent` actor, using its actual ID/login. Inspect
current capability and authentication requirements rather than guessing a bot.
The documented REST assignment login is `copilot-swe-agent[bot]`.

After approval, construct structured JSON using file tools/JSON APIs. The create-
and-assign request supports this shape; replace all placeholders before execution:

```json
{
  "title": "chore(deps): resolve outstanding dependency vulnerabilities",
  "body": "<approved public issue body>",
  "assignees": ["copilot-swe-agent[bot]"],
  "agent_assignment": {
    "target_repo": "<owner/repo>",
    "base_branch": "<discovered default branch>",
    "custom_instructions": "Implement the approved dependency fixes together in one PR. Follow the repository validation requirements. Do not merge, publish, or queue production pipelines."
  }
}
```

```bash
gh api --method POST "repos/$REPO/issues" \
  -H 'Accept: application/vnd.github+json' \
  -H 'X-GitHub-Api-Version: 2022-11-28' --input "$ISSUE_REQUEST_FILE"
```

For a reused issue, add Copilot through `POST repos/<owner>/<repo>/issues/<number>/assignees`
with the `assignees` and `agent_assignment` fields, preserving other assignees.
GraphQL is an alternative; use current documented `agentAssignment` input and
the required `GraphQL-Features` header, not a guessed mutation.

Read back the issue URL/body/assignees and verify assignment actually started or
queued the task. Do not dispatch an additional agent task after assignment.
On an ambiguous create/assignment response, inspect remote state and the local
record before retrying. If creation succeeded but assignment failed, retain the
one issue and report the assignment blocker, not create a replacement.

Discover the resulting PR by issue/session linkage, not just author or branch
name. Verify it covers the aggregate issue at its current head, then apply the
approved merge/auto-merge procedure above. Pending task/PR work requires resume.

[Copilot assignment API](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-via-the-api)

## Production runs

**Do not queue any production run until all covering PRs have merged and every
selected fix is verified at one default-branch commit.** An unresolved item,
pending aggregate task, closed-unmerged PR, or blocked evidence prevents all runs
for the selected scope. A merged fix is not yet authoritative S360 resolution.

Organization: `https://dev.azure.com/uifabric`; project: `UI Fabric`.
[Pipeline folders](https://uifabric.visualstudio.com/UI%20Fabric/_build?view=folders)

| Product        | Allowed stable YAML definition                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| React v8       | [azure-pipelines.release.yml](../../../../azure-pipelines.release.yml)                               |
| React v9       | [azure-pipelines.release-vnext.yml](../../../../azure-pipelines.release-vnext.yml)                   |
| Web Components | [azure-pipelines.release.web-components.yml](../../../../azure-pipelines.release.web-components.yml) |
| React Headless | [azure-pipelines.release.headless.yml](../../../../azure-pipelines.release.headless.yml)             |
| Tools          | [azure-pipelines.release.tools.yml](../../../../azure-pipelines.release.tools.yml)                   |

Select actual pipelines from alert/CG scan mappings, not product-name guesses or
every YAML file. Experimental/nightly and non-release CI are excluded unless the
user approves a demonstrated coverage requirement. All stable definitions declare
boolean `dryRun` defaulting to **false**; set **true** explicitly.

### Discover and approve

Use suitable ADO tools or Azure CLI with its `azure-devops` extension and existing
corporate `az login` authentication. Check access to view builds/definitions and
Queue builds, including required resource authorizations. Report authentication
or permission failures without collecting tokens or changing permissions.

```bash
az pipelines list --org https://dev.azure.com/uifabric \
  --project 'UI Fabric' --output json
az pipelines show --org https://dev.azure.com/uifabric \
  --project 'UI Fabric' --id "$PIPELINE_ID" --output json
```

Verify actual definition name/ID, repository, `process.yamlFilename`, and queue
status. If listings are truncated, use ADO definitions REST pagination; the
`includeAllProperties=true` and `yamlFilename` filters support exact YAML matching.
Ambiguous definitions, paused/disabled queues, or unverified scan mappings block
queueing. Never guess an ID or require the user to manually discover every ID.

Show a run plan with pipeline name/ID, YAML, covered items, branch/commit,
`dryRun=true`, and queue/reuse action. Require separate approval of that plan.
Inspect expanded YAML or current pipeline evidence for publish guards and expected
scan steps. `previewRun=true` only expands YAML; it does not execute scans.

### Queue once and verify

First inspect existing runs. Reuse only a matching pipeline/commit/dry-run run
with the necessary scanning coverage; completed runs must have successful scan
evidence. Deduplicate by `(pipeline ID, commit SHA, dryRun=true)`, not per alert.
Failed/cancelled runs need an approved retry; ambiguous queue responses need remote
readback before another request.

```bash
az pipelines run --org https://dev.azure.com/uifabric \
  --project 'UI Fabric' --id "$PIPELINE_ID" \
  --branch "$APPROVED_REF" --commit-id "$APPROVED_SHA" \
  --parameters dryRun=true --output json
az pipelines runs show --org https://dev.azure.com/uifabric \
  --project 'UI Fabric' --id "$RUN_ID" --output json
```

Use `--parameters`, not `--variables dryRun=true`. Retain the returned run ID/URL
and read back its source ref/SHA and template parameters. If CLI metadata omits
parameters, retrieve the run through the pipeline API before accepting it.
Mismatch is a blocker; never treat a wrong-commit or publishing run as evidence.

REST/tool queueing must set `templateParameters.dryRun` to boolean `true` and
`resources.repositories.self.refName` / `version` to the approved ref/SHA:
`POST https://dev.azure.com/uifabric/UI%20Fabric/_apis/pipelines/<id>/runs?api-version=7.1`.
Do not send `previewRun=true`, skip scanning stages, or enable real publishing.

Finally inspect run outcome, actual CG scan execution/ingestion, and matching
S360 resolution records. Report pending ingestion or scan failures. Follow-up is
bounded and resumable, not an unattended scheduler; no sleeps or infinite polling.

[ADO run API](https://learn.microsoft.com/en-us/rest/api/azure/devops/pipelines/runs/run-pipeline?view=azure-devops-rest-7.1)
[Azure CLI pipeline commands](https://learn.microsoft.com/en-us/cli/azure/pipelines)
[Security-fix instructions](../../../../.github/instructions/dependabot-security-fixes.instructions.md)
