---
name: assign-prs
description: >-
  Assign reviewers to open pull requests awaiting review from the Fluent UI team queues across microsoft/fluentui, fluentui-system-icons, fluentui-contrib and monosize. Routes each PR that lacks coverage by area ownership and then lowest current review load, requesting only the shortfall. Always presents a dry-run plan and requires explicit approval before requesting a review.
disable-model-invocation: true
argument-hint: '[--repo owner/repo ...] [--team org/slug ...] [--account login] [--reviewers count] [--stale-days days]'
allowed-tools: Bash Read Grep Glob
---

# Assign PRs

Groom the team review queues by getting a human reviewer onto every PR that needs one. Route by area ownership, balance by current review load, and request only the shortfall. The default operation is read-only. Never request a review until the user explicitly approves the plan.

This skill does one thing. It does not approve, merge, close, or comment on anything — for Dependabot updates use `/dependabot-rollup`, which combines compatible updates into a single reviewable branch.

## Defaults

| Argument       | Default                           | Purpose                                                    |
| -------------- | --------------------------------- | ---------------------------------------------------------- |
| `--repo`       | All four configured repositories  | Repository to read; repeat to select a subset              |
| `--team`       | Queues in each repository profile | Queue to read; repeat for a single repo to select a subset |
| `--account`    | Active `gh` account               | GitHub account the run acts as                             |
| `--reviewers`  | `1`                               | Reviewers to assign per PR, minimum 1                      |
| `--stale-days` | `90`                              | Age past which a PR is reported but never assigned         |

Parse overrides from `$ARGUMENTS`. Reject an invalid repository name, a `--reviewers` value below 1, a non-integer `--stale-days`, or unknown arguments instead of guessing. `--repo` is repeatable. Without it, plan all four repositories in `reviewers.json` and `profiles/*.json` beside this file. Reject unknown repositories instead of reading an arbitrary repo with the wrong profile.

`--team` is repeatable but requires exactly one `--repo`, and selects only a subset of that repository's configured queues: passing it once reads exactly one queue rather than adding another. Collect the validated values into `TEAMS`, each as `org/slug`. Note that this selects which queues to read, not who may be assigned — the reviewer roster comes from the team declared in that repo's profile, as Step 4 explains.

## Step 1 - Check prerequisites

Every command runs as `ACCOUNT`. Several accounts are commonly authenticated at once, and `gh` applies whichever one is active, so a run can silently request reviews as the wrong identity. Resolve the active account before anything else:

```bash
gh auth status --active
```

`ACCOUNT` defaults to whatever that returns. **Name the resolved login in the plan and have the user confirm it before any mutation.** This is a confirmation, not an assertion — the skill has no expected identity to check against, so it cannot detect a wrong-account run on its own. The user is the only thing standing between a stale `gh auth switch` and a batch of review requests sent from the wrong person.

Pass `--account` to state the expected login explicitly and get the stronger check back: stop if the active login is not the one given. Report it and offer the switch rather than performing it silently, because switching changes the identity for every other `gh` process on the machine:

```bash
gh auth switch --user "$ACCOUNT"
```

Also confirm the token carries `read:org`, which Step 4 needs to resolve the team roster.

The account must then have `push` or `triage` permission on **each selected repository**. Requesting a reviewer fails on a read-only token, and the failure message is misleading: GitHub reports a `ReplaceActorsForAssignable` permission error rather than an authentication error.

```bash
gh api "repos/${REPO}" -q '.permissions'
```

Stop and report if `push` and `triage` are both `false` for any selected repository.

## Step 2 - Fetch the queues

Use the search API directly so `draft:false` is honored. The `gh pr list` and `gh search prs` shortcuts do not reliably apply the draft filter and will pull draft PRs into the queue:

```bash
for TEAM in "${TEAMS[@]}"; do
  gh api --method GET search/issues \
    -f q="is:open is:pr repo:${REPO} team-review-requested:${TEAM} draft:false" \
    -f sort=updated -f order=desc -f per_page=100 \
    --jq '.items[] | {number, title, user: .user.login, updated_at}'
done
```

