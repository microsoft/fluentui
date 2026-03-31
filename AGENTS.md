<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- Always run tasks through `nx` (`nx run`, `nx run-many`, `nx affected`), never tools directly
- Use `nx_workspace` tool to understand workspace architecture
- Use `nx_project_details` tool to analyze specific project structure and dependencies
- Use `nx_docs` tool for up-to-date Nx configuration guidance

<!-- nx configuration end-->

# Fluent UI — Agent Map

Nx monorepo. Yarn v1. Node 22. TypeScript strict. ~200 packages. Millions of users.

## Architecture

| Topic                                         | Location                                                                           |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| V9 component patterns (hooks, slots, Griffel) | [docs/architecture/component-patterns.md](docs/architecture/component-patterns.md) |
| Design tokens and theming                     | [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md)           |
| Package dependency layers                     | [docs/architecture/layers.md](docs/architecture/layers.md)                         |

## Workflows

| Topic                                | Location                                                         |
| ------------------------------------ | ---------------------------------------------------------------- |
| PR checklist, change files, commands | [docs/workflows/contributing.md](docs/workflows/contributing.md) |
| Testing guide (unit, VRT, SSR, E2E)  | [docs/workflows/testing.md](docs/workflows/testing.md)           |
| Team routing and label taxonomy      | [docs/team-routing.md](docs/team-routing.md)                     |

## Quality Tracking

| Topic                      | Location                                               |
| -------------------------- | ------------------------------------------------------ |
| Per-package quality grades | [docs/quality-grades.md](docs/quality-grades.md)       |
| Technical debt tracker     | [docs/tech-debt-tracker.md](docs/tech-debt-tracker.md) |

## Key Rules

1. Use design tokens — never hardcode colors, spacing, or typography
2. Follow v9 component patterns exactly — don't invent new approaches
3. Respect package layer boundaries (see layers.md)
4. SSR-safe — no unguarded `window`/`document`/`navigator`
5. Accessibility first — ARIA attributes, keyboard nav, WCAG 2.1
6. Beachball change files required for published package changes

## Agentic Workflows

| Workflow                   | Trigger           | Purpose                                       |
| -------------------------- | ----------------- | --------------------------------------------- |
| `agent-triage`             | Issue opened      | Classify, label, validate issues              |
| `agent-fix`                | `agent:fix` label | Implement fixes, open PRs                     |
| `agent-review`             | PR opened         | FluentUI review with confidence score         |
| `agent-docs-grooming`      | Weekly Monday     | Documentation audit                           |
| `agent-skills-improvement` | Weekly Friday     | Improve agent instructions from PR patterns   |

## Package Layout

| Area           | Path                         | Status             |
| -------------- | ---------------------------- | ------------------ |
| V9 components  | `packages/react-components/` | Active development |
| V8 components  | `packages/react/`            | Maintenance only   |
| Web Components | `packages/web-components/`   | Active             |
| Charting       | `packages/charts/`           | Active             |
| Build tooling  | `tools/`                     | Active             |
| ESLint plugin  | `packages/eslint-plugin/`    | Active             |
