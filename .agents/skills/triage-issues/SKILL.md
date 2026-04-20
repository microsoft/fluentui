---
name: triage-issues
description: Triage newly-filed GitHub issues on the Fluent UI repo (microsoft/fluentui) following the Shield triage guidelines. Fetches open issues labeled `Needs: Triage :mag:` via the `gh` CLI, classifies each (bug vs feature, product area, partner ask, repro quality, a11y), recommends label changes and area-owner assignment, and then applies the approved changes. Use this skill whenever the user asks to triage issues, run shield triage, go through the triage queue, process needs-triage, or any variation — even if they don't mention "Fluent UI" or "GitHub" explicitly, since that's the project context here.
allowed-tools: Bash Read Grep Glob
---

# Triage Fluent UI Issues (Shield Workflow)

Your job is to walk the current `Needs: Triage :mag:` queue on `microsoft/fluentui`, classify each issue against the Shield triage rules, and apply the right labels / assignee after the user approves.

This skill operates in **recommend-then-apply** mode: never mutate issues until the user has approved the batch. A wrong label is cheap to add and annoying to remove, so lean on the approval step.

## The triage queue

```bash
gh issue list --repo microsoft/fluentui \
  --search 'is:open is:issue label:"Needs: Triage :mag:"' \
  --limit 50 \
  --json number,title,author,labels,createdAt,body,comments
```

Sort oldest-first — the guidelines prioritize the longest-waiting issues.

## The decision each issue needs

For every issue, you're producing a **recommendation** with these fields:

| Field                  | Possible values                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `classification`       | `bug`, `feature`, `question`, `a11y`, `needs-repro`, `duplicate`, `not-an-issue`     |
| `product`              | `v9`, `v8`, `v7`, `web-components`, `charting`, `northstar`, `unknown`               |
| `is_partner_ask`       | `true` / `false` (see `references/partner-orgs.md`)                                  |
| `priority_signal`      | `p1`, `normal`, `help-wanted`, `good-first-issue`                                    |
| `add_labels`           | list of label names to add                                                           |
| `remove_labels`        | list of label names to remove (always includes `Needs: Triage :mag:` once triaged)   |
| `assignee`             | GitHub login of the area owner (see routing table below)                             |
| `comment`              | optional message to leave for the author (required if asking for more info)          |
| `validation_candidate` | `true` / `false` — does this bug warrant a playwright-cli repro check before triage? |
| `needs_human_followup` | anything you're unsure about — surface it, don't paper over it                       |

Don't invent labels. Every label you recommend must exist in the repo — see `references/triage-labels.md` for the allow-list.

## Classification rules (from Shield guidelines)

Read `references/shield-guidelines.md` for the full rules. The short version:

1. **Questions** → convert to a GitHub Discussion; don't triage as an issue.
2. **Bug with clear repro**:
   - Assign area owner (see routing below).
   - If the report documents a critical regression (measured impact, root-cause analysis, broad blast radius) → recommend `Shield: P1` and flag `needs_human_followup` so the user can post in the Shield Teams channel. This decision is about the report, not the reporter.
   - If you have private notes (via memory) indicating the author is on a tracked partner workstream AND the body references that workstream → recommend `Partner Ask` as well. When in doubt, leave the label off and flag for human verification — see `references/partner-orgs.md`.
   - If product version is v9 or v8 → normal flow. v9 bugs always get resolution preference.
   - If version is v7 → recommend `Resolution: Won't Fix` with a polite comment, unless the report has exceptional business impact signals that warrant an exception.
3. **Bug without a reliable repro** → recommend `Needs: Repro` + `Needs: Author Feedback`, draft a comment asking for a minimal reproduction (StackBlitz preferred).
4. **Feature request**:
   - **First, check whether it's a "port v8 behavior to v9" ask.** If the body cites a v8 component/prop that v9 doesn't have, investigate before backlogging. v9 deliberately rebuilt many APIs around composition (Field wraps controls, motion lives in `react-motion-components-preview`, announcements via `useAnnounce`, etc.). There's usually a v9-native pattern already documented — see the investigation step below.
   - If a v9-native pattern exists → **recommend `Resolution: By Design` + close**, with a comment pointing the reporter to the pattern. This keeps the backlog honest.
   - If there's no v9 equivalent and the ask is valid for v9 → `Needs: Backlog review`.
   - For older versions → likely close as out-of-support unless partner ask.