Run that query for each selected repo and its configured queue teams. The skill's [planner](./scripts/plan.mjs) handles pagination and validates every local profile. From the workspace root:

```bash
node ./.agents/skills/assign-prs/scripts/plan.mjs --account LOGIN
# Optionally add --repo microsoft/monosize, or repeat --repo to select a subset.
```

**Build the qualifier string from the validated `REPO` and `TEAM` values, and never from a literal.** A single-quoted query with the repository baked in ignores `--repo` entirely, so discovery reads one repository while the mutations in the final step, which do honour `--repo`, write to another. The queue then holds PR numbers from the wrong project and every number resolves to an unrelated PR that happens to share it. Use `--method GET` with `-f q="..."` as above so `gh` form-encodes the qualifiers; hand-glued `+` separators in a query string silently mis-encode any value containing a space or a slash.

**Deduplicate by `(repo, PR number)` across the queues.** The queues overlap substantially; a PR requesting review from more than one team must be considered once and assigned once. Different repositories may have the same PR number. Record which queue or queues each PR came from so the report can show it.

### What these queries do and do not cover

`team-review-requested:` matches only open, non-draft PRs with a review request still pending for that team. A team that reviewed earlier or had its request removed is no longer in the queue. Two consequences worth stating in the report:

- **The queue is a point-in-time snapshot.** PRs are opened while the plan is being reviewed, and a long approval pause means the batch no longer matches reality. Re-fetch every queue immediately before applying; if the plan changes, present it and obtain fresh approval instead of silently assigning new arrivals. Timestamp the snapshot in the report so the gap is visible.
- **A PR that never requested one of these teams is invisible here**, however badly it needs a reviewer. The repositories carry more open PRs than these queues contain; the rest belong to other teams and are out of scope. Report each queue size against that repository's total open non-draft PR count so the boundary is explicit and nobody reads a clean queue as a clean repository.

## Step 3 - Partition the queue

Split the deduplicated set into three buckets. A PR belongs to exactly one:

1. **Dependabot** - author is `dependabot[bot]` or `app/dependabot`. Reported, never assigned.
2. **Stale** - last updated more than `STALE_DAYS` ago. Reported, never assigned.
3. **Assignable** - everything else.

Only the third bucket is acted on. The other two are **exclusions, not workstreams** — this skill neither merges nor closes anything, and the report says how many PRs each bucket held so the queue's real shape stays visible.

Both exclusions earn their place:

- **Dependabot PRs do not need a human reviewer each.** These queues are mostly dependency bumps, so assigning them would hand a small pool dozens of review requests that no human judgement improves. Point the reader at `/dependabot-rollup`, which combines compatible updates into one reviewable branch.
- **Stale PRs do not benefit from another reviewer.** Piling a request onto a PR idle for months creates noise, not throughput; these queues contain PRs several years old. Report them so someone can decide their fate, and leave that decision to a human.

## Step 4 - Plan reviewer assignments

Resolve team members at run time rather than hardcoding a roster, because membership changes. The roster comes from the `team` in **each repository's profile**, not from `--team`:

```bash
TEAM_ORG="$(jq -r '.team.org' "$CONFIG")"
TEAM_SLUG="$(jq -r '.team.slug' "$CONFIG")"
gh api "orgs/${TEAM_ORG}/teams/${TEAM_SLUG}/members" --paginate -q '.[].login'
```

**`--team` and the config's `team` answer different questions.** `--team` selects which queues to read — whose PRs need attention. The config's `team` selects who may be assigned. They are deliberately allowed to differ: this repository grooms two queues but draws every reviewer from one team, so a build-queue PR can be routed to a component reviewer. Resolving the roster from the union of the queue teams instead would report every member of the second team as unconfigured on every run, which is noise, not drift.

