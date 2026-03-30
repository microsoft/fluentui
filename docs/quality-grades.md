# Package Quality Grades

This file tracks the documentation and test coverage quality of v9 component packages.
Updated by the `agent-docs-grooming` workflow and the `agent-skills-improvement` workflow.

## Grading Criteria

| Grade | Meaning |
|-------|---------|
| A | README + stories + tests + API docs all present and current |
| B | Missing one of: complete README, full story coverage, or up-to-date API docs |
| C | Missing two or more quality signals |
| D | Minimal or no documentation/testing |

## Quality Signals

- **README**: Has description, install command, usage example
- **Stories**: Has `stories/` directory with Default story and variant coverage
- **Tests**: Has unit tests with reasonable coverage
- **API docs**: `.api.md` file exists and matches current exports
- **Conformance**: `testing/isConformant.ts` exists and passes

## Current Grades

<!-- This table is updated by the docs-groomer agent. Do not edit manually. -->

| Package | README | Stories | Tests | API Docs | Conformance | Grade |
|---------|--------|---------|-------|----------|-------------|-------|
| _To be populated by first docs audit run_ | | | | | | |

## How to Update

The `agent-docs-grooming` workflow populates this table during weekly audits.
To trigger manually, create a "Documentation Audit" issue and assign to Copilot
with the docs-groomer workflow, or run:

```bash
gh aw run agent-docs-grooming
```
