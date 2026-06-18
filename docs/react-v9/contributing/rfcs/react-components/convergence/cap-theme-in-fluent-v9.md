# RFC: Bring the CAP visual language into Fluent UI v9

---

_Contributors: (author: Enrico Gianoglio)_

> **Status — request for engineering review.** This RFC proposes making the CAP visual language a part of `@fluentui/react-components`. Phase 1 has been prototyped end-to-end and the bundle-size impact has been measured against live monosize fixtures (see [Bundle-size analysis](#bundle-size-analysis)). Phases 2–3 still need owner and timeline commitment from the Fluent v9 team and the `fluentui-contrib` maintainers. **Open questions** for reviewers are collected at the end of the document.

## Summary

Make the **CAP visual language** a first-class part of Fluent UI v9 so that:

1. A consumer of Fluent v9 can opt in to CAP **without installing any separate package** (no `@fluentui-contrib/*` dependency).
2. All future CAP work happens inside the Fluent v9 repo, on the Fluent release cadence, with the same CI guarantees (bundle size, conformance, VR, a11y) as the rest of v9.
3. CAP is discoverable and try-able directly on https://react.fluentui.dev/ — as a **visual-language toggle** that overlays the currently-selected base theme (web / teams / high-contrast / light / dark), _not_ as additional entries in the theme dropdown.

The change is small because the consumer-facing primitive already exists: `FluentProvider` accepts a `customStyleHooks_unstable` prop today and CAP is just a value to pass to it. We propose shipping that value (`CAP_STYLE_HOOKS`) from `@fluentui/react-components`, wiring it into the docs site as a toggle, and moving the source into the Fluent v9 monorepo.

## Why — motivation and benefits

### The problem in one sentence

> "We should try to get off this island of working in FluentUI Contrib so that the CAP theme becomes synonymous with Fluent and not a separate entity."

### Concrete pain caused by the current arrangement

CAP today exists as `@fluentui-contrib/react-cap-theme`. That arrangement actively works against adoption and against Fluent's own goals.

- **Discovery.** A team browsing `react.fluentui.dev` cannot find CAP. CAP isn't a theme in the theme picker, isn't documented on the same site, and isn't surfaced anywhere in the suite's README or API docs. The only way to learn that CAP exists is to be told.
- **Install friction.** Adopting CAP requires adding a `@fluentui-contrib/*` line to `package.json`. For internal Microsoft consumers this is read as "third-party / experimental" by reviewers and security audits, even though the underlying code overrides Fluent components themselves.
- **Release cadence drift.** CAP releases are decoupled from Fluent's pipeline. Bundle-size, VR, conformance and a11y CI in Fluent v9 do not gate CAP changes against the components CAP overrides. A breaking change to a Fluent component slot can silently invalidate the matching CAP override hook until a CAP consumer notices visually.
- **Harder to act on CAP's API needs.** When CAP needs something Fluent doesn't expose today (an additional slot, a richer state field, a render-prop hook), having CAP and the components in the same repo makes those needs much easier to see, discuss, and address — the gap, the component, and the override sit next to each other.
- **Ecosystem signal.** As long as CAP lives in `fluentui-contrib`, the implicit message is "CAP is one of many community experiments."

### Benefits of bringing CAP into v9

- **Zero-install adoption.** `import { CAP_STYLE_HOOKS } from '@fluentui/react-components'` — no new package, no `package.json` change beyond what teams already have.
- **One source of truth.** CAP overrides live next to the components they override. PRs touching, e.g., `<Button>` slots can include the matching CAP hook update in the same change, reviewed by the same owners, gated by the same VR.
- **Aligned release cadence.** CAP rides the Fluent v9 release train. Every Fluent minor that ships includes a CAP version that has already been validated against the components in that minor.
- **CI parity.** Bundle-size budgets, conformance, accessibility, and visual regression run against CAP the same way they run against every other v9 package. Regressions surface in the PR that introduces them, not weeks later when a consumer files a bug.
- **First-class discovery.** Docs site shows CAP as a visual-language toggle. Anyone evaluating Fluent for a new product sees CAP in the same flow they choose between web / teams / light / dark.
- **No re-architecture for consumers.** Phase 1 is purely additive; existing CAP consumers (those who installed `@fluentui-contrib/react-cap-theme` directly) keep working unchanged through Phase 3.

## Background — what CAP is

CAP is a **visual-language overlay** — a set of style decisions (border-radius, spacing, hover/focus treatment, etc.) that re-skin a subset of Fluent v9 components.

CAP today **is**:

- A single value: `CAP_STYLE_HOOKS`, a map matching `FluentProviderCustomStyleHooks`.
- Composed of per-component override hooks across Fluent component packages.
- Activated by passing it to the existing `customStyleHooks_unstable` prop on `FluentProvider`:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';

<FluentProvider theme={webLightTheme} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
  <App />
</FluentProvider>;
```

That is the entire opt-in surface today. `@fluentui-contrib/react-cap-theme` also ships a sibling map `TEAMS_STYLE_HOOKS`: rather than re-implementing styles from scratch, Teams layers **product-specific overrides on top of the CAP base hooks** as their own `PRODUCT_STYLE_HOOKS` map. Products consume CAP as a foundation and override only the per-component hooks they need to differentiate, instead of forking the entire visual language.

CAP **is not**:

- A separate provider. There is no `<CapProvider>`. CAP rides on `FluentProvider`'s existing prop.
- A runtime style engine. CAP overrides use Griffel `makeStyles()` and are extracted to atomic CSS at build time, like every other v9 component.

## Goals and non-goals

**Goals**

1. Eliminate the `@fluentui-contrib/*` install requirement for CAP consumers.
2. Give the Fluent v9 team ownership of CAP source, releases, and CI.
3. Make CAP discoverable and try-able from `react.fluentui.dev`.
4. Preserve bundle-size invariants for consumers who don't opt in to CAP.
5. **Position CAP for potential graduation into the default Fluent visual language.** If a future direction is for CAP to _become_ Fluent v9's baseline look (rather than remain an opt-in overlay), having CAP already authored, released, and CI-gated inside `@fluentui/react-components` turns that transition into a configuration change — flip the suite's default styles to consume the CAP hooks internally — rather than a migration with a new package, a new install, and a consumer rename. The work proposed here is the same work either way; only the eventual default differs.

## Proposal — phased approach

| Phase                             | Goal                                                                                                                                                                                | Risk                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **1. Re-export from Fluent v9**   | `@fluentui/react-components` internally depends on `@fluentui-contrib/react-cap-theme` and re-exports `CAP_STYLE_HOOKS`. Products import CAP from Fluent. Docs site shows a toggle. | Low — additive only.            |
| **2. Move source into Fluent v9** | New `packages/react-components/react-cap-theme/` package in the Fluent monorepo. Contrib package becomes a deprecated shim re-exporting from Fluent.                                | Medium — coordinated migration. |
| **3. Deprecate contrib package**  | Mark `@fluentui-contrib/react-cap-theme` deprecated on npm after one Fluent minor cycle.                                                                                            | Low.                            |

### Phase 1 — re-export contrib from Fluent v9

`@fluentui/react-components` adds `@fluentui-contrib/react-cap-theme` as an internal dependency and re-exports the hooks map from `src/index.ts`:

```ts
// packages/react-components/react-components/src/index.ts
export { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';
```

That is the entire Phase 1 change to the public API. Result for the product team:

```bash
# what they already have
yarn add @fluentui/react-components
```

```tsx
// what they write
import { FluentProvider, webLightTheme, CAP_STYLE_HOOKS } from '@fluentui/react-components';

<FluentProvider theme={webLightTheme} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
  <App />
</FluentProvider>;
```

No `@fluentui-contrib/*` in `package.json`. The contrib dependency is an internal implementation detail. The bundle-size cost of this re-export is documented empirically in [Bundle-size analysis](#bundle-size-analysis); the headline result is **0 bytes for tree-shakable named-import consumers**.

#### Why no `CapProvider` wrapper

Earlier drafts proposed a `<CapProvider>` component. Rejected: `FluentProvider` already has a first-class `customStyleHooks_unstable` prop. Adding a second provider component would duplicate the prop, force existing `<FluentProvider>` users to swap to a different component just to opt in, and complicate library code that wraps `<FluentProvider>` internally. The simpler answer is "expose the value and let consumers pass it to the prop they already use."

### Phase 2 — move source into Fluent v9

Create a new sibling package:

```
packages/react-components/
  react-cap-theme/                 # new — source of truth post-Phase-2
    library/src/
      capStyleHooks.ts             # exports CAP_STYLE_HOOKS
      components/                  # per-component override hooks
        react-accordion/
        react-avatar/
        react-button/
        react-card/
        ...
      index.ts
    stories/src/                   # optional CAP-specific stories
```

The folder structure mirrors today's contrib source layout.

`@fluentui/react-cap-theme` replaces `@fluentui-contrib/react-cap-theme` as the source. The contrib package becomes a thin re-export shim with a deprecation notice:

```ts
// fluentui-contrib/packages/react-cap-theme/src/index.ts (post-Phase-2)
/** @deprecated Import from `@fluentui/react-components` instead. */
export { CAP_STYLE_HOOKS } from '@fluentui/react-cap-theme';
```

## Phase 3 — deprecation of `@fluentui-contrib/react-cap-theme`

`@fluentui-contrib/react-cap-theme` is currently consumed by Teams behind a feature flag, so deprecation needs to be coordinated with that rollout rather than rushed. After one Fluent v9 minor cycle with `@fluentui/react-cap-theme` as the source of truth — and once Teams has migrated its import path to `@fluentui/react-components` — ship a final contrib release that adds the npm `"deprecated"` field pointing at `@fluentui/react-components` and stop accepting new feature PRs against it.

## Distribution shape — considered alternatives

Three import shapes were considered for shipping `CAP_STYLE_HOOKS` to consumers:

- **Option A — main-barrel re-export** (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components'`). Best discoverability, zero install surface, one extra `export` line in the suite. Tree-shaking holds for named imports (0 bytes); the only cost is +15.8 kB gzipped for `import *` consumers, which is a discouraged pattern with no evidence of real-world use.
- **Option B — subpath export** (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components/cap'`). Goes against an explicit repo policy: the suite's only existing subpath, `@fluentui/react-components/unstable`, is **already deprecated** with a banner that forbids new exports, directing preview/unstable APIs to ship as `*-preview` packages instead (see [`src/unstable/index.ts`](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-components/src/unstable/index.ts)). Adding a second subpath for CAP would re-introduce exactly the pattern the team is moving away from.
- **Option C — separate package** (`@fluentui/react-cap-theme-preview`, no re-export). Solves ownership and CI but re-introduces the extra-package install and keeps the discoverability problem CAP has today.

### Decision

**Phase 1 ships Option A.** The +15.8 kB gzipped cost only materializes on `import *`, and the discoverability + zero-install win is exactly what the RFC sets out to deliver.

## Bundle-size analysis

The claim of Phase 1 was verified against the live monosize fixtures of `@fluentui/react-components` by a clean before/after comparison.

### Methodology

- Both runs used `yarn nx run react-components:build --skip-nx-cache` → forced fresh transpile of all 71 tasks (suite + dependencies).
- `lib/index.js` and `lib-commonjs/index.js` SHA-256 hashes were captured between runs and verified to differ — the only source change being the `export { CAP_STYLE_HOOKS }` line being toggled on/off.
- Bundle measurement was run via `yarn monosize measure` directly from the suite directory — bypasses Nx cache entirely; webpack recompiles all 4 fixtures from scratch on each invocation.
- After the experiment, `lib/` hashes were verified to match the original WITH-CAP state byte-for-byte and the auto-generated `etc/react-components.api.md` was restored via `git checkout --`.

### Results — re-export cost (with vs without)

| Fixture                                            | WITH CAP re-exported (min / gz) | WITHOUT CAP re-exported (min / gz) |      Δ min |         Δ gz |
| -------------------------------------------------- | ------------------------------: | ---------------------------------: | ---------: | -----------: |
| `Button + FluentProvider + webLightTheme`          |            66.328 kB / 19.02 kB |               66.328 kB / 19.02 kB |      **0** |        **0** |
| `Accordion + Button + FP + Image + Menu + Popover` |           226.19 kB / 67.909 kB |              226.19 kB / 67.909 kB |      **0** |        **0** |
| `FluentProvider + webLightTheme`                   |           39.525 kB / 13.113 kB |              39.525 kB / 13.113 kB |      **0** |        **0** |
| `entire library` (`import *`)                      |           1.389 MB / 341.137 kB |              1.295 MB / 325.342 kB | **−94 kB** | **−15.8 kB** |

### Results — actual usage cost (when CAP is imported)

A separate sanity run measured the cost when a fixture **actively imports** `CAP_STYLE_HOOKS` (not just when CAP is reachable through the barrel):

| Fixture                                   | Without `CAP_STYLE_HOOKS` import (min / gz) | With `CAP_STYLE_HOOKS` import (min / gz) |                      Δ |
| ----------------------------------------- | ------------------------------------------: | ---------------------------------------: | ---------------------: |
| `Button + FluentProvider + webLightTheme` |                        66.328 kB / 19.02 kB |                   218.595 kB / 55.266 kB | +152.27 kB / +36.25 kB |

CAP statically imports per-component override modules from ≈20 Fluent component packages (Accordion, Avatar, Badge, Button, Card, Carousel, Checkbox, Combobox, Dialog, Drawer, Image, Input, Label, Link, Menu, Popover, Search, Tabs, Tags, TeachingPopover, Toolbar, Tooltip). When a consumer actually uses CAP, they pay for that graph — that's the cost of the visual language, not of the re-export pattern.

### Why tree-shaking holds

- `@fluentui-contrib/react-cap-theme@0.4.2` declares `"sideEffects": false` in its `package.json`.
- Its `makeStyles()` calls are Griffel-extracted at build time into atomic CSS in `lib/`. There is no runtime style-engine import path that the bundler can't follow statically.
- The re-export is a pure `export { … } from …` (no side-effecting `import`).

### Verifying locally

For reviewers who want to reproduce the tables above:

```bash
# from repo root
cd packages/react-components/react-components
yarn monosize measure      # direct invocation bypasses Nx cache
```

To measure "without CAP": comment out the `export { CAP_STYLE_HOOKS }` line in the suite's `src/index.ts`, run `yarn nx run react-components:build --skip-nx-cache` (forces a fresh `lib/`), then run `yarn monosize measure` again. Restore by uncommenting and re-running build, then `git checkout -- packages/react-components/react-components/etc/react-components.api.md` (the auto-generated API report regenerates on every build).

## Docs-site UX

The goal is that someone landing on https://react.fluentui.dev/ can try CAP in one click, without changing imports or installing anything.

Proposed UX (subject to docs-site team input — see [open questions](#open-questions-for-engineering-review)):

- A **visual-language toggle** in the existing theme picker toolbar, **separate from the theme dropdown** (which today switches between web / teams / high-contrast / light / dark). Toggle positions: `Default` | `CAP`. Default off.
- Toggle state is read by the docs-site's top-level `<FluentProvider>` wrapper. When `CAP` is selected, the wrapper passes `CAP_STYLE_HOOKS` to `customStyleHooks_unstable`.
- Every component page renders with the toggle applied, so a consumer evaluating CAP can browse `<Button>`, `<Card>`, `<Menu>`, etc., in CAP without leaving the page. Visual regression of the docs-site against both toggle states should be added to the existing `vr-tests-react-components` matrix to catch CAP regressions.

A working prototype of this toggle is up for review at [microsoft/fluentui#36308](https://github.com/microsoft/fluentui/pull/36308).

## Open questions for engineering review

This section lists the decisions the author needs from Fluent v9 engineering, docs-site engineering. Inline answers welcome via PR comment.

1. **Skip Phase 1 entirely?** Phase 1 (suite re-exports from contrib while contrib remains the source of truth) is a transitional step that ships zero-install + the docs-site toggle one release earlier, but doesn't actually solve the ownership / CI-gating / release-cadence problems the RFC's "Why" section lists — those all require Phase 2. Should we collapse Phase 1 and Phase 2 into a single move: introduce `@fluentui/react-cap-theme-preview` (or `@fluentui/react-cap-theme`) directly in the monorepo, suite re-exports `CAP_STYLE_HOOKS` from it, contrib becomes a deprecated shim re-exporting from the new package — all in one Fluent minor? Trade-off: collapses two ship vehicles into one and avoids the awkward "contrib is source, suite re-exports" intermediate state, at the cost of front-loading the migration mechanics (CODEOWNERS, git history, package shape, executors, CI surface). Phase 1 makes more sense if Phase 2 ownership is uncertain or migration mechanics need negotiation; skip-Phase-1 makes more sense if those are resolvable up front.
2. **Distribution shape — confirm Option A.** Does Fluent v9 engineering agree with the main-barrel re-export (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components'`) over a subpath (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components/cap'`) or a separate preview package (`import { CAP_STYLE_HOOKS } from '@fluentui/react-cap-theme-preview'`)? The bundle-size data argues for Option A, but the trade-off table is ultimately a judgement call about future-proofing — see [Distribution shape — considered alternatives](#distribution-shape--considered-alternatives).
3. **Phase 1 ship vehicle.** Can Phase 1 (a single re-export line plus a `dependencies` entry) ship in the next Fluent v9 minor release, or does it need to wait for Phase 2 to land first?
4. **Docs-site toggle UX.** Does the docs-site team agree with the toolbar-toggle design described above?