This needs only `read:org`. If it fails, stop and report; do not fall back to a stale hardcoded list. A roster that resolves to zero members is a fault, not an empty pool.

### Reviewer configuration

Everything about _who_ reviews lives in the selected repo's profile (`reviewers.json` for fluentui, `profiles/*.json` for the other repos), and `README.md` documents its fields. This document deliberately contains no names — to change who receives assignments, edit the profile, never this one. The profiles are an **overlay, not a roster**: the API says who exists, the file says who to ask. Never load policy from a PR branch.

The planner validates all profiles before reading a queue or contacting GitHub. When changing this skill, run the tests described in `README.md`; a normal planning run does not need a separate test command.

The shared schema covers structure and `additionalProperties: false` prevents a free-text field about a person from being introduced. JSON Schema has no keyref, so the validator also checks that every entry in `primary` and `secondary` is a key of `areas`, that repos and queues are unique, and that logins are unique within a profile.

**If a profile is missing, unparseable, fails schema validation, declares an undeclared area, or yields zero eligible live reviewers, stop and report the specific fault.** Never fall back to an inline list — that reintroduces the hardcoding this design removes. Assigning to a guessed reviewer is worse than assigning to nobody, because it looks like the config was consulted.

Report each repo's effective pool size at the top of the plan, because shrinking the roster concentrates load: at `REVIEWERS=1` a 19-PR queue still lands roughly 5 new reviews on each of 4 eligible people, and raising `REVIEWERS` multiplies that directly.

### Reconcile the config against the live roster

The two sources drift as people join and leave. Compare them for **each repo** and report both directions:

- **In the config but no longer on the team** — a stale entry. Never request a review from them; report so the entry can be removed.
- **On the team but absent from the config** — unconfigured. Under the default `unknownMemberPolicy` of `exclude-and-report` they receive nothing, and the run says so by name.

The second case is the one that matters. Treating an unknown member as eligible would silently route human review work to an account the config knows nothing about — it may be a manager, a service account, or someone who joined for an unrelated reason. Excluding them is safe but only stays visible if the report names them, so it must never be folded into a summary count.

### Eligibility means "reviews", not "is on the team"

Before marking anyone `eligible`, check that they actually review **in that repository**. An account can accumulate hundreds of review requests through CODEOWNERS while submitting almost none:

```bash
gh api "search/issues?q=repo:${REPO}+reviewed-by:${LOGIN}&per_page=1" --jq .total_count
gh api "search/issues?q=repo:${REPO}+review-requested:${LOGIN}&per_page=1" --jq .total_count
```

A ratio near zero matters because an eligible member counts toward `existing_coverage` on any PR that already requests them **in an area they serve**. Marking a non-reviewing account eligible therefore suppresses the real assignment those PRs needed, inside that area. Coverage is area-scoped precisely to bound this, so an account that CODEOWNERS requests across the whole repository only distorts the areas it actually claims — but the bound is only as tight as its area list. Keep such an account's `primary` and `secondary` narrow, and set `fallbackEligible` to `false` so it never absorbs unclassified work either.

Where an area's declared owner does not review in practice, give the area to someone who does as well. Profiles hold no free-text field, so name the substitution in the run's report — read cold, the config shows both as owners with nothing to indicate one is standing in for the other.

**Report those ratios in the run, never try to record them in a profile.** The configs are committed in a public repository, so they deliberately give you nowhere to put them. A measurement that justifies a decision in conversation becomes a permanent public statement about a named person once committed. Change the `eligible` flag, and explain the change in the pull request that makes it.

A typo'd login in the config surfaces here too: it appears as a stale entry on one side and an unconfigured member on the other. When diffing the two lists with `comm`, sort both sides with the same collation — `jq` sorts ASCII (uppercase first) while shell `sort` follows the locale, so mixed-case logins land in different positions and `comm` reports every name as drifted in both directions at once. That symptom is diagnostic: identical non-empty lists under both headings means the sort, not the roster, is wrong.

