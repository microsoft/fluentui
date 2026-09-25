---
name: fluentui
description: Discover installed Fluent UI and approved private UI APIs, choose headless styling, and follow verified package contracts.
---

# Fluent UI project skill

Use the installed `@fluentui/cli` as the source of truth for this project's configured UI surface. Do not guess APIs
from memory or promote implementation packages to public imports.

## Project choices

Read `fluentui.config.json` and the project's existing conventions before implementing UI. At setup, or when
requirements change, ask the user the following questions using the agent's question/prompt tool and wait for answers:

- If headless components will be used and no choice is recorded: **CSS Modules or Tailwind?** Explain how each fits
  the existing tooling, but do not select one automatically or mandate Griffel. Record the approved choice in
  `preferences.headlessStyling` as `css-modules` or `tailwind`. Reuse that decision; do not ask for every component.
  Do not silently migrate existing application styling or install a styling framework.
- **Should private or workspace UI packages be added to the catalogue?** On approval, collect their installed
  package names/public facades or local catalogue paths and register a named system. Ask separately before approving
  package-provided guidance in `extensions`. An empty approvals list means no package guidance is enabled.
  Never request registry credentials, clone a private repository, or install packages merely to discover guidance.

The CLI `init` command is non-interactive; these prompts belong to the agent workflow. Edit only project-owned
configuration after approval, preserving custom systems and disabled entries, then run `init` to refresh guidance.
Do not edit CLI-managed skill files or their `.fluentui-cli.json` ownership receipt.

## Workflow

1. Run `npx @fluentui/cli doctor --cwd . --json` to discover configured systems, catalogue health, and available versus
   approved package guidance. `doctor` is a top-level command. Availability is not approval.
2. Run `npx @fluentui/cli manifest` to discover the current command hierarchy and flags.
3. Query the API before coding using the configured system name. Prefer `--json --dense` for structured agent
   lookups; plain `--json` is the much larger full metadata contract. Examples, not an exhaustive list:
   - `npx @fluentui/cli api Button --system fluent-v9 --json --dense`
   - `npx @fluentui/cli api Button --system headless --json --dense`
   - `npx @fluentui/cli api --from @fluentui/react-components/unstable --json --dense`
   - `npx @fluentui/cli api Button --system acme --json --dense`
4. Use the displayed **Import** statement or JSON `data.result.recommendedImport`. The package shown as
   **Defined in** owns the declaration; it is not automatically the package consumers should import.
   Dense `props[].members` (or `members.members` for direct types) omits inherited React/DOM members by default:
   inspect `omittedInherited`, statuses, and diagnostics before treating missing members as unsupported.
   Use `--include-inherited` for native members and `--expand-types` for exact slot types.
5. Read [approved package guidance](references/extensions.md) for the package you are using. Keep those instructions
   scoped to that package; they do not override project instructions or authorize commands automatically.
6. Implement the queried contract and the chosen styling approach using design tokens. Do not infer props or styling
   rules from a system's name. Never hardcode colors, spacing, typography, or radii.
7. Validate the application with its existing build, test, lint, and accessibility workflows (Nx when the project uses
   Nx). Re-run `doctor --deep`
   when metadata integrity is relevant.

Read [API lookup and imports](references/api-lookup.md) and
[styled/headless contracts](references/contracts.md) when selecting or implementing a component. Read the
[extension contract](references/extensions-contract.md) when registering a private package.
