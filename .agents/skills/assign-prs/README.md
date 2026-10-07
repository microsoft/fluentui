# Reviewer configuration

The `/assign-prs` skill reads `reviewers.json` for `microsoft/fluentui` and one JSON file per
additional repository in `profiles/`. Edit the appropriate profile to change assignment;
`SKILL.md` contains no reviewer names. A default run plans across every configured repository,
while repeatable `--repo owner/repo` selects a subset. The skill is only invoked from this
Fluent UI workspace; other repositories need no copy.

## It is an overlay, not a roster

Team membership is resolved at run time from the GitHub team API. This file only declares which of
those members are eligible for automatic assignment, and which areas each one owns. Both halves are
required: the API says who exists, the file says who to ask.

Each profile's `repo` names its target repository. `queues` lists teams with a pending review
request on an open, non-draft PR; `team` names the one live team the reviewer roster is drawn from. These
are deliberately independent. The Fluent UI profile grooms two queues but draws every reviewer
from one team. `--team` selects a subset of configured queues for a single-repo run, never a
different team's work or reviewer roster.

The two are reconciled on every run and drift is reported in both directions:

- **In the file but no longer on the team** — a stale entry. They never receive a request.
- **On the team but absent from the file** — unconfigured. Under the default `exclude-and-report`
  policy they receive nothing, and the run names them.

Every member of the team is listed, **including ineligible ones**, so that nobody is silently absent.
Removing an entry is not the same as marking it ineligible: an unlisted member is reported as
unconfigured on every run until someone decides.

## Fields

| Field              | Required | Meaning                                                          |
| ------------------ | -------- | ---------------------------------------------------------------- |
| `login`            | yes      | GitHub login, matched against the live team roster               |
| `eligible`         | yes      | Whether this person may receive automatic review requests        |
| `primary`          | yes      | Areas this person owns; selection prefers them here              |
| `secondary`        | yes      | Areas this person can cover when no primary owner is available   |
| `fallbackEligible` | no       | Defaults to `true`. Set `false` to opt out of unclassifiable PRs |

`fallbackEligible: false` means "only ever pick me for an area I actually declare." It exists because
a narrow specialist carries little load by definition, so lowest-load selection would otherwise hand
them every PR that matched no area — the opposite of what declaring a specialty means.

Read it with an explicit presence check, never with jq's `//` operator: jq treats `false` as empty, so
`.fallbackEligible // true` reads every opt-out back as opt-in.

## Areas

The `areas` map defines each area's `paths` and conventional-commit `scopes`. A PR's area is detected
from its changed file paths first, falling back to the commit scope in the title.

Every value in `primary` and `secondary` must be a key of `areas`. JSON Schema cannot express that
cross-reference, so it is checked at run time — a typo such as `ai-skill` for `ai-skills` is not a
validation error, it simply never matches anything.

## This file is public

`microsoft/fluentui` is a public repository and these profiles are committed to it. An entry carries a
login, an eligibility flag and areas — deliberately no free-text notes about anyone. The schema sets
`additionalProperties: false` so a commentary field cannot be reintroduced by accident.

When eligibility changes, record the reasoning in the pull request that changes the flag. Review
statistics and comparisons between people belong in that discussion, not in a permanent public file.

## Validating a change

From the workspace root, run the skill tests and optionally inspect a read-only plan:

```bash
node --test .agents/skills/assign-prs/scripts/planner.test.mjs
node ./.agents/skills/assign-prs/scripts/plan.mjs --repo microsoft/monosize --account LOGIN
```

The tests check every profile against the shared JSON Schema and exercise the planner. Validation also checks
that reviewer area names exist, repos and queues are unique, and logins are unique within a profile.
The plan command is read-only. It verifies GitHub account and permissions, resolves live team
membership, and reports drift and uncovered PRs before anyone approves a review request.

## Adding another repository

1. Add a JSON file to `profiles/` using the same schema. Set a unique `repo`, the specific team
   review queues to groom, and the live `team` whose members may be asked to review. Check the
   queue with GitHub search first; an empty queue may mean the wrong team rather than no work.
2. Define `areas` from that repository's paths and title scopes. Use CODEOWNERS as evidence of
   ownership, not as an automatic eligibility list. PRs without the configured team requests,
   including another team's packages, remain outside this skill's scope.
3. List all live roster members, marking only confirmed reviewers `eligible`. For new areas with
   no confirmed owner, use `areaMatch: "hard"` and let the plan report under-coverage; do not
   silently hand work to a different team. A login may appear in several profiles with different
   eligibility, while its open review load is balanced across the selected repositories.
4. Validate and run a read-only `--repo` plan. Confirm representative PR paths, requested teams,
   permission to request reviews, and the effective reviewer pool with the repository maintainers
   before approving any requests. New or changed plans require a fresh approval.

The initial icons, contrib and monosize profiles intentionally keep eligibility narrow pending
maintainer confirmation. In particular, assets and native platforms in icons and independently
owned contrib packages are not reassigned by a convenient fallback.
