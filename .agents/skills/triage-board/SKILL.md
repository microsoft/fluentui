---
name: triage-board
description: Triage items on the Fluent UI Unified project board (org-level GitHub Project at microsoft/projects/395). Fetches open issues across microsoft/fluentui, microsoft/fluentui-system-icons, and microsoft/fluentui-contrib that currently have no `Team` field set on the board, reads CODEOWNERS for each issue's package to route it to the right team (cxe-prg / cxe-red / teams-prg / cxe-coastal / v-build / xc-uxe / fluentui-motion / …), proposes a specific GitHub assignee from the CODEOWNERS line, and applies both via `gh` after the user approves. Use this skill whenever the user asks to triage the Fluent board, route unassigned project items, assign teams to board items, process the board's New column, triage unified board, or any variation of project-board team routing — distinct from the `triage-issues` skill which handles the repo-level `Needs: Triage :mag:` queue.
allowed-tools: Bash Read Grep Glob
---

# Triage the Fluent Unified Board

Your job is to walk the items on `microsoft/projects/395` (the "Fluent UI - Unified" board) that don't yet have a `Team` field set, work out which team owns each one based on `CODEOWNERS`, propose a GitHub assignee, and apply both after the user approves.

This skill is distinct from **`triage-issues`**:

- `triage-issues` handles repo-level issues labeled `Needs: Triage :mag:` (the Shield workflow) — adds labels, assigns area owners, sometimes validates repros, and removes the triage label.
- `triage-board` operates at the **project-board** layer — sets the `Team` single-select field on the board and (secondarily) adds a GitHub-issue assignee. It does not touch labels, does not close issues, and does not alter `Status`.

Both skills can run in the same session without interfering, but don't conflate them.

Operate in **recommend-then-apply** mode: never mutate anything until the user has approved the batch. CODEOWNERS can list multiple candidates per path, and in edge cases (cross-cutting issues, unclear area) a wrong auto-assignment is annoying to undo — the approval gate is worth the extra step.

## Preflight: verify the gh account can write

Two distinct problems can block Step 5 (apply) — both should be caught upfront so the user doesn't spend time reviewing recommendations that can't be applied:

**1. Account identity / repo permission.** The board and its linked repos are under the `microsoft` org; EMU (Enterprise Managed User) tokens typically cannot mutate them even though they can read:

```bash
gh api graphql -f query='{ viewer { login } repository(owner:"microsoft", name:"fluentui") { viewerPermission } }'
```

If `viewerPermission` is `NONE` or the active viewer is an EMU account, stop and suggest `gh auth switch --user <non-emu-account>`.

**2. Token scope for ProjectV2 mutations.** `read:project` is enough to fetch items, but the `updateProjectV2ItemFieldValue` mutation requires the unqualified `project` scope. Check scopes directly — the read-query above will pass even when write scope is missing:

```bash
gh auth status 2>&1 | grep -A0 "Token scopes" | grep -q "'project'," || echo "MISSING_PROJECT_SCOPE"
```

If the check prints `MISSING_PROJECT_SCOPE`, stop and ask the user to run `gh auth refresh -s project` (interactive device flow). Tell them to paste `! gh auth refresh -s project` into the prompt so the output lands in this session. Do not try to attempt the mutation and recover — every apply call will fail the same way and waste time.

Failing loud on either of these is much better than failing at apply time after the user has spent time reviewing recommendations.

## What each item needs

For every untriaged board item, produce a recommendation with:

| Field                  | Possible values                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `repo`                 | `microsoft/fluentui` / `microsoft/fluentui-system-icons` / `microsoft/fluentui-contrib` |
| `issue_number`         | the issue number in that repo                                                           |
| `team`                 | one of the board's Team options (see `references/team-mapping.md`)                      |
| `team_confidence`      | `high` (clear CODEOWNERS hit), `medium` (partial match), `low` (flag for human)         |
| `assignee`             | GitHub login from CODEOWNERS, or `null` if only a team handle appears                   |
| `assignee_reason`      | which CODEOWNERS line gave you the user                                                 |
| `needs_human_followup` | anything you're unsure about — surface it, don't paper over it                          |

