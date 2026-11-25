# High-priority reporter signals

Every issue in the triage queue is treated as first-class, regardless of who filed it. External community reports and internal reports go through the same decision tree (classify, check repro, route to owner), and the same SLAs apply to all open v9/v8 bugs.

This file exists because the Shield workflow has one narrow exception: when a report documents a clearly critical regression — with root-cause analysis, measured impact data, or a large blast radius — it can be flagged as `Shield: P1` to pull it to the front of the queue. That flag is about the **nature of the report**, not the reporter.

## When to consider `Shield: P1`

- The issue documents a measured regression (numbers, metrics, profiling data).
- The issue points to a specific root cause in the code, often with a suggested diff.
- The issue affects a broad surface (many components, many consumers) rather than a single edge case.
- The workaround is genuinely unavailable (not just "we'd prefer not to").

The presence of any one of these is a hint, not a trigger. All of them together is a strong signal. None of them — even for a report from an internal team — means normal-priority flow.

## When to consider `Partner Ask`

The `Partner Ask` label exists for a narrow operational reason: some downstream Microsoft teams rely on Fluent UI and their feedback loop is tracked separately for roadmap/reporting purposes. The label captures that a report originated in one of those workstreams so the PM team can roll up partner-facing impact. It is not a quality or priority judgment on the issue itself — community issues frequently hit the queue ahead of partner-tagged issues because their triage outcome is clearer.

If you can't tell from the issue body whether a report qualifies, **don't guess and don't apply the label**. Leave it off and flag `needs_human_followup: "verify whether this is a partner workstream"`. A missing `Partner Ask` label can be added in 5 seconds later; a wrong one is noisier and communicates the wrong thing.

## What this skill does not do

- **Does not downrank community issues.** External contributors get the same triage, labels, assignee routing, and comment quality as anyone else.
- **Does not treat author identity as a priority signal on its own.** GitHub login is used only to look up context (previous issues, stated affiliation), never as an override for the decision tree above.
- **Does not publish a partner list.** The operational specifics of which teams use the `Partner Ask` label live outside this repo (in the triager's private notes / internal Shield docs). If you need them for a triage session, the maintainer will surface them; they are not required for a correct triage decision on any individual issue.

## Verification commands

Look up an author's public profile (name, company, bio) when the issue body doesn't make context clear:

```bash
gh api users/<login> -q '{login, name, company, bio}'
```

Check prior triage decisions on the same author's issues to see how the team has historically handled similar reports:

```bash
gh issue list --repo microsoft/fluentui \
  --search 'is:issue author:<login>' \
  --limit 5 --json number,title,labels,state
```

Neither of these determines priority — they just give you context the decision tree can use.
