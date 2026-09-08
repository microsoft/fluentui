# Reviewer configuration

`reviewers.json` decides who receives review requests from the `/assign-prs` skill. Edit that file to
change assignment; never edit `SKILL.md`, which deliberately contains no names.

## It is an overlay, not a roster

Team membership is resolved at run time from the GitHub team API. This file only declares which of
those members are eligible for automatic assignment, and which areas each one owns. Both halves are
required: the API says who exists, the file says who to ask.

The `team` field names the team the roster is drawn from. It is deliberately independent of the
`--team` queues the skill reads: this repository grooms two queues but draws every reviewer from one
team, so a build-queue PR can be routed to a component reviewer.

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

`microsoft/fluentui` is a public repository and this config is committed to it. An entry carries a
login, an eligibility flag and areas — deliberately no free-text notes about anyone. The schema sets
`additionalProperties: false` so a commentary field cannot be reintroduced by accident.

When eligibility changes, record the reasoning in the pull request that changes the flag. Review
statistics and comparisons between people belong in that discussion, not in a permanent public file.

## Validating a change

```bash
jq empty reviewers.json
npx ajv-cli validate -s reviewers.schema.json -d reviewers.json --spec=draft2020
```
