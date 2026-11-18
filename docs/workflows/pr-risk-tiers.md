# Pull request risk tiers

This **label-only pilot** gives each PR one `Risk:` label and a `PR risk assessment`
check. Labels help prioritize review; they never approve a PR, assign reviewers,
skip CI, or replace CODEOWNERS and human approval.

## How it works

The [JavaScript classifier](../../scripts/github/src/risk-tiers.js) uses changed
paths and line counts, not the author's title or claims. The
[path map](../../.github/risk-tiers.json) defines trivial and protected paths.

| Tier         | Rule                                                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 - Trivial  | Only allowlisted package documentation or stories; no tests, snapshots, hidden files, or configuration.                                                           |
| 1 - Low      | Eligible package tests/snapshots, or at most 50 added plus deleted lines in one eligible package's source. Beachball change files do not count toward that limit. |
| 2 - Standard | Other changes, including empty/incomplete file lists or missing text patches except test snapshots.                                                               |
| 3 - High     | Any protected path, including either side of a rename. This takes precedence over every other rule.                                                               |

Eligible source roots are package `library/src/` and `packages/web-components/src/`,
not arbitrary `src/` directories. Protected paths include API reports, manifests,
dependencies, CI/build tooling, core shared packages, and agent instructions.
Keep trivial allowlists narrow; do not allow all Markdown or configuration files.

For tiers 2-3, add a factual `Review focus: ...` line to the PR description. Missing
text produces a reminder, not a policy failure. Operational failures fail the
assessment. The check is tied to the classified head SHA and includes JSON results
for measurement; the existing area labeler runs independently.

The privileged `pull_request_target` workflow executes **base-branch code only**.
It never executes PR-head code, and refuses stale results. Changes take effect
after landing. This check is not a trusted merge gate: any workflow with
`checks: write` can create a check with the same name.

## Optional risk model

For tiers 0-2, the model receives the complete diff, trusted tier criteria, and
deterministic result. Select the backend with `RISK_MODEL_API`:

| Backend              | Output and limits                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `decision` (default) | Native `type: "choice"` API: tier, probabilities, and uncalibrated confidence. 48 KiB request limit; 30-second deadline.                        |
| `responses`          | Azure OpenAI Responses API: strict JSON containing only a tier. No invented confidence/probabilities. 1 MiB request limit; 120-second deadline. |

Both use the same risk policy, validate the response and token usage, never
truncate the diff, and skip the model for tier 3. Their different input limits
affect coverage; compare unassessed cases as well as accuracy.

| Configuration          | Final label                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| No model, default mode | Deterministic tier.                                                                                                             |
| `shadow` (default)     | Deterministic tier; model suggestion is reported only.                                                                          |
| `raise`                | Maximum of the deterministic and model tiers. Unavailable, unauthorized, failed, or oversized assessments mean at least tier 2. |

Model calls require repository write access or a maintainer-applied `ai-review`
label. A failed permission lookup uses a reported association fallback.

To enable the model, repository administrators configure:

- Variables `RISK_MODEL_API`, `RISK_MODEL_ENDPOINT`, `RISK_MODEL_DEPLOYMENT`, `RISK_MODEL_ID`,
  `RISK_MODEL_AZURE_CLIENT_ID`, and optionally `RISK_MODEL_MODE`.