5. **Accessibility-related** (mention of screen readers, WCAG, keyboard nav, aria-\*, focus order, contrast, etc.) → add `Area: Accessibility` and assign `smhigley` alongside the area owner.
6. **Duplicate** → `Resolution: Duplicate` + comment linking the original. Before claiming a duplicate, actually search: `gh issue list --repo microsoft/fluentui --search '<keywords>' --limit 10`.
7. **Spam / not-an-issue** → `Resolution: Not An Issue`, close.

## Area-owner routing

Route to people first, then to teams. Teams are in [docs/team-routing.md](../../../docs/team-routing.md) and `.github/CODEOWNERS` is the source of truth for package ownership.

| Area                                                             | Assignee                                  | Trigger                                                                  |
| ---------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| Web Components (`@fluentui/web-components`, `Fluent UI WC (v3)`) | `chrisdholt`                              | Any `web-components` label, or title mentions `fluent-*` custom elements |
| Charting (`@fluentui/charts`)                                    | `AtishayMsft`                             | `Package: charting`, chart component names                               |
| Date/Time pickers                                                | `ermercer`                                | DatePicker, Calendar, TimePicker                                         |
| Accessibility (any product)                                      | `smhigley`                                | a11y keywords; also assigned in addition to product owner                |
| Northstar (legacy v0)                                            | `jurokapsiar`                             | `Fluent UI react-northstar`                                              |
| v9 React components                                              | CODEOWNERS owner for the specific package | Everything under `packages/react-components/*`                           |
| v8 React components                                              | CODEOWNERS owner for the specific package | Everything under `packages/react/*`                                      |

For v9/v8 components, look up the package owner. Fast path:

```bash
# Example: find the CODEOWNERS entry for react-skeleton
grep -n 'react-skeleton' /Users/doidor/src/microsoft/fluentui/.github/CODEOWNERS || true
```

If CODEOWNERS lists a team (e.g., `@microsoft/cxe-prg`), leave `assignee` empty and put the team in `needs_human_followup` — teams can't be assigned on issues via `gh`, so the user will route manually.

## Priority and partner-ask signals

Every issue goes through the same decision tree regardless of author — that's the default. `Shield: P1` and `Partner Ask` are narrow exceptions, not shortcuts around triage.

See `references/partner-orgs.md` for the framing (what these labels mean, what they _don't_ mean, and how to avoid misusing them).

If the triager has private notes in their Claude memory about tracked partner workstreams and known reporter handles, use that context to tip ambiguous cases. If no such memory exists, treat affiliation as unknown and flag `needs_human_followup: "verify partner status"` rather than guessing. A wrong `Partner Ask` label is a worse outcome than a missing one — the label can be added in five seconds later.

## Workflow

### Step 1 — Fetch

Run the queue query. Show the user the count and a one-line summary per issue (number, title, author, age in days). Don't dump the full JSON.

### Step 2 — Classify

For each issue, read the title + body + existing labels. If repro evidence is ambiguous, skim the linked StackBlitz / attached code block — don't mark it `needs-repro` just because the word "Reproduction" field in the template is empty; check the actual content.

**For feature requests that cite v8 behavior**, do a targeted investigation before deciding. Look in the relevant package for:

- `packages/react-components/react-<name>/library/docs/Spec.md` — design rationale
- `packages/react-components/react-<name>/library/docs/MIGRATION.md` — explicit v8→v9 migration notes, often documents dropped props and their replacements
- `packages/react-components/react-motion-components-preview/` — motion/transition primitives (if the ask is animation/transition related)
- `packages/react-components/react-field/` — label/description/validation composition (if the ask is form-control adornments)
- The component's stories for worked examples of the composition pattern

v9 defaults to composition over configuration. An ask like "add a `shouldFadeIn` prop" usually has an answer like "compose with `<Fade>`" or "use `onLoad` + `makeStyles` keyframes". Surface the v9 pattern in the comment so the reporter isn't left hanging.

When checking for duplicates, search first:

```bash
gh issue list --repo microsoft/fluentui \
  --search 'is:issue <keywords>' \
  --limit 10 \
  --json number,title,state
```

Keep each issue's classification in an in-memory structure (don't write intermediate files).

