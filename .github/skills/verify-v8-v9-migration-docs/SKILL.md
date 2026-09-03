---
name: verify-v8-v9-migration-docs
description: >-
  Generate, audit, and verify Fluent UI v8-to-v9 component migration guides.
  Use when asked to inventory v8 components, inspect their v8 and v9 source,
  produce missing per-component documentation, prove the guides are accurate
  or exhaustive with sealed migrations, classify documentation gaps versus
  agent mistakes, or publish a verification matrix.
---

# Generate and verify v8-to-v9 migration documentation

Build and prove the documentation in three stages:

1. Inventory every public v8 component and determine its v9 destination.
2. Inspect authoritative v8 and v9 source, then create or correct the
   per-component migration guide.
3. Give a migration agent only one v8 microcase and its relevant guide, then
   evaluate the generated v9 code against a hidden source-derived checklist.

Keep manifests, generated migrations, evaluation ledgers, and runner artifacts
outside the Fluent UI checkout. Only documentation and skill corrections belong
in the documentation pull request.

## Completion standard

Do not describe the documentation as exhaustive until:

- every public v8 component has a reviewed migration disposition;
- every supported mapping has a guide, or a deliberate umbrella-guide entry;
- generated guides are indexed and structurally consistent;
- every component guide has exactly one focused scenario;
- every focused run launches, builds, lints, and passes the isolation audit;
- every documentation-attributable finding has been corrected and rerun;
- the final ledger has zero `DOC_GAP`;
- structural documentation tests and `git diff --check` pass;
- existing multi-component scenarios still provide integration coverage.

An `AGENT_MISS` does not by itself make a guide incomplete. Report it
transparently, but change the guide only when its instruction is missing,
incorrect, or materially ambiguous.

## 1. Establish scope

Identify:

- the documentation checkout and pull-request branch;
- the directory containing the v8-to-v9 component guides;
- authoritative v8 and v9 implementation and type sources;
- the standard v9 application template used for generated code;
- existing multi-component migration scenarios;
- the targeted guide test command;
- the fork remote and pull request.

Enumerate guide paths dynamically. Compare the mapping or index document with
the guide files on disk, and fail on missing, duplicate, or unindexed guides.
The first complete verification used 53 focused guides and 14 integration
scenarios, but do not hardcode those counts after the guide set changes.

Record the initial worktree status. Never use broad restore or checkout
commands while an audit contains intentional uncommitted corrections.

## 2. Inventory v8 components and map destinations

Build a coverage ledger from public exports, not from the existing guide list.
The ledger must contain one row per public v8 component with:

- v8 component and package/import path;
- v8 source, type, style, test, and story locations;
- v9 replacement component or composition;
- destination package and import path;
- mapping kind;
- guide path;
- evidence and review status.

Use these mapping kinds:

| Kind            | Meaning                                                                        |
| --------------- | ------------------------------------------------------------------------------ |
| `direct`        | The component and core behavior have a v9 replacement.                         |
| `renamed`       | The destination component has a different name.                                |
| `decomposed`    | One v8 component becomes several v9 primitives.                                |
| `composed`      | Product-owned composition is required to preserve behavior.                    |
| `compat`        | The supported destination is a v9 compatibility package.                       |
| `shim`          | A migration shim is intentionally recommended as an intermediate step.         |
| `no-equivalent` | V9 has no supported equivalent; document alternatives and limitations.         |
| `umbrella`      | The component is fully covered by another guide; record that guide explicitly. |

Do not silently omit deprecated, specialized, or package-specific components.
Give each one a disposition, even when the result is `no-equivalent` or
`umbrella`. Keep internal implementation helpers out of the public inventory.

Cross-check the ledger against:

- v8 package barrel exports and component directories;
- existing component mapping/index documents;
- v9 root exports, subpackages, compat packages, and migration shims;
- all migration guide files.

Fail coverage validation on duplicate components, missing dispositions, broken
guide paths, or guides that have no inventory row.

## 3. Research each v8/v9 component pair

For the v8 side, inspect:

- public prop and enum types;
- default values in base/state hooks and tests;
- callback argument shapes and controlled-state behavior;
- rendered markup, roles, focus zones, keyboard handlers, and announcements;
- style functions, size tables, breakpoints, and visual-state defaults;
- stories and tests that demonstrate supported behavior;
- imperative refs and helper utilities.

For the v9 side, inspect:

- the actual exported package and component API;
- slot structure and declarative composition;
- default props, state hooks, event-data types, and controlled patterns;
- keyboard, Tabster, focus restoration, positioning, and dismissal contracts;
- ARIA behavior and native element semantics;
- design-token, `makeStyles`, size, layout, and responsive behavior;
- compat or shim behavior and known limitations;
- stories and tests for the proposed replacement.