Don't invent Team values. The board's Team field has a fixed option set — see `references/team-mapping.md` for the mapping and option IDs. If an item's ownership doesn't map to any listed Team option, mark `team_confidence: low` and flag it for the user.

## The fetch

The board is an org-level ProjectV2 with ID `PVT_kwDOAF3p4s4AD4d_` and project number `395`. Items span three repos. Fetch everything and filter client-side — the GraphQL API doesn't let you filter on "field not set" directly.

The full paginated query is in `references/graphql-snippets.md` under "Fetch untriaged items". Use it as-is; pagination matters because the board has 600+ items and the untriaged subset changes over time.

After fetch, filter to items where ALL of these hold (this matches the board's **"By team"** view — view 6 — which is the canonical triage view):

- `content.__typename === "Issue"` (skip DraftIssue and PullRequest)
- `content.state === "OPEN"`
- No `fieldValues` node has `field.name === "Team"` (i.e. Team is unset)
- No `fieldValues` node has `field.name === "Status"` and value `"✅ Done"`
- Labels do NOT include any of: `Help Wanted ✨`, `Type: Epic`, `Needs: Triage :mag:`, `Resolution: Soft Close`

The label exclusions matter:

- `Needs: Triage :mag:` means the repo-level Shield queue hasn't cleared the issue yet — the `triage-issues` skill handles those first. Assigning a board Team to a repo-level-untriaged issue is premature.
- `Resolution: Soft Close` is applied to stale items that the inactivity bot has closed-adjacent. Routing these to a team wastes cycles on work nobody plans to do.
- `Type: Epic` and `Help Wanted ✨` are intentionally unowned categories on the board — the project owner manages those separately.

To confirm the canonical filter hasn't drifted, sanity-check view 6's `filter` string before a big triage run:

```bash
gh api graphql -f query='{ organization(login:"microsoft") { projectV2(number:395) { view(number:6) { filter } } } }'
```

## Routing logic

### Step 1: identify the owning package/area

For each issue, look at the **body** for the Area/Package field (our issue template has one), the **labels** (a `Package: charting` or `Component: Button` label is a strong signal), and the **title** (component names). For fluentui-contrib and fluentui-system-icons the signal set is smaller — usually the labels carry the area.

If the issue targets a specific package path inside `fluentui`, grep CODEOWNERS for that path:

```bash
# Example: react-combobox
grep -n 'react-combobox' /Users/doidor/src/microsoft/fluentui/.github/CODEOWNERS | head -3
```

For issues in sibling repos (`fluentui-system-icons`, `fluentui-contrib`), fetch that repo's CODEOWNERS:

```bash
gh api repos/microsoft/<repo>/contents/.github/CODEOWNERS -H "Accept: application/vnd.github.raw" 2>/dev/null
```

CODEOWNERS lines look like:

```
packages/react-components/react-tooltip/library  @microsoft/cxe-prg @mainframev
```

The first `@microsoft/<handle>` is the owning team; any `@<individual-user>` entries are the specific owners.

### Step 2: map the team handle to a board Team value

See `references/team-mapping.md` for the authoritative mapping. The confident mappings cover most traffic (`cxe-prg`, `cxe-red`, `teams-prg`, `cxe-coastal`, `v-build`, `fluentui-motion`, `xc-uxe`). Unmapped or ambiguous handles (`charting-team`, `fluentui-admins`, `fluentui-northstar`, `azure-design-engineering`, etc.) → `team_confidence: low`, flag for human.

**Product-override rule — v9 issues never go to cxe-red.** The cxe-red team owns v8 exclusively. If an issue carries the `Fluent UI react-components (v9)` label — even alongside a v8 label, and even when CODEOWNERS resolves to `@microsoft/cxe-red` (e.g. via an older path reference) — route it to `cxe-prg` and flag it for human confirmation. The reverse is fine: v8-only issues stay on cxe-red. When both v8 and v9 labels are present on a single issue, the v9 label wins for routing purposes, since that's where active development happens.

### Step 3: propose a specific GitHub assignee

Prefer the individual user(s) named on the CODEOWNERS line. Rules:

- **One individual + team handle** → propose that individual. This is the common case.
- **Multiple individuals + team handle** → propose the first individual, note the others in `needs_human_followup`.
- **Team handle only (no individual)** → leave `assignee: null` and flag. The user will assign manually since `gh issue edit --add-assignee` doesn't accept teams.
- **Existing assignee on the issue** → don't overwrite. Note the current assignee in the recommendation and only set the Team field.

For cross-cutting issues (issue body mentions multiple components, or the author didn't pick one), default to team-only routing — flag for human rather than guess a person.

## Workflow

### Step 1 — Fetch

Run the preflight auth check, then fetch all project items (paginated). Filter to the untriaged open-issue subset. Print the count and a one-line summary per item (`#<num>` / `<repo-short>` / `<title-truncated>` / current assignees if any). If the list is empty, tell the user and stop.

### Step 2 — Classify

For each item, go through the routing logic. Cache any CODEOWNERS file you fetch (at least per-session) so you don't re-fetch for every item in the same repo.

Don't dump raw CODEOWNERS lines at the user — extract the team + user you care about and move on.

### Step 3 — Present recommendations

Show a single table the user can scan. Suggested columns: `#`, `repo-short` (e.g. `fluentui`, `contrib`, `icons`), `title` (truncated), `team`, `confidence`, `assignee`, `notes`. Group or sort by team so the user can spot clusters — it makes spot-checks faster.

If there are low-confidence items or items needing human follow-up, call those out in a section above the table so they don't hide inside the noise.

### Step 4 — Ask for approval

Ask: "Apply all / apply specific numbers / skip / edit?". Accept `apply all`, `apply 36012 36016`, `skip 35998`, or free-form corrections (e.g. "for #35976 use cxe-prg instead"). Don't proceed to apply until the user responds.

### Step 5 — Apply approved changes

Two mutations per approved item:

**Set the board Team field** (GraphQL mutation; `gh project item-edit` can also do this but GraphQL is more transparent):

```bash
gh api graphql -f query='
mutation($projectId:ID!, $itemId:ID!, $fieldId:ID!, $optionId:String!) {
  updateProjectV2ItemFieldValue(input:{
    projectId: $projectId,
    itemId: $itemId,
    fieldId: $fieldId,
    value: { singleSelectOptionId: $optionId }
  }) { projectV2Item { id } }
}' \
  -f projectId="PVT_kwDOAF3p4s4AD4d_" \
  -f itemId="<PVTI_... from fetch>" \
  -f fieldId="PVTSSF_lADOAF3p4s4AD4d_zgCPFLY" \
  -f optionId="<team option id from team-mapping.md>"
```

**Set the GitHub-issue assignee** (only if the recommendation has a specific user, and the issue doesn't already have an assignee):

```bash
gh issue edit <num> --repo <owner/repo> --add-assignee <login>
```

Apply one item at a time and print a one-line result per item. Do not retry blindly on failure — stop and ask the user what to do. If a specific item fails (e.g. the assignee user isn't in the org), skip it and continue with the rest, then surface the failed ones in the summary.

### Step 6 — Summarize

Print: X items triaged (team set + assignee), Y items team-only (flagged for human to pick an assignee), Z items skipped or failed (with the specific reason per item).

## Anti-patterns

- **Don't touch `Status`.** The user wants items to stay in `🌱 New` after triage — only the Team field changes. Setting Status is out of scope.
- **Don't touch labels** on the underlying issue. Label triage belongs to the `triage-issues` skill.
- **Don't assume a single CODEOWNERS file.** Cross-repo items need the CODEOWNERS fetched from their own repo.
- **Don't guess an assignee for team-only CODEOWNERS lines.** Better to leave `assignee: null` and let the user pick.
- **Don't overwrite existing assignees.** If the issue already has one, respect it — your job is to set the Team, not re-assign work.
- **Don't retry on auth failure.** If the mutation returns `Unauthorized: As an Enterprise Managed User, you cannot access this content`, the whole batch will fail the same way. Surface it and stop.

## Reference files

- `references/team-mapping.md` — CODEOWNERS handle → board Team option (name + option ID) mapping, plus the known-ambiguous handles that should trip `team_confidence: low`.
- `references/graphql-snippets.md` — fetch query for paginated untriaged items, plus the mutation for setting the Team field.