### Step 3 — Present recommendations

Produce a compact table the user can scan. One row per issue. Columns: `#`, `classification`, `add labels`, `remove labels`, `assignee`, `priority`, `notes`. Put the `comment` drafts separately below the table, keyed by issue number — comments are long and clutter the table.

If you found duplicates or partner asks, call them out explicitly above the table.

**Then propose a validation set.** Below the table, list the bugs you flagged as `validation_candidate: true` with a one-line reason each, and ask the user to confirm. Take the initiative here — don't wait for the user to think of validation. Example:

```
I'd like to verify these repros with playwright-cli before triaging:
  • #35998 — StackBlitz provided; Link underline visual bug, testable headless
  • #36001 — CodeSandbox provided; Button click handler not firing

Confirm with `validate yes`, `validate all`, a subset like `validate 35998`,
or `skip validation` to move straight to approval.
```

If there are no validation candidates (all feature requests, all reports with root-cause diffs, etc.), say so explicitly and go straight to Step 4.

**How to decide `validation_candidate`:**

`true` when all of:

- The issue is a bug (not a feature or question).
- A reproduction exists — either a sandbox URL (StackBlitz / CodeSandbox / JSFiddle / CodePen) in the body, or a clearly-described behavior against a specific component that a Storybook default story can exercise.
- The expected failure is something headless Chromium can observe: visual layout, DOM structure, console errors, aria attributes, event handlers firing.

`false` when any of:

- It's a feature request (nothing to reproduce).
- The author already included a root-cause analysis + a suggested diff (they did the work; headless adds noise, not signal).
- The bug is about performance, memory, or timing (perf A/B metrics, rAF regressions, FCP deltas) — headless won't give reliable numbers.
- The bug is browser-specific (Edge-only, Safari-only, mobile) — you can't run those from here.
- The bug requires assistive tech (screen reader behavior, voice control) — headless can see ARIA but not AT interpretation.
- The bug requires real user timing (typing debounce, drag gestures, animation pauses).

### Step 3.5 — Validate repros with playwright-cli

Run this step when the user confirms the validation set you proposed in Step 3 (or when they name a different set — `validate 35998 35976`, `validate all`, etc.). If the user says `skip validation`, go straight to Step 4.

Validation is the human-in-the-loop gate on agent initiative: you proposed the set, the human confirmed it, now execute. Do not mutate any issue as a result of validation — evidence feeds back into the recommendation table, and the user still approves in Step 4.

For each confirmed issue:

1. **Prerequisites.** Make sure playwright-cli is available (same install as `visual-test`):

   ```bash
   npm ls -g @playwright/cli 2>/dev/null || npm install -g @playwright/cli@0.1.1
   ```

2. **Pick the target URL.** In priority order:

   - A StackBlitz / CodeSandbox / JSFiddle / CodePen link in the issue body — use it directly.
   - A link to a specific Storybook story hosted at `storybooks.fluentui.dev` or similar — use it directly.
   - Otherwise: spin up the relevant component's local Storybook and navigate to the closest default story. Follow the pattern in the `visual-test` skill for starting `yarn nx run react-<component>:start` and finding the dynamic port.

3. **Capture evidence.** Don't try to "prove" the bug — just gather what a human needs to decide:

   ```bash
   playwright-cli goto "<repro URL>"
   playwright-cli screenshot --filename=/tmp/triage-<num>-screenshot.png
   playwright-cli snapshot > /tmp/triage-<num>-dom.txt
   # Console errors and warnings — often the most useful signal
   playwright-cli console > /tmp/triage-<num>-console.txt
   ```

   If the sandbox has a specific interaction to trigger the bug (click a button, type in a field), follow it using refs from the snapshot.

