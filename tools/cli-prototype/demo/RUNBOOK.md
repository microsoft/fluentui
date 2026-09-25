# Fluent UI: from init to a Todo app

## Before presenting

This directory contains two independent, installed React projects:

- `starter/`: placeholder only, with no Fluent config, agent guidance, or Todo code.
- `reference/`: finished, initialized Todo app using styled v9 and a headless Checkbox with CSS Modules.

Open **only `__DEMO_ROOT__/starter`** in the IDE and start a fresh agent session there. Do not open the parent folder,
the reference, or the producer monorepo as the agent workspace. The reference is a fallback, not input to the agent.

Both projects use content-hashed local tarballs, transitive overrides, and matching producer declaration versions.
`pack-manifest.json` freezes the selected build; each project has its own lockfile. No package alias is required.
Do not run package upgrades or replace the pinned Fluent packages during the demo. Keep the source tarballs available.
Local `npx --no-install` commands below prevent an accidental registry CLI download.

Preparation is deliberately separate from verification and does not initialize the starter:

```sh
cd "__WORKSPACE_ROOT__"
export FLUENTUI_DEMO_ROOT="__DEMO_ROOT__"
yarn nx run cli-prototype:verify-demo
```

Verification builds both apps, checks metadata and parser-free API lookups, and exercises the reference in a browser.
It leaves the starter uninitialized. After you begin implementing in the starter, verify that app with its own
commands instead; clean-starter verification intentionally rejects an already-used rehearsal.

## 1. Initialize (1 minute)

```sh
cd "__DEMO_ROOT__/starter"
npx --no-install fluentui-cli init
```

Show `fluentui.config.json`, the small `AGENTS.md` pointer, and `.agents/skills/fluentui/SKILL.md`.
The config selects canonical styled/headless catalogues; the skill contains the agent workflow.
`.agents/skills/fluentui/.fluentui-cli.json` is an ownership receipt, not another project config.

**Init is non-interactive.** Styling and private-package consent are questions the agent asks after reading the skill.
They are not terminal prompts from `init`.

## 2. Discover installed APIs (1-2 minutes)

```sh
npx --no-install fluentui-cli doctor --deep --metadata-mode required
npx --no-install fluentui-cli api Button --system fluent-v9
npx --no-install fluentui-cli api Button --system headless --json --dense
npx --no-install fluentui-cli api Checkbox --system headless --json --dense
```

Highlight one verified public import per lookup, control-defined props, documented defaults, and slot summaries.
Styled imports come from `@fluentui/react-components`; headless imports use verified package subpaths.
`--json --dense` is the agent view. Plain `--json` is the full metadata escape hatch.
An effective-type warning about semantic reference spans is not missing component coverage.
Actual dependency drift or missing metadata is a failed preflight; do not hide it with declaration fallback.

## 3. Ask the agent to implement (4-5 minutes)

Paste this prompt without pointing the agent at the reference:

> Read this project's Fluent UI guidance and build a small Todo app using the installed packages. Support adding
> tasks, marking them complete, deleting them, filtering All/Active/Completed, and showing the remaining count and
> empty states. Use styled Fluent v9 controls for the main interface and a headless control for task completion.
> Ask me to choose CSS Modules or Tailwind before styling headless components, and whether to register any private
> UI packages. Query the CLI for the APIs you use and follow its recommended imports. Keep the existing dependency
> pins unchanged. No backend or persistence. Make it keyboard accessible and use Fluent design tokens.

Answer **CSS Modules** and **no private packages** for this rehearsed path. Let the agent record
`preferences.headlessStyling: "css-modules"` in project config. No package guidance needs approval for this demo.
Do not pre-record these answers in the clean starter; the questions are part of the demonstration.

Watch for real `api ... --json --dense` calls before implementation. A headless Checkbox needs its input, indicator,
and label slots styled, not just its root. Native props apply to its input slot.

## 4. Run and show the result (2 minutes)

```sh
cd "__DEMO_ROOT__/starter"
npm run build
npm run dev -- --host 127.0.0.1 --port 5180 --strictPort
```

Open http://127.0.0.1:5180. Add a task with Enter, complete one with Space, switch filters, delete a task, and show
an empty state. Refreshing intentionally resets in-memory tasks. Stop Vite with Ctrl+C when finished.

The live agent's implementation need not match the reference's exact layout. The contract and user interactions
are the demonstration. A successful build alone does not establish keyboard or headless-slot correctness.

## Finished reference / fallback

Open this in a separate window, not the live agent's workspace:

```sh
cd "__DEMO_ROOT__/reference"
npm run dev -- --host 127.0.0.1 --port 5181 --strictPort
```

Open http://127.0.0.1:5181. Screenshots from rehearsal are in `reference/test-results/`.
Use `npm test` in the reference to rerun its browser checks (stop its manual server first).
`evidence/summary.json` records the successful preparation checks. No server is left running by preparation or verification.

## Another clean rehearsal

Never reset the forum or overwrite an existing demo. Pick a new, absent directory whose parent already exists:

```sh
cd "__WORKSPACE_ROOT__"
export FLUENTUI_DEMO_ROOT="/absolute/path/to/a-new-todo-demo"
export FLUENTUI_DEMO_PACK_MANIFEST="__DEMO_ROOT__/pack-manifest.json"
yarn nx run cli-prototype:prepare-demo
yarn nx run cli-prototype:verify-demo
```

This reuses the frozen tarballs without rebuilding Fluent UI. Preparation refuses every existing destination.
It generates and installs lockfiles before the live session; third-party dependencies may still need registry/cache
access during preparation. The live init and API lookups use only the installed CLI and metadata.