```bash
gh api "orgs/${TEAM_ORG}/teams/${TEAM_SLUG}/members" --paginate -q '.[].login' | LC_ALL=C sort > live.txt
jq -r '.reviewers[].login' "$CONFIG" | LC_ALL=C sort > cfg.txt
LC_ALL=C comm -13 live.txt cfg.txt   # stale entries
LC_ALL=C comm -23 live.txt cfg.txt   # unconfigured members
```

### Route by area, then by load

Each reviewer declares `primary` and `secondary` areas; each area declares the `paths` and conventional-commit `scopes` that identify it. Detect a PR's area from **changed file paths first**, falling back to the conventional-commit scope in the title (`feat(react-button): …` → `react-button`). Paths are authoritative because a title scope is free text and is occasionally wrong or absent. A PR matching nothing has no area.

**Score each file against the most specific pattern that matches it, then total per area — never count a file toward every area whose pattern matches.** Area paths nest: `packages/react-components/react-headless-components-preview/**` sits inside `packages/react-components/**`, so every headless file also matches `components`. Counting matches per area therefore guarantees the broader area wins any nested case by construction, and a purely headless PR routes to `components`.

Assign each file to exactly one area — the one whose matching pattern has the longest literal prefix — and only then take the area holding the most files. Ties go to the more specific area. Take a pattern's literal prefix as everything before its **first** `*`, not merely by stripping a trailing `/**`. Patterns carry mid-string globs — `packages/react-components/react-motion*/**` is one — and trimming only the tail leaves a `*` inside the prefix, so it matches nothing and the area silently never fires.

Ignore `change/**` beachball files when counting. Every fluentui PR carries them, they encode the package name in the filename rather than the path, and including them dilutes the signal without ever identifying an area.

Expect path and scope to disagree, and trust the path. A GitHub Action bump is titled `chore(deps)` but edits `.github/workflows/**`, so it is build work wearing a dependencies label; an npm bump with the same title touches only `yarn.lock` and really is a dependencies change. The disagreement is information, not noise.

**Resolve overlapping patterns by specificity, never by declaration order.** Areas overlap heavily: `react-headless-components-preview` matches both the `headless` area exactly _and_ the `components` area's `react-*` glob, and `react-motion-components-preview` matches both `react-motion*` and `react-*`. Rank candidates so that an exact match beats a glob, and a longer glob prefix beats a shorter one:

```
score(scope, pattern) = 1000 + len(pattern)   if pattern == scope
      len(pattern)          if pattern is a prefix glob that matches
      no match              otherwise
```

Taking the first match in file order instead produces silently wrong routing that looks correct on the common cases — `react-motion` lands in `components`, and `headless` only wins by the accident of being declared first. Apply the same specificity rule to path patterns.

Build the tier for selection:

```
pool  = (live roster ∩ config eligible) − author − already requested − already reviewing
tier  = pool ∩ reviewers whose PRIMARY   areas include area
  else pool ∩ reviewers whose SECONDARY areas include area
  else pool ∩ reviewers where fallbackEligible is not false, only if no eligible owner declares area
```

A reviewer may set `"fallbackEligible": false` to opt out of that last tier. They are then only ever selected for an area they actually declare, and never absorb work that matched nothing. This exists because a narrow specialist carries little load by definition, so lowest-load selection would otherwise hand them every unclassifiable PR — the opposite of what declaring a specialty means. The field is optional and defaults to `true`.

Read that flag with an explicit presence check, never with jq's `//` operator:

```bash
jq -r '.reviewers[] | select(.eligible)
       | select((has("fallbackEligible") | not) or .fallbackEligible)
       | .login' "$CONFIG"
```

`.fallbackEligible // true` is wrong and fails silently: jq treats `false` as empty, so the alternative fires and every opted-out reviewer reads back as opted-in. Note the parentheses around `has(...) | not` as well — without them the pipe binds first, `.fallbackEligible` is applied to a boolean, and jq aborts with `Cannot index boolean`. The same trap applies to any boolean in this file that defaults to true.

