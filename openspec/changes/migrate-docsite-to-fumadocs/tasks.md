Tasks are ordered by risk, per `design.md` — Migration Plan. Phase 0 validates the mechanism the
whole approach depends on; do not start Phase 3+ content work until Phase 1 exits.

The change is additive: the site is published at new `/docs/*` addresses from Phase 0 and the
Storybook sites are never moved, so no task in this plan alters an existing published address.

## 1. Phase 0 — Walking skeleton

Exit criterion: the Button page renders live examples with source under `/docs/react`, **and its
CodeSandbox export produces a running project.**

- [x] 1.1 Scaffold `apps/public-docsite-v9-new` as a React Router (framework mode) + Vite + Fumadocs app with an Nx `project.json` (`build`, `dev`, `lint`, `test` targets); register it in the workspace. Follows the existing `public-docsite-*` naming convention, builds to `dist` like every other app, and git-ignores the generated `.react-router` and `.source` directories.
- [x] 1.2 Add `react-router` 7.18.2, `@react-router/dev`, `tailwindcss` v4, `fumadocs-core`/`ui` 16.x, `fumadocs-mdx` 15.x, `shiki`; bump root `vite` 6.4.2 → 7.3.6 (design D12 — `fumadocs-mdx`'s Vite codegen emits the `base` glob option, which is Vite 7+ only)
- [x] 1.2a Smoke-test the Vite 7 bump: build the `web-components` and `chart-web-components` Storybooks and confirm no regression (`@storybook/builder-vite@9.1.17` declares `vite ^5 || ^6 || ^7`)
- [x] 1.3 Configure static output: `ssr: false` plus full `prerender` in `react-router.config.ts`, Vite `base: '/docs/'`, React Router `basename: '/docs'`; verify a prerendered deep link resolves when served as plain static files from a `/docs` sub-path with no rewrite rules (design D9)
- [x] 1.4 **Spike: prove the `fullSource` babel plugin runs from a Vite plugin.** Write the `enforce: 'pre'` transform over `/\.stories\.tsx?$/` invoking `@fluentui/babel-preset-storybook-full-source` with `storyGranularity: 'story'` and `importMappings` from `getImportMappingsForExportToSandboxAddon()` (design D2). **Blocking — resolve before 1.6.**
- [x] 1.5 Add the `.md` → string module rule as a Vite plugin, mirroring Storybook's `{ test: /\.md$/, type: 'asset/source' }`; add the matching ambient declaration
- [x] 1.6 Add wildcard `"@fluentui/<pkg>-stories/*"` path entries for `react-button` only; mirror in the Vite resolver; verify a deep story-module import resolves and type-checks
- [x] 1.7 Write a minimal `/docs/react/button` page that imports `@fluentui/react-button-stories/src/Button/index.stories` and renders one example live
- [x] 1.8 Assert `parameters.fullSource` is present and correct on that example (imports rewritten to `@fluentui/react-components`, workbench metadata stripped, unrelated declarations pruned)
- [x] 1.9 Widen the public API of `react-storybook-addon-export-to-sandbox`: export `scaffold`, `openCodeSandbox`, `openStackblitz`, `getDependencies`; move `Data` from `sandbox-utils.ts` to `public-types.ts`
- [x] 1.10 Replace ambient `document` access in `openCodeSandbox`/`openStackblitz` with an injected `targetDocument` (repo rule #3); update existing addon callers and unit tests
- [x] 1.11 Render an export button on the Button page that builds `Data` from props and calls `scaffold` + `openCodeSandbox`; **manually verify the sandbox installs and runs**
- [x] 1.12 Add a `_pages/docs/` build-and-copy step to `.github/workflows/docsite-publish-ghpages.yml`, leaving the four existing tree copies untouched; confirm the published site is reachable and unlinked
- [x] 1.13 Add a beachball change file for the `react-storybook-addon-export-to-sandbox` API change
- [x] 1.14 Measure prerender build time for the single-page build to establish a baseline

## 2. Phase 1 — Docs chrome

Exit criterion: `docsite/component-page` scenarios pass on the Button page; Tailwind isolation
verified.

- [x] 2.1 Scope Tailwind's preflight/base layer so it cannot apply to preview subtrees; render the same example in Storybook and the docsite and confirm they match pixel-for-pixel (design D11)
- [x] 2.1a Inject Griffel styles during prerender via a custom `app/entry.server.tsx` (`createDOMRenderer` + `RendererProvider` + `renderToStyleElements`). Verified with JavaScript disabled: the prerendered page alone renders full Fluent styling (8 style buckets, correct background/radius/font), so there is no flash of unstyled content.
- [x] 2.2 Build `<StoryPreview>` as a client-only island wrapping each example in `FluentProvider` + direction context, with a per-example error boundary (design D8)
- [x] 2.3 Build the source panel: reveal/hide, Shiki highlighting, copy-to-clipboard
- [x] 2.4 Write the docgen build step as an Nx-cached target: run `react-docgen-typescript` over component packages, emit a JSON manifest keyed by component name (design D6)
- [x] 2.5 Port slot-shorthand and native-props detection as **pure** functions applied at manifest-build time; add unit tests covering the `WithSlotShorthandValue` and `as?: "..."` forms
- [x] 2.6 Build `<PropsTable>` reading the manifest, including sub-components; reuse the formatting helpers from `tools/storybook-llms-extractor`
- [x] 2.7 Build the slot and native-props disclosure cards
- [x] 2.8 Build the theme picker and text-direction switch backed by React context, persisting across navigation; support a per-tree flag to omit the theme picker
- [x] 2.9 Build `<ComponentPage>` composing the section order from `FluentDocsPage.tsx` (title → controls → subtitle → description → primary → props → remaining examples), omitting empty sections
- [x] 2.10 Generate stable per-example anchors and verify deep links scroll correctly
- [x] 2.11 Build the copy-as-Markdown control
- [x] 2.9a **Restore authored example order.** ES module namespace objects sort keys alphabetically, so importing a story module lost the re-export order in `index.stories.tsx` — on the Button page `appearance` was promoted to primary instead of `Default`. Fixed with a Vite plugin that records each entry point's export order and exposes it as `__storyOrder`; `<ComponentPage>` consumes it automatically. Verified the rendered order now matches the authored order exactly.
- [x] 2.12 Add a build-time guard that fails with the module path named when a story module uses an unsupported authoring capability (`docsite/story-integration`)
- [x] 2.13 Add a reader-visible failure state for sandbox export: surface an error when the handoff fails and leave the page usable (`docsite/sandbox-export`)
- [x] 2.12a Declare `implicitDependencies: ["tag:type:stories"]` on the app. Found while testing the 2.12 guard: story packages live outside the project, so Nx treated a story edit as a cache hit and would have published stale docs. Mirrors `public-docsite-v9`.
- [x] 2.14 Add automated accessibility checks (axe-core via Playwright) over three representative pages plus a heading-order check, wired to the `test-a11y` Nx target. Found and fixed four real defects: missing `<title>`, an h1→h3 heading jump, two non-keyboard-reachable scrollable regions, and failing contrast on Fumadocs' `muted-foreground` token.

> Verification note: serve `dist/client` as the site root when verifying — pages and assets both live under `dist/client/docs`, so it is a faithful copy of what ships. Never verify a hand-merged directory.

## 3. Phase 2 — Headless tree

Exit criterion: CSS Modules render, and survive export with their token stylesheet.

- [x] 3.1 Generate wildcard path entries for `react-headless-components-preview-stories`; confirm CSS Module imports resolve under Vite
- [x] 3.2 Configure the `fullSource` plugin's `cssModules` option with the headless `tokens.css` path so `parameters.cssModuleSources` is populated
- [x] 3.3 Thread `cssModuleSources` into the sandbox `Data`; verify an exported headless example includes its stylesheet and the token stylesheet, and runs
- [x] 3.4 Write the stub generator script (throwaway, not part of the build): emit one MDX page per story entry point with frontmatter and an explicit story-module import (design D4)
- [x] 3.5 Generate the headless pages at `/docs/headless` (54 pages incl. 4 nested under `Concepts/` and `Tags/`, which a single-level scan initially missed). Required a Vite alias for the library's subpath exports (`@fluentui/react-headless-components-preview/*`). SwatchPicker (decorator) and Positioning (args/argTypes) render without hand-finishing; revisit if their controls are needed.
- [x] 3.6 Configure the `/docs/headless` tree with the theme picker omitted
- [x] 3.7a **Silence 608 sourcemap warnings.** `Error when using sourcemap for reporting an error` on 304 distinct headless `library/src` files — none of which the site's own plugins transform, so the cause is the new library subpath alias resolving raw `.ts`. Build succeeds and pages render, but the noise actively masked a genuine Rollup resolve failure during 3.5.
- [x] 3.7 Visually compared headless pages against the existing Storybook by diffing computed styles. Found the site never loaded the headless `tokens.css` — Storybook imports it globally from its preview, so CSS Module rules applied but every token reference fell back (border-radius 8px vs 12px, gaps and padding missing). Fixed by importing the stylesheet in the `/docs/headless` route only, so tokens do not leak into the styled tree. Accordion and Card now match on all 7 computed properties.
- [x] 3.8 Re-measured prerender build time: 58 routes in 14.8s cold, against 6 routes in 11.8s. Scaling is strongly sublinear (startup-dominated), so no mitigation is needed before Phase 3.

> Resolution note: the app resolves `@fluentui/*` to source via generated Vite aliases (the equivalent of Storybook's TsconfigPathsPlugin). Adding a tree needs no new alias — only tsconfig path entries. Verified with a clean `nx reset` build: 58 routes in 67s.

## 4. Phase 3 — v9 component pages

- [x] 4.1 Wildcard path entries are no longer needed per package: Vite aliases are generated from `tsconfig.base.json`, so a story package becomes importable as soon as it has a tsconfig path entry (which all 66 already do). Verified for `react-button` and `react-headless-components-preview`.
- [x] 4.2 Generated 91 v9 component pages (115 entry points minus the excluded migration shims and workbench-internal packages). Required aliases for the three deprecated packages that `@fluentui/react-components/unstable` still re-exports, and `tabster`/`keyborg` added to `ssr.noExternal` because they are CommonJS and Node rejects their named imports during prerendering. 149 routes build clean.
- [ ] 4.3 Hand-finish the v9 pages using `decorators` (all remaining after the headless ones in 3.5), converting each to a wrapper prop on `<ComponentPage>`
- [ ] 4.4 Hand-finish the v9 pages using `args` / `argTypes` / `controls` (all remaining after 3.5) with an interactive controls panel; decide per design Open Question 2 whether to use `defineStory` or a hand-rolled panel
- [ ] 4.5 Handle the non-standard packages: `react-motion` and `react-motion-components-preview` (`.ts` entry points, 59 `*.stories.md` sidecars), `react-theme` (MDX-only), `react-positioning`
- [ ] 4.6 Handle entry points with no `component` (`react-motion`) and the `hideArgsTable` / `skipPrimaryStory` flags
- [ ] 4.7 Fix `react-card` stories to import their local assets instead of the hardcoded `raw.githubusercontent.com/.../master/...` URL
- [x] 4.8 Migration-shim packages are excluded by the generator and no shim pages exist; no v8/v0 library appears in the output.
- [ ] 4.8a Reconcile sandbox dependency versions: the scaffold pins `react ^18` with `@types/react ^17` and `typescript ~4.7`, while the repo ships React 19.2.0 — exported projects should match what the docs render (pre-existing, shared with the workbench)
- [ ] 4.9 **Code-split the examples.** Measured: 44M output with a single 10M JS chunk, because the Fumadocs content index is generated with `import.meta.glob(..., { eager: true })` — every page's MDX, and therefore every story module, lands in one shared bundle. Attempted the supported lever, `docs: { async: true }` in `source.config.ts`: it does make collections lazy, but it moves the compiled body behind `page.data.load()`, so `DocsTreeRoute`/`ComponentPage` can no longer read `data.body` during render and every prerendered route 500s with "Element type is invalid". Landing this therefore requires converting the two tree routes to React Router `loader`/`clientLoader` data fetching first, then enabling async mode. Reverted for now so the build stays green.

## 5. Phase 4 — Conceptual MDX pages

- [ ] 5.1 Write a codemod converting `<Meta title="..." />` to Fumadocs frontmatter, deriving `title` and slug from the title path
- [ ] 5.2 Migrate the 96 `apps/public-docsite-v9/src/**/*.mdx` pages; delete the 11 dead `Source`/`Story`/`Preview`/`Link` imports the codemod surfaces
- [ ] 5.3 Migrate the 22 package MDX pages, including the 9 `*AccessibilitySpec.mdx` files
- [ ] 5.4 Convert the ~20 MDX pages that render live examples via `FluentCanvas` to use `<StoryPreview>`
- [ ] 5.5 Convert the 12 `react-combobox` MDX image imports to Vite asset handling
- [ ] 5.6 Enable build-time internal link validation and fix all reported breakages

## 6. Phase 5 — Navigation, search, machine-readable output

Exit criterion: `docsite/site-navigation` scenarios pass.

- [ ] 6.1 Port the sidebar IA from `options.storySort.order` in `apps/public-docsite-v9/.storybook/preview.js` into `meta.json` files; confirm undeclared pages still appear deterministically
- [ ] 6.2 Configure the two trees as layout tabs with independent navigation roots and client-side switching
- [ ] 6.3 Enable full-text search using the **static** search client with a prebuilt index; confirm no `api/search` server route exists and that search works from static hosting (design D10)
- [ ] 6.4 Enable the `llms.txt` summary and per-page plain-text output; verify a page edit is reflected in the same build
- [ ] 6.5 Verify machine-readable prop output uses the same abbreviated slot types as the rendered page (closing the current divergence)
- [ ] 6.6 Add outbound navigation links for charts and the migration shims, marked as leaving the site
- [ ] 6.7 Add a link from the documentation site to the component workbench
- [ ] 6.8 Remove the `generate-llms-docs` post-build step from `apps/public-docsite-v9` and `apps/public-docsite-v9-headless`; delete the Playwright scraping layer of `tools/storybook-llms-extractor`, retaining its formatting helpers

## 7. Phase 6 — Publish and cross-link

- [ ] 7.1 Run a full accessibility and link audit across all 295 pages
- [ ] 7.2 Review a sample of pages against the current Storybook for content parity; record accepted divergences
- [ ] 7.3 Link the new site from the repository README and docs entry points
- [ ] 7.4 Add a deprecation notice to the Storybook documentation experience linking to the new site; confirm every Storybook page remains reachable and functional
- [ ] 7.5 Confirm no existing published address changed and no redirect was introduced
- [ ] 7.6 Update `AGENTS.md` and `docs/` to describe where documentation now lives and how to author it
- [ ] 7.7 Add beachball change files for all touched published packages
