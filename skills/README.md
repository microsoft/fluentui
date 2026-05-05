# Fluent UI Agent Skills

This directory contains [agent skills](https://agentskills.io) — reusable instruction sets that extend AI coding agents with Fluent UI-specific capabilities. Skills are installed into your project (or globally) and automatically loaded by supported agents.

## Available skills

| Skill                                                               | Description                                                                                                                    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [`fluentui-migrate-v8-to-v9`](./fluentui-migrate-v8-to-v9/SKILL.md) | Guides AI agents through migrating a codebase from Fluent UI React v8 (`@fluentui/react`) to v9 (`@fluentui/react-components`) |

## Installation

Skills are installed via the [`npx skills`](https://github.com/vercel-labs/skills) CLI, which supports 40+ coding agents including Claude Code, GitHub Copilot, Cursor, Codex, and more.

### Install the migration skill

```bash
# Interactive — choose which agents and skills to install
npx skills add microsoft/fluentui

# Install a specific skill
npx skills add microsoft/fluentui --skill fluentui-migrate-v8-to-v9

# Install to a specific agent
npx skills add microsoft/fluentui --skill fluentui-migrate-v8-to-v9 -a claude-code

# Install globally (available across all projects)
npx skills add microsoft/fluentui --skill fluentui-migrate-v8-to-v9 -g
```

### List available skills

```bash
npx skills add microsoft/fluentui --list
```

## Managing installed skills

```bash
# List installed skills
npx skills list

# Check for updates
npx skills check

# Update to latest
npx skills update

# Remove a skill
npx skills remove fluentui-migrate-v8-to-v9
```

## Further reading

- [Agent Skills specification](https://agentskills.io)
- [Skills directory](https://skills.sh)
- [`@fluentui/cli` migrate command](../tools/cli/src/commands/migrate/README.md)
