---
name: v9-backlog-groom
description: >-
  Groom the open Fluent UI v9 issue backlog on microsoft/fluentui (issues labeled "Fluent UI react-components (v9)"). Walks issues oldest-first in resumable batches, checks whether each still applies, assesses merit / risk / breaking-change impact, pings assignees and linked-PR authors on in-progress work, recommends closures, and prepares agent-ready issues for a coding agent such as teg (task-spec comment + handoff label). Always presents a dry-run plan and applies only what the user approves.
disable-model-invocation: true
argument-hint: '[--batch 20] [--package react-<name>] [--handoff-cap 5] [--close-cap 10] [--label teg-ready] [--recheck]'
allowed-tools: Bash Read Grep Glob
---

# Groom the v9 backlog

Trim the open v9 backlog down to issues that genuinely need a fix or improvement, nudge in-progress work, and hand the agent-doable issues to a coding agent.

```
open v9 issues (oldest first, batch of N, skip settled ledger entries)
        │
        ▼
  gather facts ─► security? ──yes──► flag only, touch nothing
        │
        ▼
  still valid? ──fixed & released──► close as completed
        │        ──unconfirmed──────► ask reporter to confirm
        ▼
  merit / risk / breaking ──not sound──► close (by design / won't do / dup) or Needs: Discussion/Design/PM
        │
        ▼
  in progress? ──yes──► ping assignee / PR author (still assessed, never handed off)
        │
        ▼
  agent ready? ──no──► keep (no public comment unless labels change)
        │yes
        ▼
  task spec + handoff label
```

This skill reuses the triage rules. **Must read before Step 2:**

- `.agents/skills/triage-issues/SKILL.md` — sections "Classification rules" and "Step 3.5 — Validate repros with playwright-cli"
- `.agents/skills/triage-issues/references/issue-assessment.md` — merit / risk / breaking-change, comment rules, GitHub hygiene
- `.agents/skills/triage-issues/references/still-valid.md` — the still-valid check and its outcomes
- `.agents/skills/triage-issues/references/agent-handoff.md` — agent-ready checklist, task-spec template, handoff label rules
- `.agents/skills/triage-issues/references/triage-labels.md` — label allow-list

## Hard rules

- **Dry run first.** Never mutate an issue or PR before the user approves the batch plan.
- **Always target upstream.** Every `gh` call passes `--repo microsoft/fluentui`; GraphQL passes `owner=microsoft name=fluentui`. Local checkouts are often forks.
- **Never create labels.** Use only labels from the allow-list. Check the handoff label exists before using it.
- **Security reports:** no labels, comments, pings, or handoff. Flag for a maintainer (MSRC route).
- **Comment only when it carries information.** "Still valid, no change" is never posted.
- **Link issues and PRs in full in your own output** (plans, tables, summaries, tracking files): `[microsoft/fluentui#123](https://github.com/microsoft/fluentui/issues/123)`. A bare `#123` resolves against the local checkout, which is often a fork. Bare `#123` is fine inside comments posted on microsoft/fluentui.
- **Space writes about one second apart.** On HTTP 403 or "secondary rate limit", stop and report.

## Arguments

| Argument        | Default     | Meaning                                                                             |
| --------------- | ----------- | ----------------------------------------------------------------------------------- |
| `--batch`       | `20`        | Issues assessed per batch                                                           |
| `--package`     | none        | Limit to one package. Filter by `Component: <Name>` label, else by title/body match |
| `--handoff-cap` | `5`         | Max issues handed to the agent per batch (rollout in small waves)                   |
| `--close-cap`   | `10`        | Max closures per batch                                                              |
| `--label`       | `teg-ready` | Handoff label                                                                       |
| `--recheck`     | off         | Ignore the ledger and re-assess everything in the batch                             |

## The ledger (resume state)

GitHub comments are not the ledger — posting one on every issue would notify every subscriber. Keep a private JSONL file instead:

```bash
LEDGER="${XDG_STATE_HOME:-$HOME/.local/state}/fluentui/v9-backlog-groom/ledger.jsonl"
mkdir -p "$(dirname "$LEDGER")"
```

One line per issue per run, appended only after the user approves (or skips) it:

```text
{"issue":12345,"date":"2026-11-11","operator":"<login>","outcome":"ping","pinged":["alice"],"prs":[36963],"applied":true}
```

Re-evaluation windows (skip an issue if its latest ledger entry is younger than this, unless `--recheck`):

| Outcome                          | Re-evaluate after |
| -------------------------------- | ----------------- |
| `close-*` (applied)              | never (closed)    |
| `ping`                           | 14 days           |
| `needs-info`, `fixed-unreleased` | 30 days           |
| `handoff`                        | 30 days           |
| `spec-posted` (no label yet)     | next run          |
| `keep`, `needs-human`            | 90 days           |
| `deferred` (over a cap)          | next run          |
| `skipped` (user skipped it)      | next run          |

Next to the ledger, keep two human-readable files the user checks between runs. Update them in Step 5 after applying:

