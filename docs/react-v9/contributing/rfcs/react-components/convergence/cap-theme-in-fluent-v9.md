# RFC: Bring the CAP visual language into Fluent UI v9

---

_Contributors: (author: Enrico Gianoglio)_

> **Status — request for engineering review.** This RFC proposes graduating the **CAP visual language** — currently shipped as `@fluentui-contrib/react-cap-theme` — into `@fluentui/react-components`, so consumers can opt in without installing a separate package. The first phase (re-exporting `CAP_STYLE_HOOKS` from the suite) has been prototyped end-to-end and its bundle-size impact has been measured against the suite's existing bundle-size fixtures (see [Bundle-size analysis](#bundle-size-analysis)).

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

CAP today exists as `@fluentui-contrib/react-cap-theme`. Starting CAP in `fluentui-contrib` made sense at the time: it let the visual language be prototyped and iterated on quickly, outside Fluent's release cadence and CI surface, without committing the Fluent v9 team to ownership before the shape of CAP had settled. CAP is not "done" yet — the API surface is still evolving — but it has reached a point where its overall shape and its consumer story (Teams) are taking form. The costs of keeping it in contrib now actively work against adoption.

- **Discovery.** CAP is technically documented on `react.fluentui.dev`, but only under the `Contributors Packages` section — it's not surfaced in the suite's README, in the API docs, or anywhere in the main browsing flow. A team evaluating Fluent for a new product is unlikely to find CAP unless someone tells them where to look.
- **Install friction.** Adopting CAP requires adding a `@fluentui-contrib/*` line to `package.json`. For internal Microsoft consumers this is read as "third-party / experimental" by reviewers and security audits, even though the underlying code overrides Fluent components themselves.
- **Surfacing CAP's needs from Fluent.** CAP can only override what Fluent components already expose. When a CAP override needs an additional slot, a richer state field, or a render-prop hook that doesn't exist yet, that's a Fluent change — it has to land in `@fluentui/react-components` first, and CAP catches up afterwards. Today, with CAP in a separate repo, that gap is harder to spot, harder to discuss with the component owner, and harder to land in lockstep. With CAP in the Fluent monorepo, the missing API, the component, and the override hook all sit next to each other and can be addressed in a single PR reviewed by the same owners.
- **Ecosystem signal.** As long as CAP lives in `fluentui-contrib`, the implicit message is "CAP is one of many community experiments."

### Benefits of bringing CAP into v9

- **Zero-install adoption.** `import { CAP_STYLE_HOOKS } from '@fluentui/react-components'` — no new package, no `package.json` change beyond what teams already have.
- **One source of truth.** CAP overrides live next to the components they override. PRs touching, e.g., `<Button>` slots can include the matching CAP hook update in the same change, reviewed by the same owners, gated by the same VR.
- **Aligned release cadence.** CAP rides the Fluent v9 release train. Every Fluent minor that ships includes a CAP version that has already been validated against the components in that minor.
- **CI parity.** Bundle-size budgets, conformance, accessibility, and visual regression run against CAP the same way they run against every other v9 package. Regressions surface in the PR that introduces them, not weeks later when a consumer files a bug.
- **First-class discovery.** Docs site shows CAP as a visual-language toggle.

## Background — what CAP is

CAP is a set of **custom style hooks** that re-skin a subset of Fluent v9 components. It is implemented entirely through Fluent v9's existing `customStyleHooks_unstable` extension point on `FluentProvider`.

Concretely, `@fluentui-contrib/react-cap-theme` exports two values:

- `CAP_STYLE_HOOKS` — a map matching `FluentProviderCustomStyleHooks`, with per-component override hooks for the Fluent components CAP re-skins today: `react-accordion`, `react-avatar`, `react-badge`, `react-button`, `react-card`, `react-carousel`, `react-checkbox`, `react-combobox`, `react-dialog`, `react-drawer`, `react-image`, `react-input`, `react-label`, `react-link`, `react-menu`, `react-popover`, `react-search`, `react-tabs`, `react-tags`, `react-teaching-popover`, `react-toolbar`, `react-tooltip`.
- `TEAMS_STYLE_HOOKS` — the same shape, layered on top of `CAP_STYLE_HOOKS` to add Teams-product-specific overrides without re-implementing the CAP base.