The final fallback tier is what makes `areaMatch: "preference"` different from `"hard"`. The eligible pool is small, and some areas are owned by other teams entirely, so at any moment an area may have no declared owner. A strict filter would report those PRs under-covered while a capable reviewer sat idle; preference mode degrades to the pool instead. Under `"hard"`, an empty tier is left under-covered rather than filled. An owner who is unavailable on a particular PR does not turn that area into an unowned one. An area that repeatedly reaches the fallback tier is a gap in its repo profile, not a property of the work — give it an owner rather than letting selection default.

Then pick from the tier by **lowest current open-review load across selected repositories**, using a stable login tie-breaker so an unchanged plan can be approved by fingerprint. A blind random draw over a small pool skews badly and self-reinforces: it repeatedly lands on whoever is already busiest, and the excess trains the team to ignore review notifications. Report the load column alongside the number of requests this batch adds so a lopsided result is still visible before approval.

For each assignable PR, build the eligible pool by removing:

- **The PR author.** GitHub rejects a review request for the author's own PR, and this is the most common cause of a failed batch. Team members author many of the PRs in these queues. This applies to **any** calculation of coverage, including a quick pre-flight check before a mutation — an author who has self-reviewed still counts for nothing, and a guard that forgets this will skip a PR that genuinely needs a reviewer.
- **Existing requested reviewers**, individual or team, so the same person is not asked twice.
- **Anyone who has already submitted a review** on that PR.

### Assign only the shortfall

Never assign a fixed `REVIEWERS` per PR. Count what the PR already has, and request only what is missing:

```
serves(area)      = eligible reviewers whose primary or secondary areas include area,
        or — when no eligible reviewer declares that area — every eligible
        reviewer whose fallbackEligible is not false (in preference mode)
existing_coverage = reviewers in serves(area) already requested on the PR or already reviewing it
shortfall         = max(0, REVIEWERS - existing_coverage)
```

Select `shortfall` logins from the tier described above — area match first, then lowest load. When `shortfall` is `0`, **request nobody** and report the PR as already covered.

This is the single most important rule in this step. A PR that already has a team member on it does not need a second, and assigning one anyway is the default failure mode of this skill: most PRs in these queues already carry a reviewer, so a naive fixed-size assignment inflates a batch several times over and dumps the excess on a small pool. Excess requests are worse than useless — they train the team to ignore review notifications.

**Coverage is area-scoped: being requested on a PR only counts if the person serves that PR's area.** Note that `serves(area)` does not cascade the way selection does — selection prefers a primary owner over a secondary one, but for coverage either counts, because either would be a legitimate review. Without this scoping, one account that CODEOWNERS requests across the whole repository would mark nearly every PR "already covered" and silently suppress the assignments they needed, in areas that account never works in. Area ownership is already declared in the repo profile, so use it on both sides of the calculation rather than treating any request as coverage.

`existing_coverage` counts only members of the eligible pool defined by the repo profile. A review request aimed at the whole team is what put the PR in this queue, so it never counts toward coverage; neither does a bot review, nor a reviewer outside the team, nor an eligible member requested on a PR outside the areas they serve, nor the author's own review of their own PR.

### Judge coverage, not pool size

A small or empty pool usually means the PR is already well covered, not that it needs attention. Compute **effective coverage** for each PR:

```
effective_coverage = (reviewers in serves(area) already requested or already reviewing)
         + (newly selected reviewers)
```

- Report a PR as **under-covered** only when `effective_coverage < REVIEWERS`. That is the condition a human needs to act on, and it means the pool ran dry before the shortfall was filled.
- When `shortfall` is `0`, report the PR as **already covered** and make no request. This is a normal, healthy outcome, not a failure, and it is expected to be the majority of a mature queue.
- When the pool is smaller than `shortfall`, select everyone available. Never pad the selection with an ineligible login.