Trace behavior to implementation source when types or stories are ambiguous.
Do not infer defaults from naming, and do not treat an existing migration guide
as authoritative evidence for itself.

For every v8 prop or behavior, record one outcome:

- direct prop or slot mapping;
- renamed value or callback-data mapping;
- changed default that must be set explicitly;
- manual composition with enough implementation guidance;
- unsupported behavior with a clear limitation;
- intentionally dropped behavior with rationale.

## 4. Produce or update the documentation

Create a guide for every uncovered supported mapping. Update an existing guide
when research proves it incomplete or inconsistent. If multiple v8 components
belong in one umbrella guide, make every covered component discoverable from
the mapping index and from the guide itself.

Follow the neighboring FromV8 MDX structure exactly. A complete guide normally
contains:

1. Storybook `Meta`, component migration title, and the standard title divider.
2. A concise destination decision, including the exact v9 package.
3. Import and composition changes.
4. A self-contained v8 example and behavior-equivalent v9 example.
5. A prop, enum, callback, and slot mapping table.
6. Changed defaults and behavioral differences.
7. Controlled/uncontrolled state and event-data guidance.
8. Accessibility, keyboard, focus, and dismissal guidance.
9. Styling, sizing, tokens, layout, and responsive differences.
10. Removed features, manual replacements, compat/shim limits, and
    no-equivalent cases.

The guide must be actionable without dependency source access. Include enough
per-component instruction for an isolated agent to implement the migration,
but do not paste entire source files or duplicate generic v9 documentation.

Examples must:

- use valid public imports;
- compile as TSX after normal surrounding declarations are supplied;
- preserve v8 observable behavior, not merely render a similar component;
- use `(event, data)` callback values when required by v9;
- preserve accessible naming, descriptions, roles, and focus behavior;
- distinguish source-faithful behavior from a documented product decision.

Update the component mapping/index and structural regression tests whenever a
new guide or umbrella mapping is added. Structural tests should detect missing
titles or dividers, duplicate registrations, broken paths, malformed fences,
and invalid TSX snippets.

## 5. Source-audit every guide

For each guide, verify claims against source rather than other prose:

- v8 prop defaults and callback signatures;
- v9 replacement components, packages, props, and callback data;
- controlled and uncontrolled state behavior;
- keyboard, focus, dismissal, and selection behavior;
- accessible names, descriptions, roles, and announcements;
- sizing, truncation, overflow, layout, and visual defaults;
- removed behavior that requires application-owned composition;
- shim and compatibility-package limitations;
- valid imports and compilable TSX examples.

Correct factual errors before running a focused scenario when source already
proves them. Keep style homogeneous with neighboring migration guides:

- use consistent headings, dividers, terminology, tables, and code fences;
- distinguish exact mappings, approximations, and manual composition;
- do not present semantic presets as pixel-exact aliases;
- state important omitted-prop defaults explicitly.

## 6. Create one reviewed scenario per guide

Author scenarios deliberately; do not extract code fences automatically when a
guide interleaves v8 and v9 examples.

Use this logical manifest schema:

```json
{
  "id": "component-example",
  "guide_path": "Example.mdx",
  "title": "Focused v8 behavior under test",
  "source": "Complete self-contained v8 TSX",
  "requirements": ["Hidden source-grounded behavior or accessibility requirement"]
}
```

Each source must:

- be a complete v8 function component with a default export;
- use only React and legitimate v8-era Fluent packages;
- include local data and state instead of product dependencies;
- exercise the riskiest documented defaults or behavioral mappings;
- contain no v9 implementation or hidden answer.

Each hidden requirement must be observable from the source or established by
an authoritative v8 default. Cover behavior, API mapping, accessibility, and
visual semantics where relevant.

Validate before running:

- entry count equals guide count;
- IDs and guide paths are unique;
- every guide path exists;
- manifest and guide inventories have no missing or extra paths;
- every source has a default export and no destination imports;
- every checklist is non-empty.

## 7. Prepare destination dependencies

Start from a normal v9 application template and its installed dependencies.
Add every destination package referenced by the guides, including compat,
charting, color-picker, migration-shim, and contrib packages.

Generated builds may resolve installed packages, but the migration agent must
not inspect dependency source or type declarations. Validate the untouched
template with its existing build and lint commands before launching agents.

## 8. Seal each migration workspace

Create a fresh workspace per scenario containing only:

- the v9 template, excluding generated output;
- a reference to installed dependencies;
- `INPUT.md` with the source-only v8 microcase;
- `GUIDE.mdx` with exactly the target guide;
- a placeholder `src/<scenario-id>/index.tsx`;
- a short isolation notice.

Do not expose:

- hidden requirements, expected output, or ground truth;
- benchmark specifications;
- other guides or mapping documents;
- repository history or previous iterations;
- network access or MCP servers;
- external filesystem paths;
- dependency source or type declarations;
- subagents, ambient skills, or configuration discovery.

Allow read, search, and edit tools inside the workspace plus the existing build
and lint commands. Permit compilers to resolve dependencies without granting
the agent direct reads of `node_modules`.

Require the agent to read `INPUT.md` and `GUIDE.mdx`, preserve observable v8
behavior, edit only the target file, migrate to the documented v9 destination,
and finish only after build and lint pass.

Capture a trajectory log. Reject runs that use a non-allowlisted tool, cross
the workspace boundary, read dependencies directly, or receive hidden
evaluation material.

## 9. Run focused and integration matrices

Run focused scenarios in bounded parallel batches. Keep every iteration in a
new output directory so corrective runs remain auditable.

Record for each scenario:

- launcher, build, and lint exit codes;
- tools used and permission rejections;
- isolation eligibility;
- generated source path.

Retain multi-component scenarios as an integration layer. Focused scenarios
prove one guide at a time; integration scenarios prove that mappings compose
in realistic workflows.

## 10. Hidden-evaluate source fidelity

The migration agent must never see this step's requirements.

For every checklist item, inspect generated source for:

- destination imports and component mappings;
- state and callback-data handling;
- keyboard and focus logic;
- dismissal, selection, overflow, and virtualization behavior;
- accessibility semantics and labeling;
- sizing, layout, and visual defaults represented by the source.

Classify each finding exactly:

| Classification  | Meaning                                                  | Action                               |
| --------------- | -------------------------------------------------------- | ------------------------------------ |
| `DOC_GAP`       | The guide is missing, wrong, or materially ambiguous.    | Correct the guide and rerun.         |
| `AGENT_MISS`    | The guide clearly covered behavior that the code missed. | Record it; optionally rerun cleanly. |
| `VALID_VARIANT` | The code differs but is source-equivalent.               | Count as a pass.                     |
| `ORACLE_DEFECT` | The checklist conflicts with authoritative source.       | Correct the scenario, not the guide. |

Judge from source unless runtime inspection is explicitly part of the oracle.
Do not turn every generated-code defect into more documentation; overfitting a
guide to one agent output makes it noisy and less authoritative.

## 11. Correct and rerun narrowly

For every `DOC_GAP`:

1. Reconfirm behavior in authoritative source.
2. Make the smallest complete guide correction.
3. Run structural guide tests.
4. Launch a clean workspace for only the affected scenario.
5. Rebuild, relint, and repeat hidden evaluation.
6. Continue until the rerun has no `DOC_GAP`.

If a rerun produces an `AGENT_MISS`, verify that the guide is explicit before
keeping the classification. Preserve all iterations in the ledger.

## 12. Perform a senior review

After the matrix reaches zero documentation gaps, review the complete diff
against source and neighboring guide style. Look specifically for:

- examples whose visible result works but accessibility semantics do not;
- invalid HTML composition hidden by permissive component types;
- focus restoration omitted from externally controlled overlays;
- responsive defaults presented as legacy fixed defaults;
- examples that preserve data but lose grouping or widget semantics;
- virtualizer wrapper and ref contracts;
- exact values hidden behind semantic-size approximations.

Fix high-confidence findings and rerun the affected focused scenarios.

## 13. Publish evidence

Before committing:

- rerun the targeted structural suite;
- run `git diff --check`;
- confirm only intended guide and skill files changed;
- confirm the latest ledger has zero `DOC_GAP`;
- obtain a final senior review with no unresolved high-confidence findings.

Push only to the pull request's fork and branch. Never force-push unless
explicitly authorized.

The pull-request comment must include:

- isolation contract;
- focused launcher, build, lint, and isolation counts;
- exact or valid-variant count;
- remaining `AGENT_MISS` descriptions;
- zero remaining `DOC_GAP` and `ORACLE_DEFECT`, when true;
- corrected findings and rerun outcomes;
- structural test result;
- focused plus integration totals;
- commit SHA;
- one row per guide.

Do not claim every generated migration matched ground truth when agent misses
remain. The defensible conclusion is that the documentation has zero remaining
documentation-attributable defects under the verified scenarios.

## Expected artifacts

Keep an auditable external structure such as:

```text
migration-verification/
  component-coverage-ledger.csv
  focused-component-scenarios.json
  runs/
    iteration-1/scenarios/<id>/
    iteration-2/scenarios/<id>/
  evaluations/
    iteration-1/*.json
    iteration-2/*.json
  summary.md
  pr-comment.md
```

Preserve earlier iterations so reviewers can see which defects were found,
what changed, and whether the corrective rerun removed them.
