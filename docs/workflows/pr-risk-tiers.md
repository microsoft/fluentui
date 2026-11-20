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
Review-focus telemetry records actual text presence at every tier; only tiers
2-3 receive a reminder when it is absent.

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

Model calls require verified repository write access or a maintainer-applied
`ai-review` label. A failed permission lookup leaves the author untrusted and
reports the failure; organization membership or author association is not enough.

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

The development-only labeling and scoring scripts live separately in
[v9_review_evals](https://github.com/a-adambednar_microsoft/v9_review_evals/tree/main/evals/risk_tier_evals)
(repository access may be required). Their README contains the commands.
Set `FLUENTUI_CHECKOUT` to the local checkout to exercise its actual classifier,
model transport, and escalation helper. **The workflow has no dependency on that
repository**, and experiments do not write GitHub labels or checks.

Start with a small smoke sample, then compare code-only, Decision, and LLM results
on identical frozen PR inputs. Keep experimental data outside this repository. Use blinded reference
labels with the same policy, and test behavior-preserving/riskier pairs separately
from real PRs. Inspect missed risks, unnecessary raises, coverage, and uncached
cost per assessed PR; AI references are not human ground truth.

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
