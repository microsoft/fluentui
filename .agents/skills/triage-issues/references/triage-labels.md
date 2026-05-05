# Triage label allow-list

These are the labels actually present on the `microsoft/fluentui` repo as of this skill's writing. Don't recommend anything that isn't here — `gh` will fail, and invented labels slip past the user during approval.

To refresh this list against the live repo:

```bash
gh api repos/microsoft/fluentui/labels --paginate -q '.[] | .name' | sort
```

## Product labels (pick exactly one)

- `Fluent UI react-components (v9)`
- `Fluent UI react (v8)`
- `Fluent UI react (v7)`
- `Fluent UI WC (v3)` (use together with `web-components`)
- `web-components`
- `Fluent UI react-northstar` / `Fluent UI react-northstar (v0)`
- `Fluent UI vNext`
- `Package: charting`

## Type labels (pick exactly one)

- `Type: Bug :bug:`
- `Type: Feature`

## Status labels

- `Needs: Triage :mag:` — remove once triage is done (unless flagged for human follow-up)
- `Needs: Author Feedback` — pair with repro/info requests
- `Needs: Repro` — when the reproduction is missing or unusable
- `Needs: Actionable Feedback :female_detective:` — author replied but still not actionable
- `Needs: Attention` — needs team attention, not blocking on author
- `Needs: Backlog review` — for feature requests going to the unified Backlog
- `Needs: Investigation` — dev needs to investigate before further action
- `Needs: Discussion` — requires team discussion
- `Needs: Design` — needs design input
- `Needs: PM` — needs PM input
- `Needs: API Breaking Change` / `Needs: Behavior Breaking Change` — flag breaking-change impact

## Priority / ownership labels

- `Shield: P1` — critical / partner-driven; notify Shield Teams channel after applying
- `Shield: P2` — elevated but not P1
- `Partner Ask` — report originates in a tracked partner workstream (see `partner-orgs.md` for what this does and does not mean)
- `Help Wanted ✨` — community can take this
- `Good First Issue 🏆` — scoped well for a newcomer
- `From Shield` — marks it as triaged via the Shield workflow

## Area labels (add as applicable — not exhaustive)

- `Area: Accessibility` — always pair with `smhigley` assignment
- `Area: Performance`
- `Area: Testing`
- `Area: Theming`
- `Area: Icons`
- `Area: SSR`
- `Area: Documentation`
- `Area: Positioning`

(Full list has ~40 Area labels — run the refresh command above if an area doesn't seem covered.)

## Component labels

Format: `Component: <Name>` (e.g., `Component: Announced`). Add when the issue targets a specific component.

## Resolution labels (only when closing)

- `Resolution: Duplicate` — must be accompanied by a comment linking the original
- `Resolution: Not An Issue` — spam or invalid
- `Resolution: By Design` — working as intended; explain why in the comment
- `Resolution: Can't Repro` — after investigation, can't reproduce
- `Resolution: External` — caused by a dependency or external factor
- `Resolution: Won't Fix` / `Resolution: Won't Do` — out of support or scope
- `Resolution: Soft Close` — closed for inactivity but can be reopened

## Label-combination heuristics

| Situation                                                                | Labels to add                                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| v9 bug, good repro, not a partner                                        | `Type: Bug :bug:`, `Fluent UI react-components (v9)`, possibly `Component: <X>`                                                |
| v9 feature request (no v9-native pattern exists)                         | `Type: Feature`, `Fluent UI react-components (v9)`, `Needs: Backlog review`                                                    |
| v9 feature request porting v8 behavior that v9 addresses via composition | `Type: Feature`, `Fluent UI react-components (v9)`, `Resolution: By Design` — and close with a comment pointing to the pattern |
| Web-components bug                                                       | `Type: Bug :bug:`, `web-components`, `Fluent UI WC (v3)`                                                                       |
| Bug with no repro                                                        | `Type: Bug :bug:`, `<product>`, `Needs: Repro`, `Needs: Author Feedback`                                                       |
| A11y issue                                                               | (above) + `Area: Accessibility`                                                                                                |
| Partner ask, critical                                                    | (above) + `Partner Ask` + `Shield: P1`                                                                                         |
| Good first issue candidate                                               | (above) + `Good First Issue 🏆` + `Help Wanted ✨`                                                                             |
| Duplicate                                                                | `Resolution: Duplicate` + comment with link to original                                                                        |
