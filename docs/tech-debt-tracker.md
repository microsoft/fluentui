# Technical Debt Tracker

This file tracks known technical debt items that agents and engineers should be aware of.
Items are added during code review, agent runs, and manual audits.

## Active Debt Items

<!-- Add items with: category, description, location, priority, and date added -->

| ID     | Category          | Description                                                                                                                                                                                                                                                  | Location                                                                                                                                                                                                                   | Priority | Added      |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- |
| TD-001 | pattern-violation | Slider and RangeSlider styles hardcode thumb, rail and minimum sizes (`16px`, `20px`, `2px`, `4px`, `120px`) and the `#0000` step-mark gradient colour instead of design tokens. Move both components to tokens together so they keep rendering identically. | `packages/react-components/react-slider/library/src/components/Slider/useSliderStyles.styles.ts`, `packages/react-components/react-range-slider-preview/library/src/components/RangeSlider/useRangeSliderStyles.styles.ts` | P3       | 2026-10-15 |

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