Flagging on pool size alone produces false warnings on exactly the PRs that are in the best shape.

Compute each member's current open-review load across the deduplicated queues of **all selected repos** and include it in the report, alongside the number of requests this batch would add. Selection is area-then-load rather than a blind draw, so a lopsided batch is now a signal that something is wrong rather than ordinary variance — check whether one area is absorbing the whole queue, or whether the shortfall rule is being ignored. If the batch total looks large relative to the number of under-covered PRs, that is a symptom of ignoring the shortfall rule — recheck it before presenting the plan.

The skill-local runner implements these calculations and returns JSON containing `account`, `snapshotAt`, `fingerprint`, repo/queue counts, roster drift, current/planned load per login, excluded counts and assignable PR rows. The fingerprint includes the full internal snapshot, even though excluded PR details are summarized. The runner only reads GitHub; no review requests are made.

## Step 5 - Present the dry-run plan

Show the whole plan before touching anything:

```markdown
## Reviewer assignment plan

- Account: confirmed-login
- Repositories: microsoft/fluentui, microsoft/monosize (snapshot time and fingerprint)
- Queues: fluentui cxe-prg (25), build (51), 62 unique; monosize build (11), 11 unique
- Eligible reviewers after exclusions: by repo; include roster drift even when clean
- Assignable: 18 | Dependabot (not assigned): 40 | Stale (not assigned): 4

### Reviewer assignments

| PR                     | Author | Queue   | Area       | Reviewers to add  | Match     | Coverage |
| ---------------------- | ------ | ------- | ---------- | ----------------- | --------- | -------- |
| microsoft/fluentui#123 | alice  | cxe-prg | headless   | bob               | primary   | 1        |
| microsoft/monosize#124 | dave   | build   | core       | carol             | secondary | 1        |
| microsoft/fluentui#125 | erin   | cxe-prg | components | (already covered) | -         | 2        |

### Not assigned

| Bucket     | Count | Note                                           |
| ---------- | ----- | ---------------------------------------------- |
| Dependabot | 40    | use `/dependabot-rollup`                       |
| Stale      | 4     | idle more than 90 days; needs a human decision |
```

Show the config-reconciliation line for **each repo** even when it is clean, so silent drift is never mistaken for an absent check. When it is not clean, replace it with the detail and list affected logins by name:

```markdown
- Config for microsoft/fluentui: 1 stale entry (`oldperson` left the team), 1 unconfigured member (`newperson` — receiving nothing until added to its profile)
```

The `Match` column records whether the chosen reviewer owned the area as `primary`, as `secondary`, or whether selection `fell back` to the whole pool because nobody owned it. A column full of fallbacks means the area map in that profile no longer reflects what the team actually works on, and is the signal to update it.

The `Coverage` column counts only reviewers who serve the PR's area, so it can read lower than the reviewer list GitHub shows. When a PR is assigned despite already carrying an eligible reviewer, say which reviewer was discounted and for which area — otherwise the row looks like the shortfall rule misfiring, and the natural correction is to suppress exactly the assignment that was needed.

Report the two excluded buckets as counts rather than dropping them. A run that assigns 3 reviewers out of a 62-PR queue looks broken until the report shows that 40 were Dependabot and 4 were stale. Include each repository's total open non-draft PR count alongside its queue count; a clean team queue does not imply a clean repository. Name every under-covered PR and its specific blocker.

Then ask the user to approve. Accept `apply all`, a subset such as `assign microsoft/fluentui#36476` or `skip microsoft/monosize#300`, or `cancel`. Treat invoking the skill as a request for the plan, never as approval to mutate. Never use an unqualified PR number across repositories.

## Step 6 - Apply approved assignments

Immediately before applying, rerun the **same** plan command with the same options and account. Compare the `fingerprint` with the approved plan. If it differs (new PR, changed review request, area, roster, load, or configuration), present the updated plan and obtain fresh approval. Do not quietly include newly arrived PRs. A newly selected reviewer or even a change to an approved PR's coverage requires reapproval.