4. **Classify the result** as one of:

   - `repros` — you observed the described behavior. Include the screenshot path and any console errors.
   - `does_not_repro` — you visited the sandbox, ran through the described steps, and the behavior didn't appear. Include what you tried so the human can sanity-check.
   - `cannot_determine` — the sandbox didn't load, requires auth, times out, needs a specific browser version (common for perf / Edge-only issues), or needs real user timing that headless can't reproduce. **This is the most important category** — don't pretend headless gives you environment coverage it doesn't.

5. **Feed evidence back into the recommendation.** Only update `add_labels` as follows:

   - `does_not_repro` → surface `Resolution: Can't Repro` as a **candidate**, not a decision. The user still approves. Attach the evidence in the comment draft so they can judge.
   - `repros` → leave labels unchanged; the existing classification stands. Maybe upgrade priority if the evidence makes it clearly worse than the body described.
   - `cannot_determine` → leave labels unchanged; note the limitation in `needs_human_followup`.

6. **Clean up.** Close the browser, kill any Storybook you started, and delete the evidence files unless the user wants to keep them:

   ```bash
   playwright-cli close
   # If you started Storybook:
   lsof -i :$SB_PORT -t 2>/dev/null | xargs kill 2>/dev/null
   ```

The validation-candidate heuristics are in Step 3 — don't re-litigate them here. If the user overrides and asks you to validate something you flagged as not-a-candidate (e.g., the Edge perf issue), do it anyway but prefix the result with a warning about headless limitations so the evidence is interpreted correctly.

### Step 4 — Ask for approval

Ask the user: "Apply all / approve specific numbers / skip / edit?". Accept inputs like `apply 35976, 35977`, `skip 36007`, or free-form edits. The user can still request additional validation at this point (`validate 36007` even if you hadn't proposed it); if they do, loop back through Step 3.5 and then re-present the updated table. Don't proceed to apply until the user has explicitly approved.

### Step 5 — Apply approved changes

Use `gh issue edit` for labels and assignees. Use `gh issue comment` for drafted comments. Apply one issue at a time and print a one-line result per issue (success or error). Do not retry blindly on failure; stop and ask the user what to do.

```bash
# Labels
gh issue edit <num> --repo microsoft/fluentui \
  --add-label "Type: Bug :bug:" \
  --add-label "Fluent UI react-components (v9)" \
  --remove-label "Needs: Triage :mag:"

# Assignee
gh issue edit <num> --repo microsoft/fluentui --add-assignee chrisdholt

# Comment (use heredoc)
gh issue comment <num> --repo microsoft/fluentui --body "$(cat <<'EOF'
Thanks for the report! Could you share a minimal StackBlitz or CodeSandbox that reproduces this? The issue template has a Reproduction field that's currently empty.
EOF
)"
```

### Step 6 — Summarize

After applying, print: X issues triaged, Y still need human follow-up (list them), Z were skipped. Leave the user with a clear handoff.

## Anti-patterns (don't do these)

- **Don't apply changes silently.** Always present the recommendation table first.
- **Don't guess at labels that don't exist.** The allow-list in `references/triage-labels.md` is exhaustive for triage — if a situation calls for a label that isn't there, ask the user.
- **Don't mark issues as duplicates without linking the original.** A `Resolution: Duplicate` label without a comment pointing to the original is worse than no triage.
- **Don't remove `Needs: Triage :mag:` on issues you're flagging for human follow-up.** If you can't decide, leave the triage label on so it stays in the queue.
- **Don't assign a team as if it were a user.** `gh issue edit --add-assignee` only accepts user logins. For team routing, leave the assignee empty and note the team in `needs_human_followup`.
- **Don't say "we'll fix this soon" in comments.** The guidelines are explicit: only promise work we're committed to delivering.

## Reference files

- `references/shield-guidelines.md` — full triage decision tree from the Shield dev guidelines
- `references/triage-labels.md` — exact label names allowed in triage
- `references/partner-orgs.md` — what `Shield: P1` / `Partner Ask` mean and, importantly, what they don't