- Secret `AZURE_TENANT_ID` and an Entra application with least-privilege model access.
- GitHub OIDC federation restricted to this trusted workflow. Use
  [subject customization](https://docs.github.com/en/actions/reference/security/oidc)
  so editable PR workflows cannot obtain the identity.

Only HTTPS Azure AI endpoints are accepted. No long-lived model key is used.
Provisioning Azure resources and federation is outside this PR.

## Local experimental validation

Two small development scripts fetch real PRs, generate blind expert labels, and
replay the actual classifier and escalation helper. They **do not write GitHub
labels/checks**. Run from the repository root with Node 22, Yarn, authenticated
`gh`, and `az login` with model access.

Keep all PR snapshots, labels, and reports under ignored `.cache/`; commit only
the scripts/tests/docs. Freeze a sample before labeling or tuning rules:

```sh
mkdir -p .cache/pr-risk-eval
gh pr list --repo microsoft/fluentui --state merged --limit 100 \
  --json number --jq 'map(.number)' > .cache/pr-risk-eval/prs.json
```

**1. Fetch and label.** Set `RISK_EXPERT_ENDPOINT` to an Azure OpenAI Responses URL
ending in `/openai/v1/responses`, and `RISK_EXPERT_DEPLOYMENT` to your expert model.

```sh
yarn nx run scripts-github:risk-eval-label \
  --args=".cache/pr-risk-eval/prs.json .cache/pr-risk-eval/labels.json"
```

The expert sees full diffs and the shared policy, not classifier predictions or
other experts' labels. Its target is the **final policy tier**, including semantic
escalation, not content risk alone. Structured output is validated. The local JSON records
PR revisions, inputs, rubric hash, returned model IDs, labels, and token usage.
Progress is saved after each PR; rerun the same command to resume. To label the
same snapshots with another expert, use the existing labels JSON as the first
argument and a new output file. Compare only matching reference protocols and
input coverage; older partial-diff or content-risk rubrics are legacy diagnostics.

For PRs over GitHub's full-diff API limit, the labeler fetches commit objects and
reads a Git diff without checkout, external diff drivers, or text conversion.
It verifies the changed-file set. The scorer still preserves the production
API-unavailable fallback rather than pretending the workflow could fetch that diff.

**2. Run the classifiers.** Set `RISK_MODEL_ENDPOINT`, `RISK_MODEL_DEPLOYMENT`,
and `RISK_MODEL_ID`. Leave `RISK_MODEL_API=decision` for the native endpoint, or
set it to `responses` with an Azure OpenAI Responses endpoint and an LLM deployment.

```sh
yarn nx run scripts-github:risk-eval-score \
  --args=".cache/pr-risk-eval/labels.json .cache/pr-risk-eval/results.json"
```

Use a different results filename for each backend/model. Each run reports Code
only alongside the selected AI backend, so the same frozen inputs support a
Code-only / decision-model / LLM comparison without another script.

For quota-limited deployments, set `RISK_EVAL_DELAY_MS` to pace local model calls
(0 by default, up to 60000). The delay is recorded and adds no production retries.

For constructed paired cases, use local case IDs and pass a frozen labels JSON with a top-level `pairId`
on each row and policy-expected reference tiers verified by executable checks.
The scorer checks matching paths/tiers and exactly two cases per pair before
inference, then reports whether both cases were correct. Keep these diagnostic
results separate from real PRs; no sampling confidence interval is assigned.

Code only makes no inference calls and uses **zero tokens**. Code + AI uses the
production raise/failure policy, authorizing all sample PRs for this offline
comparison. This does not test Actions authentication or authorization.
Results include exact tier agreement, Wilson 95% intervals, and mean tier
difference (`classifier - expert`); positive means higher tiers on average.
Opposing errors can cancel, so inspect mismatches as well as averages.

Expert-labeling usage is reported separately from pipeline usage. Input, cached
input, and output tokens come from API responses; output already includes
reasoning tokens. Rejected answers still count valid reported usage; they remain
unassessed. Missing usage or unverified model identity makes total cost unknown.
USD estimates are `null` unless you
supply verified `INPUT_USD_PER_MILLION`, `OUTPUT_USD_PER_MILLION`, and `PRICE_SOURCE`
variables prefixed with `RISK_EXPERT_` or `RISK_MODEL_`. Also supply
`CACHED_INPUT_USD_PER_MILLION` when cached input is billed separately. These are
estimates, not billing statements.

Use a small smoke sample first, then the frozen full-diff sample. Reuse identical
inputs across experts and run a new results file after code/model changes.
AI reference labels are not human ground truth; review disagreements with
maintainers before enabling raise mode.

## Checks and rollout

```sh
yarn nx run scripts-github:test --runInBand
yarn nx run-many --projects=scripts-github --targets=lint,type-check
```

`@microsoft/fluentui-react-build` owns the pilot. Start with rules only, then
measure the model in shadow mode. Before expanding, track maintainer-labeled
agreement, missed high-risk changes, unnecessary escalations, latency, and cost.
Passing local evaluation does not verify the new default-branch workflow or
Azure federation. Automated approvals and reduced human-review requirements
are not part of this pilot.
