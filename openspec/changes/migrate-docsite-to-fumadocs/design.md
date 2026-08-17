## Context

See `proposal.md` — Why, for motivation. The constraints that shape this design come from the shape
of the existing corpus and the existing deployment.

**Scale.** Every Storybook config globs `**/@(index.stories.@(ts|tsx)|*.mdx)`. The ~1,112
`*.stories.tsx` files are re-exported modules, not pages. Actual page counts: v9 = 242 (114 package
entry points, 22 package MDX, 10 app entry points, 96 app MDX); headless = 53.

**The corpus is unusually clean.** Across all component packages: 0 stories use `play`, 0 use a
`render` function in meta, 0 use `useGlobals`, 0 override `parameters.docs.source`. Only 9 files use
`args`, 11 use `argTypes`, 11 use `decorators` (all trivial layout wrappers). This is why a direct
module-consumption approach is viable at all.

**Content lives in two places.** Descriptions are split between 365 sibling `.md` imports and 763
inline `parameters.docs.description.story` assignments. Any approach that handles only one of these
is incomplete.

**Source snippets are already build-time artifacts.** No story file carries its own snippet.
`@fluentui/babel-preset-storybook-full-source` injects `parameters.fullSource` at build time — a
pure `@babel/core` plugin (deps: `@babel/core`, `pkg-up`, `prettier`) that reads from disk via
`state.filename`. Its 860-line `sliceStory.ts` normalises CSF2/CSF3 forms and prunes unused bindings
by reachability. Webpack is a 75-line delivery shim around it.

**The sandbox export is already mostly pure.** `sandbox-scaffold.ts` is a total function
`(Data) => Record<string, string>` — its own spec constructs it from an object literal with no
Storybook mock. `getDependencies.ts` is regex-only. `openCodeSandbox`/`openStackblitz` touch only
`document`. Storybook coupling is confined to ~240 lines: `prepareData`, `addDemoActionButtons`
(which queries `#anchor--{id} .docs-story`), and `webpack.ts`.

**Existing module resolution.** All 66 `*-stories` packages already have `tsconfig.base.json` path
entries, but each resolves to a `stories/src/index.ts` barrel whose entire content is `export {}`.
They exist for the Nx project graph, not for consumption.

**Existing deployment.** `.github/workflows/docsite-publish-ghpages.yml` builds four Storybooks and
copies them into one GitHub Pages artifact under `_pages/react`, `_pages/headless`, `_pages/charts`,
and `_pages/web-components`. GitHub Pages serves static files only: no server runtime, no rewrite
rules, no redirect status codes. The repo's `azure-static-web-apps-deploy.yml` is scoped to
`packages/web-components/**` and is not the docsite's deployment.

**The workspace is already Vite-based where it is not webpack.** Root `package.json` carries
`vite@6.4.2`, `starter-templates/src/react-components-vite` is the recommended consumer setup, and
the sandbox export's default bundler is `vite`. There is no Next.js anywhere in the repository.

## Goals / Non-Goals

**Goals:**

- Prove the risky mechanism (source snippets + sandbox export outside Storybook) before migrating
  any content.
- Keep the documentation site's dependency on Storybook one-directional: the site consumes story
  modules; Storybook gains no knowledge of the site.
- Make every migrated page hand-editable afterwards. Generated content is a starting point, not a
  standing build step.
- Reduce, not duplicate, bespoke documentation machinery.
- Ship additively. No published address changes, so the migration can be abandoned at any point
  without user-visible consequence.

**Non-Goals:**

- Changing how examples are authored. Story file conventions, locations, and metadata shapes are
  unchanged.
- Preserving the existing docs-page implementation. `FluentDocsPage.tsx` is treated as a
  specification of section order, not as code to port.
- A shared component library for docs chrome. Both trees live in one application; chrome components
  live in that application until a second consumer exists.
- Any server-side capability. The site is statically prerendered; nothing in the requirements needs
  a server.

## Decisions

### D1: Consume story modules directly; do not build a CSF extractor

**Decision.** The documentation site imports story modules the same way Storybook does, and reads
`meta` and `parameters` at runtime.

```tsx
import meta, * as stories from '@fluentui/react-button-stories/src/Button/index.stories';

meta.parameters.docs.description.component; // joined sibling .md files
stories.Default; // the live component
stories.Default.parameters.docs.description.story;
stories.Default.parameters.fullSource; // standalone source
stories.Default.parameters.cssModuleSources; // CSS Modules, headless only
```