It is activated by passing the map to the existing `customStyleHooks_unstable` prop on `FluentProvider`:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';

<FluentProvider theme={webLightTheme} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
  <App />
</FluentProvider>;
```

That is the entire opt-in surface today.

### Direction of dependency: Fluent first, then CAP

Because CAP is a styling layer over Fluent components, the direction of change is one-way:

- Component APIs, slots, state fields, and structural primitives are owned by Fluent v9.
- A CAP override hook can only re-style slots and consume state that the underlying Fluent component already exposes. When a CAP design requires something the component doesn't expose, the missing piece has to be added in `@fluentui/react-components` first — with the usual API review, change file, and version bump — and CAP then updates its override hook to use it.
- This RFC does not change that direction. It moves CAP closer to Fluent so the Fluent-side changes and the CAP-side follow-ups can be coordinated in the same repo, but Fluent stays the source of truth for component shape and CAP stays a pure consumer of those shapes.

### Consumers

- **Teams (current).** Teams CAP adoption is gated behind a feature flag in Teams: when the flag is enabled, Teams imports `TEAMS_STYLE_HOOKS` from `@fluentui-contrib/react-cap-theme` and passes it to the `customStyleHooks_unstable` prop of `FluentProvider`. `TEAMS_STYLE_HOOKS` itself is authored inside `@fluentui-contrib/react-cap-theme` (not in Teams) — it is layered on top of `CAP_STYLE_HOOKS` so that Teams overrides only the per-component hooks where it needs to differentiate from the CAP base.
- **SharePoint (current, via wrappers).** SharePoint already integrates CAP, but through a different path than Teams: instead of importing `CAP_STYLE_HOOKS` and passing it to `customStyleHooks_unstable`, SharePoint maintains its own layer of wrapper components that re-export the Fluent v9 components with the CAP look pre-applied. We are planning with the SharePoint team to migrate them off this in-house wrapper layer. Two shapes are on the table: (a) SharePoint consumes Fluent components directly and applies `CAP_STYLE_HOOKS` through `customStyleHooks_unstable` (the Teams pattern), or (b) the wrapper components themselves move into the CAP package and SharePoint imports them from there.

## Goals

1. Eliminate the `@fluentui-contrib/*` install requirement for CAP consumers.
2. Make CAP discoverable and try-able from `react.fluentui.dev`.
3. Preserve bundle-size invariants for consumers who don't opt in to CAP.
4. **Position CAP for potential graduation into the default Fluent visual language.** If a future direction is for CAP to _become_ Fluent v9's baseline look (rather than remain an opt-in overlay), having CAP already authored, released, and CI-gated inside `@fluentui/react-components` turns that transition into an easier step than starting from a separate repo: the override hooks already live next to the components they re-skin, the bundle-size and VR baselines are already established against the rest of v9, and the consumer-facing import path does not have to change. The work proposed here is the same work either way; co-location just preserves the optionality.

## Proposal — phased approach

| Phase                             | Goal                                                                                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Re-export from Fluent v9**   | `@fluentui/react-components` internally depends on `@fluentui-contrib/react-cap-theme` and re-exports `CAP_STYLE_HOOKS`. Products import CAP from Fluent. Docs site shows a toggle. |
| **2. Move source into Fluent v9** | New `packages/react-components/react-cap-theme/` package in the Fluent monorepo. Contrib package becomes a deprecated shim re-exporting from Fluent.                                |

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

The bundle-size cost of this re-export is documented empirically in [Bundle-size analysis](#bundle-size-analysis); the headline result is **0 bytes for tree-shakable named-import consumers**.

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
```

The folder structure mirrors today's contrib source layout.

`@fluentui/react-cap-theme` replaces `@fluentui-contrib/react-cap-theme` as the source. The contrib package becomes a thin re-export shim with a deprecation notice:

```ts
// fluentui-contrib/packages/react-cap-theme/src/index.ts (post-Phase-2)
/** @deprecated Import from `@fluentui/react-components` instead. */
export { CAP_STYLE_HOOKS } from '@fluentui/react-cap-theme';
```

## Distribution shape — considered alternatives

Three import shapes were considered for shipping `CAP_STYLE_HOOKS` to consumers:

- **Option A — main-barrel re-export** (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components'`). Best discoverability, zero install surface, one extra `export` line in the suite. Tree-shaking holds for named imports (0 bytes); the only cost is ≈+16 kB gzipped for `import *` consumers, which is a discouraged pattern with no evidence of real-world use.
- **Option B — subpath export** (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components/cap'`). Goes against an explicit repo policy: the suite's only existing subpath, `@fluentui/react-components/unstable`, is **already deprecated** with a banner that forbids new exports, directing preview/unstable APIs to ship as `*-preview` packages instead (see [`src/unstable/index.ts`](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-components/src/unstable/index.ts)). Adding a second subpath for CAP would re-introduce exactly the pattern the team is moving away from.
- **Option C — separate package** (`@fluentui/react-cap-theme-preview`, no re-export). Solves ownership and CI but re-introduces the extra-package install and keeps the discoverability problem CAP has today.

## Bundle-size analysis

The claim of Phase 1 was verified against the live monosize fixtures of `@fluentui/react-components` by a clean before/after comparison.

### Methodology

- **Baseline** captured first on a clean tree by running `yarn nx run react-components:bundle-size --skip-nx-cache` against the 4 existing fixtures.
- **Phase 1 prototype** was then applied — adding `@fluentui-contrib/react-cap-theme` as a `dependencies` entry in `packages/react-components/react-components/package.json` and a single `export { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme'` line to `src/index.ts` — followed by `yarn install` and a re-run of the same command. `--skip-nx-cache` is required because `package.json` is not in the `bundle-size` target's input list.
- For the actual-usage measurement, a throwaway fixture (`ButtonProviderAndThemeWithCAP.fixture.js`) was added that imports `{ Button, FluentProvider, webLightTheme, CAP_STYLE_HOOKS }` together, alongside the existing `ButtonProviderAndTheme.fixture.js` which imports the same set minus `CAP_STYLE_HOOKS`. The delta between those two fixtures is the cost paid by a consumer who actually opts in to CAP.
- All measurements use `monosize` + `monosize-bundler-webpack`, which produces a minified bundle per fixture and gzip-sizes it.
- After the experiment, the package.json, src/index.ts, yarn.lock, auto-generated `etc/react-components.api.md` and the throwaway fixture were reverted/removed (`git checkout --` / `rm`).

### Results — re-export cost (with vs without)

Three of the four fixtures — `Button + FluentProvider + webLightTheme`, `Accordion + Button + FP + Image + Menu + Popover`, and `FluentProvider + webLightTheme` — showed a **0-byte delta** in both minified and gzipped output (byte-for-byte identical across the before/after runs). The only fixture with a measurable delta is `entire library` (`import *`):

| `entire library` (`import *`) |        Min |             Gz |
| ----------------------------- | ---------: | -------------: |
| Without CAP re-exported       |   1.295 MB |     325.342 kB |
| With CAP re-exported          |   1.391 MB |     341.577 kB |
| **Δ (cost of the re-export)** | **+96 kB** | **+16.235 kB** |

### Results — actual usage cost (when CAP is imported)

A separate sanity run measured the cost when a fixture **actively imports** `CAP_STYLE_HOOKS` (not just when CAP is reachable through the barrel). Fixture: `Button + FluentProvider + webLightTheme`.

| `Button + FluentProvider + webLightTheme` |            Min |             Gz |
| ----------------------------------------- | -------------: | -------------: |
| Without `CAP_STYLE_HOOKS` import          |      66.328 kB |      19.020 kB |
| With `CAP_STYLE_HOOKS` import             |     220.097 kB |      55.797 kB |
| **Δ (cost of using CAP)**                 | **+153.77 kB** | **+36.777 kB** |

CAP statically imports per-component override modules from ≈20 Fluent component packages (Accordion, Avatar, Badge, Button, Card, Carousel, Checkbox, Combobox, Dialog, Drawer, Image, Input, Label, Link, Menu, Popover, Search, Tabs, Tags, TeachingPopover, Toolbar, Tooltip). When a consumer actually uses CAP, they pay for that graph — that's the cost of the visual language, not of the re-export pattern.

### Verifying locally

To reproduce the tables above:

```bash
# from repo root, on a clean tree → baseline numbers
yarn nx run react-components:bundle-size --skip-nx-cache

# apply the 2-line Phase 1 prototype:
#   1. add `"@fluentui-contrib/react-cap-theme": "^0.4.2"` to dependencies of
#      packages/react-components/react-components/package.json
#   2. add `export { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';`
#      to packages/react-components/react-components/src/index.ts
yarn install
yarn nx run react-components:bundle-size --skip-nx-cache    # → re-export cost

# optional: actual-usage cost
# add a fixture importing { Button, FluentProvider, webLightTheme, CAP_STYLE_HOOKS }
# into packages/react-components/react-components/bundle-size/, then re-run.
```

`--skip-nx-cache` is required because `package.json` is not an input of the `bundle-size` target — without it the second run returns the cached baseline. Editing `src/index.ts` would bust the cache on its own, but `package.json` won't.

To reset: `git checkout -- packages/react-components/react-components/{package.json,src/index.ts,etc/react-components.api.md} && yarn install`.

## Docs-site UX

The goal is to give CAP a single, central place where anyone — designers, partner teams evaluating Fluent, Fluent engineers reviewing a CAP-related PR — can see every component rendered in CAP without setting up a project, changing imports, or installing anything.

Proposed UX (subject to docs-site team input — see [open questions](#open-questions-for-engineering-review)):

- A **visual-language toggle** in the existing theme picker toolbar, **separate from the theme dropdown** (which today switches between web / teams / high-contrast / light / dark). Toggle positions: `Default` | `CAP`. Default off.
- Toggle state is read by the docs-site's top-level `<FluentProvider>` wrapper. When `CAP` is selected, the wrapper passes `CAP_STYLE_HOOKS` to `customStyleHooks_unstable`.
- Every component page renders with the toggle applied, so a consumer evaluating CAP can browse `<Button>`, `<Card>`, `<Menu>`, etc., in CAP without leaving the page. Visual regression of the docs-site against both toggle states should be added to the existing `vr-tests-react-components` matrix to catch CAP regressions.
- The same toggle is also available in the local Storybook dev environment (`yarn start` on the suite). When a CAP author is implementing or tweaking an override hook, they can switch the story between `Default` and `CAP` in the same browser window — without rebuilding, without spinning up a separate CAP-only preview app, and against the exact local Fluent component code they're editing.

A working prototype of this toggle is up for review at [microsoft/fluentui#36308](https://github.com/microsoft/fluentui/pull/36308).

## Open questions for engineering review

This section lists the decisions the author needs from Fluent v9 engineering, docs-site engineering. Inline answers welcome via PR comment.

1. **Skip Phase 1 entirely?** Phase 1 (suite re-exports from contrib while contrib remains the source of truth) is a transitional step that ships zero-install + the docs-site toggle one release earlier, but it's just an intermediate step. Should we collapse Phase 1 and Phase 2 into a single move: introduce `@fluentui/react-cap-theme` directly in the monorepo, suite re-exports `CAP_STYLE_HOOKS` from it, contrib becomes a deprecated shim re-exporting from the new package — all in one Fluent minor?
2. **Distribution shape — confirm Option A.** Does Fluent v9 engineering agree with the main-barrel re-export (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components'`) over a subpath (`import { CAP_STYLE_HOOKS } from '@fluentui/react-components/cap'`) or a separate preview package (`import { CAP_STYLE_HOOKS } from '@fluentui/react-cap-theme-preview'`)? The bundle-size data argues for Option A, but the trade-off table is ultimately a judgement call about future-proofing — see [Distribution shape — considered alternatives](#distribution-shape--considered-alternatives).
3. **Docs-site toggle UX.** Does the docs-site team agree with the toolbar-toggle design described above?
