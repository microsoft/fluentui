# Shield Triage Guidelines (distilled)

Source: the internal Shield Dev Guidelines doc (Gouttierre Gomes, 15 Jan 2024). This file captures the triage decision tree in text — refer back to the original doc for the surrounding context (R.O.B., PR review, communication channels).

## The core question

Shield human triage processes issues labeled `Needs: Triage :mag:` (after the Shield BOT has already auto-routed the obvious ones). For each issue, you're deciding:

1. **Is this even an issue?** (spam, not-an-issue, question-should-be-discussion)
2. **Is there a reliable repro?** (if not, block on author)
3. **What product and version?** (v9 / v8 / v7 / web-components / charting / northstar)
4. **Does the report document a critical regression?** (measured impact, root cause, broad blast radius → P1 candidate)
5. **Who owns it?** (area owner or package owner)

## Decision tree

```
issue labeled "Needs: Triage :mag:"
├── Is it a question / support request?
│   └── yes → convert to Discussion, close issue
├── Is it an accessibility issue?
│   └── yes → add "Area: Accessibility", assign smhigley (in addition to owner), add to v-a11y board
├── Does it have a reliable repro?
│   └── no → add "Needs: Repro" + "Needs: Author Feedback", comment asking for repro
├── What version?
│   ├── v9 (N) → always resolve; highest priority among open bugs
│   ├── v8 (N-1) → resolve normally
│   └── v7 → generally "Resolution: Won't Fix"; maintainer may make exceptions for exceptional-impact reports
├── Does the report have tracked-workstream context (per triager's private notes)?
│   └── yes → add "Partner Ask" if the body confirms the workstream reference. If also a clear critical bug, add "Shield: P1" + notify Shield Teams channel
├── Is it a feature request?
│   └── yes → add "Needs: Backlog review", add to unified Backlog
├── Is it a clear critical bug (even without partner)?
│   └── yes → add "Shield: P1", notify Shield Teams channel
├── Is it reasonable for a community contributor?
│   └── yes → add "Help Wanted"
├── Can a newcomer tackle it?
│   └── yes → add "Good First Issue"
└── Otherwise → assign area owner, remove "Needs: Triage :mag:"
```

## Area routing (fixed assignments per the guidelines)

| Area                        | Assignee GitHub login |
| --------------------------- | --------------------- |
| Northstar (v0)              | `jurokapsiar`         |
| Web Components (v3)         | `chrisdholt`          |
| Charting                    | `AtishayMsft`         |
| Date/Time pickers           | `ermercer`            |
| Accessibility (any product) | `smhigley`            |

For v8 and v9 React components, use `.github/CODEOWNERS` to find the package owner. CODEOWNERS often lists a team (`@microsoft/cxe-prg`, `@microsoft/cxe-red`); teams can't be assigned to issues, so leave the assignee blank and surface the team for the user to route.

## Version-support matrix

| Version                                 | Status            | Priority treatment                                                                                                    |
| --------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| v9 (`Fluent UI react-components (v9)`)  | Active (N)        | Highest — always resolve                                                                                              |
| v8 (`Fluent UI react (v8)`)             | Maintenance (N-1) | Resolve normally                                                                                                      |
| Web Components v3 (`Fluent UI WC (v3)`) | Active            | Resolve normally                                                                                                      |
| Charting                                | Active            | Resolve normally                                                                                                      |
| v7 (`Fluent UI react (v7)`)             | EOL               | Generally close as "Won't Fix"; a maintainer may make exceptions for reports with exceptional business-impact signals |
| Northstar (`Fluent UI react-northstar`) | EOL               | Route to `jurokapsiar`, generally won't-fix                                                                           |

## "We'll fix this soon" is off-limits

The guidelines explicitly call this out. When commenting on an issue:

- Acknowledge, point to existing docs / workarounds, offer to review a PR.
- Do **not** commit the team to a fix unless a dev has already picked it up.
- Avoid dates. "We'll get to this in Q2" creates an obligation.

## When to stop and hand off

The guidelines are clear: if you can't get an issue to a reasonable resolution state, do a **positive hand-off** — name the next owner explicitly and assign them. Don't just leave it floating with a partial triage. In skill terms: flag `needs_human_followup` with a specific ask ("check whether the reported repro still happens on latest", "check if #33888 should be reopened").