This requires the host to apply the two build rules Storybook applies: `.md` → string module, and
the `fullSource` babel plugin.

**Why.** It satisfies `docsite/story-integration` structurally rather than by discipline. Both
description locations resolve for free, because they resolve through the same mechanism Storybook
uses. There is no parser to keep in sync with authoring conventions.

**Alternatives considered.**

- _Static CSF parsing._ Rejected. The entry points are re-export barrels
  (`export { Default } from './ButtonDefault.stories'`), so a parser must follow re-exports across
  files, then separately resolve `.md` imports and evaluate inline `parameters` expressions — 763 of
  which are multi-line template literals containing escaped backticks. This reimplements a bundler.
- _Reuse `tools/storybook-llms-extractor`._ Rejected as an input layer. It is a Playwright scrape of
  a _built_ Storybook calling `window.__STORYBOOK_PREVIEW__.storyStoreValue.cacheAllCSFFiles()`, and
  it round-trips MDX through HTML and Turndown. Its prop-table formatting helpers are reused; its
  input layer is deleted.
- _Fumadocs' own Story integration (`defineStory`)._ Rejected for the bulk. It is an args-driven
  controls playground; ~1,070 of the examples are compositions with no args. Adopting it would mean
  rewriting every example — precisely the duplication the proposal forbids. It remains available for
  the ~11 genuinely arg-driven pages.

### D2: Obtain `fullSource` from a Vite plugin, not a prebuild

**Decision.** A Vite plugin with `enforce: 'pre'` matches `/\.stories\.tsx?$/` and runs
`@fluentui/babel-preset-storybook-full-source` over the file, with `storyGranularity: 'story'`. The
plugin injects `parameters.fullSource` and `parameters.cssModuleSources` onto the module, exactly as
the Storybook webpack rule does today.

**Why.** It keeps everything on the imported module, so a page needs one import and no key-lookup
convention (D1, D4). It preserves HMR: editing a story updates its displayed source live, which
matters because story authoring is the primary contributor workflow.

**Why Vite makes this cleaner than webpack.** Storybook's webpack setup needs `custom-loader.js` to
strip the Griffel and v9 babel presets so they do not run during the extraction pass. Here babel is
invoked directly with only this one plugin — a pure AST-inject pass with TS/JSX preserved, which
esbuild transpiles afterwards. The stripping hack disappears. `storyGranularity: 'story'`, which the
addon's webpack preset never plumbed through, is also available.

**Alternative considered.** _A Node prebuild emitting `_.sources.json`sidecars.* This was designed
to decouple from Turbopack when the target was Next.js. With Vite that risk does not exist, and the
sidecar's costs remain: no HMR, two imports per page, a`file#exportName`keying convention, and`cssModuleSources` carried separately. Its only advantage — full Nx cacheability — is largely
recovered by a hash-keyed cache inside the plugin, to be added only if build time warrants it.

### D3: React Router (framework mode) on Vite

**Decision.** The application is React Router in framework mode, built by Vite, with Fumadocs' React
Router adapter.

**Why.**

- The site needs no server capability whatsoever — no SSR-at-request-time, no middleware, no API
  routes. It is a static documentation site.