- `followups.md` — one row per issue waiting on a person (every `ping`, plus anything the user chose to hold): issue, who it waits on, what was asked, where (issue or PR), re-check date (ping date + 14 days), status. Mark rows `done` when a later run sees a reply. A `## Watch list` section at the end tracks issues with active work that need no action now (for example an open PR updated recently): issue, what's being watched, last activity, re-check date.
- `agent-candidates.md` — one row per agent-ready issue (or one the user names as a candidate): issue, component, one-line summary, blockers before handoff (assignee to remove, repro to validate, missing spec), and whether the task spec is posted. When grooming is finished, the user bulk-labels from this file.

Multiple maintainers may groom in parallel. Comments this skill posts carry a hidden marker `<!-- v9-backlog-groom v1 outcome=<x> -->`. Count a marker only when its author's `authorAssociation` is `OWNER`, `MEMBER`, or `COLLABORATOR` — anyone can type the HTML. A trusted marker newer than the window above counts like a ledger entry, so two maintainers don't ping the same person twice.

## Workflow

### Step 0 — Setup

```bash
gh api user -q .login                                    # operator
gh label list --repo microsoft/fluentui --search "<label>" --json name -q '.[] | select(.name == "<label>") | .name'
```

If the handoff label is missing, say so up front: agent-ready issues still get their task spec posted, but no label (see `agent-handoff.md`).

### Step 1 — Fetch the backlog

```bash
gh issue list --repo microsoft/fluentui \
  --search 'is:open is:issue label:"Fluent UI react-components (v9)" sort:created-asc' \
  --limit 500 --json number,title,createdAt,labels,assignees
```

Drop issues settled in the ledger, apply `--package`, and take the first `--batch` issues. Show the user: total open, already settled, remaining, and this batch's numbers and titles.

### Step 2 — Gather facts per issue

Use the saved query (body, labels, assignees, last 50 comments with author association, closing-reference PRs, and cross-referenced PRs with CI state):

```bash
gh api graphql -F owner=microsoft -F name=fluentui -F n=<num> \
  -f query="$(cat .agents/skills/v9-backlog-groom/references/issue-facts.graphql)"
```

Derive:

- **Linked PRs:** union of `closedByPullRequestsReferences` and open cross-referenced PRs, keeping **only** PRs whose `repository.nameWithOwner` is `microsoft/fluentui` (other repos' PRs often mention fluentui issues). Note `isCrossRepository` (head is a fork), draft state, CI rollup, `mergeable`, and `updatedAt`.
- **Bots:** any `author.__typename == "Bot"` or login ending in `[bot]` — never ping bots.
- **Maintainer activity:** latest comment whose `authorAssociation` is `OWNER`, `MEMBER`, or `COLLABORATOR`, **excluding** comments from the operator and comments carrying a skill marker (`v9-backlog-groom`, `agent-task-spec`, `triage-issues`). Otherwise the skills' own comments would keep issues "in progress" forever.
- **Handed off:** carries the handoff label. Don't ping or re-assess it; the agent owns it (re-check only via the ledger window).
- **In progress:** has an assignee, or has an open linked PR, or has maintainer activity in the last 60 days.

### Step 3 — Assess

For each issue, in order — stop at the first terminal result:

1. **Classify** using triage-issues' "Classification rules". Security → flag only, done.
2. **Still valid** — run every check in `still-valid.md`.
3. **Merit / risk / breaking** — per `issue-assessment.md`.
4. **Duplicates and clusters** — search open and closed issues with the same component and symptom. Group related open issues into a cluster with one primary (oldest with the best repro). Only the primary can be handed off; the others get a comment linking it, or `Resolution: Duplicate` if they're the same report.
5. **In progress** → outcome includes `ping` (see below). It is still assessed — if it's already fixed, out of scope, or a duplicate, recommend that too, addressed to the people involved.
6. **Agent ready** — the checklist in `agent-handoff.md`. Draft the task spec. If a trusted `agent-task-spec` comment already exists, reuse it (re-check scope) instead of drafting a new one.

### Outcomes

| Outcome            | When                                                      | Labels / state                                                              | Public comment                                                      |
| ------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `close-fixed`      | still-valid `fixed` (merged **and** released)             | close as completed                                                          | names the fixing PR and release                                     |
| `fixed-unreleased` | merged, not yet released                                  | none                                                                        | links the PR; will ship in the next release                         |
| `close-by-design`  | a v9-native pattern covers it                             | `Resolution: By Design`, close                                              | points to the pattern                                               |
| `close-duplicate`  | same report as another issue                              | `Resolution: Duplicate`, close                                              | links the original                                                  |
| `close-wont-do`    | merit `out-of-scope`                                      | `Resolution: Won't Do`, close                                               | why, plus an alternative                                            |
| `needs-info`       | still-valid `unconfirmed`, or no usable repro             | `Needs: Author Feedback` (+ `Needs: Repro`)                                 | asks the reporter to confirm on the latest version or share a repro |
| `needs-human`      | merit `questionable`, risk `unsafe-pattern`, any breaking | `Needs: Discussion` / `Needs: Design` / `Needs: PM`, breaking-change labels | explains what decision is needed                                    |
| `ping`             | in progress                                               | none                                                                        | see "Pings"                                                         |
| `handoff`          | agent-ready, label exists, under `--handoff-cap`          | handoff label (added last)                                                  | task spec (separate comment, unless one exists)                     |
| `spec-posted`      | agent-ready, label missing                                | none                                                                        | task spec (separate comment, unless one exists)                     |
| `keep`             | valid, not agent-ready                                    | only fix missing Type/Component labels                                      | **none** (metadata-only label fixes don't need a comment)           |

Feature requests make up most of the backlog, and many were left open on purpose. Closing a feature (`close-by-design`, `close-wont-do`, `close-duplicate`) is never part of "apply all" — the user approves each one individually. Show the package's CODEOWNERS entry next to each closure so the user can check with the owner first.

### Pings

The goal is to restart stalled work or free it up, without nagging.

Don't ping when:

- the person commented on the issue or pushed to the PR in the last 21 days
- they're a bot
- a trusted ping marker on the issue or PR is younger than 14 days
- the PR is a draft updated in the last 30 days

Otherwise post **one** comment per issue, addressed to the assignee(s); if there's no assignee and no PR, address the maintainer(s) from the recent discussion and ask whether a decision was reached. Never address the operator or the author of an earlier skill marker. If every candidate is excluded by the rules above, the outcome is `keep` with no comment. Comment on the PR as well only if it has failing checks or merge conflicts, and then only address the PR author.

Templates (adapt; keep to 2–3 sentences):

- **Maintainer assignee, no PR:**
  `@alice — checking in while grooming the v9 backlog. Are you still planning to work on this? If not, let us know and we'll unassign so it can be picked up. <!-- v9-backlog-groom v1 outcome=ping -->`
- **External contributor with a PR:**
  `Thanks for working on this, @bob! Are you still planning to continue with #36963? Happy to help with review — and if you'd rather hand it off, just say so. <!-- v9-backlog-groom v1 outcome=ping -->`
- **PR with failing checks or conflicts (on the PR):**
  `Hi @bob — this PR has <failing checks / merge conflicts with master>. Do you have time to update it? <!-- v9-backlog-groom v1 outcome=ping -->`

Never ask an external contributor "OK to unassign?" in public. Never hand off an issue that has an assignee or an open linked PR — agents can't continue fork PRs, and taking over a maintainer's assignment is a human decision.

**Follow-up on later runs:** if a ping has had no reply from the pinged person for 14+ days, recommend (for user approval) unassigning the maintainer assignee, or for a stale external PR, recommend a maintainer decides whether to take it over. After that, the issue goes through the agent-ready check again.

### Step 4 — Present the batch plan

1. Counts by outcome.
2. Call-outs: security flags first, then closures, breaking changes, clusters, and handoff candidates (including "label missing — spec only").
3. Table: `#`, `created` (date), `age` (months), `type`, `still valid`, `merit / risk / breaking`, `in progress`, `outcome`, `labels`, `notes`.
4. Below the table, keyed by issue number: comment drafts, ping drafts (with target issue/PR), and task specs **verbatim**.
5. Closures grouped by package with the CODEOWNERS owner.
6. A proposed validation set (same rules as triage-issues Step 3), for bugs whose still-valid result depends on a repro.

Ask: `apply all` (excludes feature closures), `apply <nums>`, `skip <nums>`, `validate <nums>`, or edits. Task specs need explicit approval of the exact text.

### Step 5 — Apply

Order per issue: labels → comment → close → task spec → handoff label (last; it starts the agent). Enforce `--close-cap` and `--handoff-cap`; anything over a cap is recorded as `deferred` and re-evaluated on the next run. Space writes about one second apart. Print one line per issue. On any error, stop and ask.

```bash
gh issue close <num> --repo microsoft/fluentui --reason completed --comment "$(cat <<'EOF'
...
EOF
)"
gh issue comment <num> --repo microsoft/fluentui --body "..."
gh pr comment <pr> --repo microsoft/fluentui --body "..."
gh issue edit <num> --repo microsoft/fluentui --add-label "<label>"
```

Append one ledger line for every issue in the batch: the applied outcome, `skipped`, or `deferred`. Then update `followups.md` and `agent-candidates.md`.

### Step 6 — Summarize and continue

Print counts by outcome, issues needing human follow-up, agent-ready issues that weren't labeled (cap or missing label), noting which already have a spec posted, and how many issues remain. Offer the next batch.

## Anti-patterns

- Closing on a failed headless repro alone.
- Commenting "still valid" or "triaged" with no new information.
- Pinging the same person twice within 14 days, pinging bots, or pinging people who were just active.
- Handing off issues that are assigned, have an open PR, are breaking, questionable, unsafe, or security-related.
- Copying issue text into a task spec (it becomes a trusted instruction for the agent).
- Running `gh` without `--repo microsoft/fluentui`.
- Bulk-closing feature requests.