For each approved `(repo, number, login)` tuple, re-read the PR and its reviews. Confirm it is open, non-draft, still in a configured queue and not stale or Dependabot; confirm the author, requests, submitted reviews, area, eligibility, shortfall and active `gh` account still match the approved snapshot. If anything differs, skip that PR and report it. Never reuse a PR number under another repo or retry with another reviewer without asking.

Only then request the approved reviewer:

```bash
gh pr edit "$PR" --repo "$REPO" --add-reviewer "$LOGIN"
```

Pass `--repo "$REPO"` on every call, using the same value discovery ran under. A mutation aimed at a different repository than the queue was read from will still succeed whenever that number happens to exist there, and it will act on an unrelated PR. Act on approved items only, one PR at a time, printing a one-line result for each. If the request is rejected for a missing permission or because the login cannot be requested on that PR, report it and move on. Never retry by substituting a different reviewer without saying so.

## Step 7 - Report

Print assigned, skipped and failed counts, each failure with its specific reason, plus already-covered PRs and any genuinely under-covered PRs still needing a human. Restate the Dependabot and stale counts excluded from assignment for every repo. Name the next action for anything left unresolved.

Verify rather than trusting exit codes: re-read the affected PRs and confirm the state actually changed — every assigned PR should sit at exactly `REVIEWERS` eligible reviewers who serve its area. A command that returns zero has not necessarily produced the state you intended.

If a correction is needed, remove a request with `gh pr edit "$PR" --repo "$REPO" --remove-reviewer "$LOGIN"`, but guard each removal: skip when that person has already submitted a review, when the request is already gone, or when removing would drop coverage to zero. Only ever remove requests this run created — a reviewer who predates the run is not yours to unassign.

A run almost always leaves something a human has to finish: a PR parked on another team's CODEOWNERS approval, an area with no eligible owner, a stale PR somebody has to decide about. Nothing persists between runs, so list each of these explicitly at the end of the report, with a link and the specific reason it needs a person — "no eligible reviewer serves `charting`, and the PR has sat 40 days" is actionable, "needs review" is not. Anything left only as an implication of a table is lost when the conversation ends.

## Guardrails

- Always dry-run and obtain explicit approval before requesting a review. Re-run the same plan command immediately before applying and require new approval when its fingerprint differs.
- Never act as an account other than the one confirmed in Step 1; stop and ask rather than switching accounts unprompted.
- Never approve, merge, close, or comment on a pull request. This skill only requests reviewers; `/dependabot-rollup` owns dependency updates.
- Never build a search query from a literal repository or team name; derive every qualifier from validated profiles and arguments, and mutate only PRs discovered under that same `REPO`.
- Never assign the PR author as a reviewer of their own PR.
- Never add a reviewer to a PR that already has `REVIEWERS` eligible team members requested or reviewing who serve that PR's area; request only the shortfall. A request to someone outside the area they serve is not coverage, and the author's own review never counts toward that total.
- Never assign a reviewer to a Dependabot PR or to a PR idle longer than `STALE_DAYS`; report both as counts instead.
- Never hardcode the team roster or reviewer names in this skill; resolve membership from the API at run time and read eligibility and areas from the repo profile. Neither source is sufficient alone.
- Never request a review from a login absent from that repo's profile, or present but not `eligible`; report the omission by name instead.
- Never fall back to an inline reviewer list when a profile is missing, malformed, or fails schema validation; stop and report the specific fault.
- Never add review statistics, performance comparisons, or any other free-text assessment of a person to a profile; it is committed in a public repository. Report those figures in the run, and explain eligibility changes in the pull request that makes them.
- Never request or print a GitHub token; use the user's existing `gh` authentication.
- Never run on a schedule or add a GitHub Actions workflow.
- Never remove a reviewer this run did not add.
