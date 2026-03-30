<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->

# Fluent UI — Global Agent Instructions

This file provides high-level context for all AI agents working in this repository.
For detailed development guidelines, see `.github/instructions/copilot.instructions.md`.

## Repository Identity

- **Repo**: microsoft/fluentui
- **What**: Microsoft's Fluent UI design system — React components (v8, v9), Web Components, and Charting
- **Scale**: Serves millions of users across Microsoft products (Teams, Outlook, Azure Portal, etc.)
- **Structure**: Nx monorepo with ~200+ packages, managed with Yarn v1

## Agentic Workflows

This repository uses GitHub Agentic Workflows for automated tasks. The workflow definitions
live in `.github/workflows/agent-*.md`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `agent-triage` | Issue opened/reopened | Classify, label, and validate incoming issues |
| `agent-fix` | Issue labeled `agent:fix` | Implement bug fixes and open PRs |
| `agent-review` | PR opened/updated | Devil's advocate review with confidence scoring |
| `agent-docs-grooming` | Weekly (Monday) | Audit documentation for staleness and gaps |
| `agent-skills-improvement` | Weekly (Friday) | Analyze agent PRs and improve instructions |

## Key Rules for All Agents

1. **Be conservative.** This codebase serves millions of users. When in doubt, don't change it.
2. **Follow existing patterns.** Don't invent new approaches — match what's already in the code.
3. **Use design tokens.** Never hardcode colors, spacing, or typography values.
4. **SSR safety.** Never access `window`, `document`, or `navigator` without proper guards.
5. **Accessibility first.** All interactive components must have proper ARIA attributes and
   keyboard navigation.
6. **Beachball change files.** Any change to a published package requires `npx beachball change`.
7. **Nx commands.** Always use `npx nx run <project>:<target>` — never run tools directly.

## Team Routing

| Area | Team | Packages |
|------|------|----------|
| v9 Components | @microsoft/cxe-prg | `packages/react-components/*` |
| v8 Components | @microsoft/cxe-red | `packages/react/*` |
| Web Components | @microsoft/fui-wc | `packages/web-components/*` |
| Charting | @microsoft/charting-team | `packages/charts/*` |
| Build/Tooling | @microsoft/fluentui-react-build | `tools/*`, `.github/*`, root configs |

## Label Taxonomy

### Product Labels
- `Fluent UI react-components (v9)` — v9 React components
- `Fluent UI react (v8)` — v8 React components
- `web-components` / `Fluent UI WC (v3)` — Web Components
- `Package: charting` — Charting library

### Type Labels
- `Type: Bug :bug:` — Bug reports
- `Type: Feature` — Feature requests

### Status Labels
- `Needs: Triage :mag:` — Needs team review
- `Needs: Author Feedback` — Waiting on issue author
- `Needs: Attention` — Needs team attention

### Resolution Labels
- `Resolution: Duplicate` — Duplicate of another issue
- `Resolution: Not An Issue` — Not a valid issue
- `Resolution: By Design` — Working as intended
