# Technical Debt Tracker

This file tracks known technical debt items that agents and engineers should be aware of.
Items are added during code review, agent runs, and manual audits.

## Active Debt Items

<!-- Add items with: category, description, location, priority, and date added -->

| ID | Category | Description | Location | Priority | Added |
|----|----------|-------------|----------|----------|-------|
| _To be populated by agent runs and manual audits_ | | | | | |

## Categories

- **pattern-violation** — Code that doesn't follow established patterns
- **missing-tests** — Insufficient test coverage
- **stale-docs** — Documentation that doesn't match code
- **deprecated-usage** — Use of deprecated APIs or patterns
- **accessibility** — Known a11y gaps
- **performance** — Known performance issues
- **ssr-safety** — SSR-unsafe code patterns

## Priority Levels

- **P0** — Blocking: breaks users or CI
- **P1** — High: should fix in next sprint
- **P2** — Medium: fix when touching the area
- **P3** — Low: nice to have, no urgency

## How to Use

### For agents
When you find technical debt during a fix or review, add a row to the table above.
When you fix a debt item, remove its row.

### For engineers
Review this file when planning sprints. Use it to justify cleanup PRs.
The `agent-skills-improvement` workflow analyzes this file to identify recurring patterns.