- The workspace already ships Vite (`vite@6.4.2` at root, the `react-components-vite` starter, and
  `vite` as the sandbox export's default bundler). There is no Next.js anywhere in the repository,
  so Next.js would introduce a new framework, a new build model, and a new skill dependency for zero
  capability gain.
- Vite makes D2 straightforward, whereas Next.js' default Turbopack builder made a custom babel step
  the single largest technical risk in the plan.

**Alternatives considered.** _Next.js_ — the most mature Fumadocs adapter and the largest support
surface, but it buys nothing this site needs and costs the D2 risk. _Astro_ — its islands
architecture is arguably the best conceptual fit for 295 pages of prose plus interactive examples,
but it introduces a non-React page-shell layer for a team working entirely in React.

### D4: Pages are thin authored MDX with explicit imports

**Decision.** Each component page is ~6 lines of MDX importing its story module by name:

```mdx
---
title: Button
description: A button triggers an action or event.
---

import meta, * as stories from '@fluentui/react-button-stories/src/Button/index.stories';

<ComponentPage meta={meta} stories={stories} docgen="Button" />
```

The 295 stubs are generated once by a throwaway script, then hand-owned. The generator is not part
of the build.

**Why.** Explicit imports mean no runtime registry, no slug-to-module resolution layer, and no magic
strings to break silently. Pages stay diffable and editable, which `docsite/component-page` requires
for the 33 files with decorators, args, or argTypes that need per-page treatment.

**Alternative.** A generated `slug → () => import(...)` registry — rejected; it adds indirection and
a standing codegen step to save ~2 lines per page.

### D5: Widen the sandbox addon's public API rather than fork it

**Decision.** Export `scaffold`, `openCodeSandbox`, `openStackblitz`, `getDependencies`, and `Data`
from `@fluentui/react-storybook-addon-export-to-sandbox`. Move `Data` from the Storybook-coupled
`sandbox-utils.ts` to `public-types.ts`. Accept an injected `targetDocument`.

Discard `prepareData`, `addDemoActionButtons`, `prepareSandboxContainers`, and `webpack.ts` (~240
lines) — the site renders a React button and supplies `Data` from props.

**Why.** ~90% of the capability is already pure. Forking would create two implementations of
scaffolding and dependency inference that must stay in sync while Storybook remains deployed.
`docsite/sandbox-export` explicitly requires the capability to work without the workbench, which
makes widening the API the correct shape regardless.

The `targetDocument` injection also brings the code into compliance with repo rule #3 (never access
ambient `document`), which it currently violates.

**Note.** `storyExportToken` is currently derived from `context.originalStoryFn.name.split('_stories_')`
— a documented hack. In the new host the export name is known statically and is passed as a prop.

### D6: Props come from a cached prebuild, deliberately unlike D2

**Decision.** An Nx-cached build target runs `react-docgen-typescript` over the component packages
and emits a JSON manifest keyed by component name. `<PropsTable of="Button" />` reads it.

**Why a prebuild here but a Vite plugin in D2.** The two have opposite profiles:

|                                  | `fullSource` (D2) | docgen (D6)                 |
| -------------------------------- | ----------------- | --------------------------- |
| Cost per file                    | cheap             | expensive (full TS program) |
| Change frequency while authoring | constant          | rare                        |
| Value of HMR                     | high              | none                        |
| Cacheable across builds          | partially         | fully                       |

So `fullSource` belongs in the bundler and docgen belongs in a cached target. This is also the only
input not obtainable by importing the story module, because `__docgenInfo` is injected by Storybook's
own build.

**Sub-decision.** The slot-shorthand and native-props detection (`/as\?:\s*"([^"]+)"/`,
`WithSlotShorthandValue`) is ported as **pure** functions applied at manifest-build time. Today it
mutates `story.argTypes`, `__docgenInfo.props`, and every subcomponent's `__docgenInfo` in place —
with a warning comment saying so — and is applied by the docs page but _not_ by the LLM extractor,
so the two published surfaces currently disagree. Applying it once at manifest build satisfies the
`docsite/component-page` requirement that the abbreviation be uniform.

### D7: Wildcard module paths generated, not hand-maintained

**Decision.** Add `"@fluentui/<pkg>-stories/*"` wildcard entries to `tsconfig.base.json` via a
`tools/workspace-plugin` generator, and mirror them in the Vite resolver.

**Why.** The existing 66 entries resolve to empty barrels. Filling the barrels instead would make
every story module in a package a single import graph — pulling all of a package's examples into
every page that imports one. Wildcards preserve per-page code splitting.

### D8: Every preview is a client island

**Decision.** `<StoryPreview>` hydrates on the client only, and each example is wrapped in an error
boundary.

**Why.** 399 stories are stateful and 42 access `document`/`window` directly. `docsite/component-page`
requires that such examples neither fail prerendering nor blank the page when one throws.

### D9: Fully prerendered static output under a `/docs` base path

**Decision.** `react-router.config.ts` sets `ssr: false` and prerenders every route; Vite sets
`base: '/docs/'` and React Router `basename: '/docs'`. The build output is copied into `_pages/docs/`
by the existing GitHub Pages workflow, alongside the four existing trees. The two content trees are
served at `/docs/react` and `/docs/headless`.

**Why.** GitHub Pages serves static files with no rewrite rules, so every route must emit its own
`index.html` for deep links to resolve. Prerendering all 295 routes achieves this without an SPA
fallback.

