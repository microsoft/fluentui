---
name: verify-v8-v9-migration-docs
description: >-
  Audit Fluent UI v8-to-v9 component migration guides and verify them with
  sealed documentation-only migrations. Use when asked to prove the migration
  guides are accurate or exhaustive, add one scenario per guide, classify
  documentation gaps versus agent mistakes, rerun corrected guides, or publish
  a verification matrix.
---

# Verify v8-to-v9 migration documentation

Prove the guides from two complementary directions:

1. Audit every guide against authoritative v8 and v9 source.
2. Give a migration agent only one v8 microcase and its relevant guide, then
   evaluate the generated v9 code against a hidden source-derived checklist.

Keep manifests, generated migrations, evaluation ledgers, and runner artifacts
outside the Fluent UI checkout. Only documentation and skill corrections belong
in the documentation pull request.

## Completion standard

Do not describe the documentation as exhaustive until:

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

## 2. Source-audit every guide

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

## 3. Create one reviewed scenario per guide

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

## 4. Prepare destination dependencies

Start from a normal v9 application template and its installed dependencies.
Add every destination package referenced by the guides, including compat,
charting, color-picker, migration-shim, and contrib packages.

Generated builds may resolve installed packages, but the migration agent must
not inspect dependency source or type declarations. Validate the untouched
template with its existing build and lint commands before launching agents.

## 5. Seal each migration workspace

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

## 6. Run focused and integration matrices

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

## 7. Hidden-evaluate source fidelity

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

## 8. Correct and rerun narrowly

For every `DOC_GAP`:

1. Reconfirm behavior in authoritative source.
2. Make the smallest complete guide correction.
3. Run structural guide tests.
4. Launch a clean workspace for only the affected scenario.
5. Rebuild, relint, and repeat hidden evaluation.
6. Continue until the rerun has no `DOC_GAP`.

If a rerun produces an `AGENT_MISS`, verify that the guide is explicit before
keeping the classification. Preserve all iterations in the ledger.

## 9. Perform a senior review

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

## 10. Publish evidence

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