**Why `/docs/*` rather than taking over `/react` and `/headless`.** Placing the new site on new
addresses makes the change purely additive: the Storybook sites keep serving their existing URLs
untouched, so no redirects are needed, nothing moves, and cutover is a link rather than a switch.
Taking over `/react` would have required relocating Storybook and shimming Storybook's legacy
query-string addresses (`/react/?path=/docs/components-button--docs`) client-side, since a static
host cannot redirect on a query string.

**Consequence.** Two documentation sites run side by side. See Risks.

### D10: Static search, never a server route

**Decision.** Use Fumadocs' static search client, which loads a prebuilt index emitted at build time.
Do **not** add the `route('api/search', 'routes/search.ts')` server endpoint from the Fumadocs React
Router installation guide.

**Why.** That endpoint is a server route and cannot exist on static hosting.
`docsite/site-navigation` requires search to work with no server runtime.

### D11: Tailwind is confined to docs chrome

**Decision.** Fumadocs UI requires Tailwind CSS 4. Its preflight/base layer is scoped so it cannot
apply to subtrees rendered inside `<StoryPreview>`, and Fluent components are never styled with
Tailwind utilities.

**Why.** Examples are styled with Griffel and, in the headless tree, CSS Modules. Tailwind's
preflight resets element defaults globally; if it reaches example subtrees, previews will not match
the same components rendered in Storybook or in a consumer application — which would silently
falsify the documentation.

### D12: Pin React Router one major behind; bump root Vite to 7

**Decision.** The app pins `react-router` / `@react-router/dev` to **7.18.2**. `fumadocs-core`,
`fumadocs-ui` (16.14.x) and `fumadocs-mdx` (15.2.x) track latest. Root `vite` is bumped
**6.4.2 → 7.3.6**.

**Why React Router stays on 7.** `react-router@8` requires `react >=19.2.7`; the workspace is on
19.2.0. Reaching 8 means a monorepo-wide React bump, which is out of scope for an additive
documentation change. `fumadocs-core` supports `react-router: 7.x || 8.x`, so 7.18.2 is fully
supported, not a downgrade path.

**Why root Vite must move to 7.** `fumadocs-mdx` declares `vite: 6.x.x || 7.x.x`, but that peer range
is inaccurate. Its generated content index calls `import.meta.glob` with the `base` option:

```
[vite:import-glob] Unknown glob option "base"   ← Vite 6.4.2
```

Vite 6 accepts only `as, eager, import, exhaustive, query`; `base` is Vite 7+. This was verified
empirically against the published artifacts of 13.0.8, 14.0.0, 14.3.2 and 15.2.3 — `generateViteGlobImport`
emits `base` in every one. No release on any line works on Vite 6, so the declared range cannot be
relied on.

**Why the bump is safe.** Root `vite` has no direct script consumers. Its only real consumers are two
Storybook builds, and `@storybook/builder-vite@9.1.17` declares `vite: ^5.0.0 || ^6.0.0 || ^7.0.0`.
Both were built on Vite 7 and pass:

| Consumer                                         | Result on Vite 7                       |
| ------------------------------------------------ | -------------------------------------- |
| `packages/web-components` Storybook              | builds clean                           |
| `packages/charts/chart-web-components` Storybook | builds clean                           |
| `starter-templates/react-components-vite`        | pins its own `vite ^6.0.5`, unaffected |

**Alternatives considered.** _Keep Vite 6 and hand-roll the content wiring_ (`index: false` plus
Vite-6-compatible globs) — rejected: it takes ownership of fragile glue against `fumadocs-mdx`
internals and fights the framework on every upgrade. _Keep Vite 6 and replace the content source
entirely_ — rejected: most work, and it reopens a settled decision.

**Follow-up, deliberately not taken here.** `react-router@8` additionally needs root `react` at
≥19.2.7. That is a separate change with its own validation surface.

## Risks / Trade-offs

- **Root `vite` bumped 6.4.2 → 7.3.6 (D12)** → Two Storybook builds outside this change share it.
  Verified: both `web-components` and `chart-web-components` Storybooks build clean on Vite 7, and
  `@storybook/builder-vite@9.1.17` declares support. Residual risk is runtime rather than build
  behaviour, covered by the existing VRT suites.

- **`react-router` pinned one major behind (D12)** → Upstream fixes land on 8.x first. Mitigated by
  7.18.2 being explicitly supported by `fumadocs-core`, and by the React bump that unblocks 8.x being
  named as a scoped follow-up rather than left implicit.

- **Tailwind preflight leaks into example previews** → Scope the base layer away from preview
  subtrees (D11) and verify by rendering the same example in Storybook and the docsite side by side
  during Phase 1, before any bulk migration.

- **Prerendering 295 routes over ~1,100 example modules is slow** → Measure at Phase 0 with one page
  and at Phase 2 with 53. Mitigations available in order: per-page dynamic imports, an Nx cache on
  the docgen target, and a hash-keyed cache inside the D2 plugin.

- **Two documentation sites run side by side indefinitely** → Content divergence and reader
  confusion about which is canonical. Mitigated by cross-linking both ways and, once parity is
  reached, a deprecation notice on the Storybook docs experience directing readers to the new site.
  The Storybook site is never unpublished. Choosing a canonical address is deferred to a future
  change.

- **Coupling to Storybook's `parameters` shape** → The site reads `parameters.docs.description.*` and
  `parameters.fullSource`. A Storybook major upgrade could change these. Mitigated by reading them
  through a single adapter module, and by the fact that `fullSource` is Fluent-owned, not Storybook's.

- **Two rendering hosts for the same examples can diverge visually** → The site and Storybook apply
  different global decorators. Mitigated by extracting the shared `withFluentProvider` /
  `withAriaLive` behaviour and asserting parity on a sample of pages. VRT remains in Storybook.

- **CSS Modules in headless (178 imports across 53 pages)** → Vite supports CSS Modules natively,
  but `cssModuleSources` must reach the sandbox export. Headless is migrated in its own phase,
  immediately after the walking skeleton, so this surfaces early rather than at the end.

- **Losing Storybook's addon ecosystem for docs** (a11y panel, controls, links) → Accepted. The a11y
  addon stays in Storybook, which remains the testing harness. Controls are reproduced only for the
  ~11 pages that use them.

- **`react-card` loads assets from a hardcoded `raw.githubusercontent.com/.../master/...` URL** →
  Fixed during Phase 3 by importing the local assets that already exist in the package.

## Migration Plan

Phases are ordered by risk, not by content volume. Each phase leaves the site deployable.

| Phase | Content                                                                                   | Exit criterion                                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Walking skeleton: app, `.md` rule, `fullSource` Vite plugin, prerendered build, one page  | The Button page renders live examples with source under `/docs/react`, **and its CodeSandbox export produces a running project** |
| 1     | Docs chrome: preview, source panel, docgen manifest, props table, theme/direction, export | `docsite/component-page` scenarios pass on the Button page; Tailwind isolation verified                                          |
| 2     | Headless tree (53 pages)                                                                  | CSS Modules render, and survive export with their token stylesheet                                                               |
| 3     | v9 component pages (124)                                                                  | Stub generator run; the 33 special-cased pages hand-finished                                                                     |
| 4     | Conceptual MDX pages (118)                                                                | `<Meta title>` codemodded to frontmatter; link check passes                                                                      |
| 5     | Navigation, search, `llms.txt`                                                            | `docsite/site-navigation` scenarios pass                                                                                         |
| 6     | Publish and cross-link                                                                    | Site live at `/docs/*`; Storybook docs experience marked deprecated but still published                                          |

**Deployment.** The new site publishes into `_pages/docs/` from Phase 0, unlinked from any
navigation until Phase 6. Because it occupies new addresses, it can be published continuously
without affecting readers.

**Rollback.** Storybook is never modified, moved, or unpublished in any phase, and no existing
address changes. Rollback at any point is to stop building the new tree and remove the cross-links;
readers are unaffected because they were never redirected. The only change to existing published
behaviour is removing the `generate-llms-docs` post-build step, deferred to Phase 5 so that the new
site's `llms.txt` is already live before the old one is retired.

## Open Questions

- The eventual canonical documentation address, and whether the new site should later move to a
  dedicated domain. Deferred: the site is additive, so this changes no spec, decision, or task in
  this change. It becomes a separate change once parity is reached.
- Whether the ~11 arg-driven pages adopt Fumadocs' `defineStory` for their controls or a
  hand-rolled controls panel. Both satisfy `docsite/component-page`; deferred to Phase 3 when the
  pages are in hand.
