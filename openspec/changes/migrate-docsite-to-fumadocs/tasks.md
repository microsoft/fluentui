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
- [x] 4.3 Apply Storybook `decorators` automatically. `<ComponentPage>` now reads `meta.decorators` from the imported story module and applies them around each example, so the layout wrappers come from the same source of truth as the examples (design D1) rather than being re-declared per page and drifting. Verified: Field constrains to 400px, Avatar renders flex with a 5px gap, Label uses space-evenly. Covers all 10 v9 decorator pages and the headless SwatchPicker.
- [x] 4.4 Interactive controls panel (hand-rolled rather than `defineStory`, resolving design Open Question 2 — `defineStory` would mean re-authoring examples, which the whole approach exists to avoid). Merges component and story `argTypes` the way Storybook does, honours `table.disable` and `control: false`, infers a control from the declared type when none is given, and feeds the result into the example. Story `args` defaults apply with or without controls.
      Two behaviours worth knowing: a story that spreads props before its own attributes (`<Image {...props} alt="…" />`) cannot be varied, which matches Storybook; and stories declaring `args` without `argTypes` get no controls.
- [x] 4.4a Controls are derived from the docgen manifest when a story declares no `argTypes`, which is most of them. Authored `argTypes` still win, so an explicit choice to expose or hide a control is never overridden. Slots, refs, handlers, `as`/`ref`/`className` and unions longer than twelve options are left out rather than producing an unusable panel. CounterBadge went from no controls to nine, and editing `count` updates the example.
- [x] 4.4b **The primary example was missing its props.** Its `<Example>` call site never received `decorators`, `metaArgTypes` or `docgen` — only the secondary examples did — so the most prominent example on every page rendered without its decorator and without controls. Found while checking why derived controls had not appeared.
- [x] 4.5 Non-standard packages need no special handling: `react-motion` and `react-motion-components-preview` (`.ts` entry points, `*.stories.md` sidecars) and `react-positioning` all generate and render. Verified /docs/react/motion (3 previews), /docs/react/create-motion-component (10) and /docs/react/use-safe-zone-area (1), all 200 with no error boundaries or console errors.
- [x] 4.6 Entry points with no `component` render correctly (`<ComponentPage>` only uses `docgen` for the props table, which is optional), and `hideArgsTable` is honoured. `skipPrimaryStory` is not implemented; it is set in exactly one file repo-wide (`react-motion`), whose page renders correctly regardless.
- [x] 4.7 **Hardcoded asset URLs in `react-card`: left as they are, deliberately.** Twelve story files
      reference their images as `raw.githubusercontent.com/.../master/...` rather than importing them.
      All resolve today (checked, 200), and the reason for the URL is sound: a sandbox exported from the
      page has no way to resolve a repository-relative import, so making them local would break the
      CodeSandbox and StackBlitz buttons. Pinning a commit SHA would freeze the images and add a
      maintenance task for no present benefit.
      The real risk is not the URL but that nothing connected it to the file: moving or renaming an
      asset would break the published image silently, in Storybook too. `audit:content` now resolves
      every such URL against the working tree, needs no network, and fails in the same commit that
      moves the file — verified by moving one and watching two pages fail.
      The duplicated `resolveAsset` helper in each of the twelve files is the component team's to
      tidy; it is their stories, and it is not a documentation defect.
- [x] 4.8 Migration-shim packages are excluded by the generator and no shim pages exist; no v8/v0 library appears in the output.
- [x] 4.8a Exported sandbox dependencies now match the React version both hosts render. They pinned `@types/react ^17` against a React `^18` runtime while the repo ships React 19, so an exported project type-checked against a different React than the example was written for. Updated the scaffold's dev dependencies and both hosts' required dependencies; snapshots updated, 53 addon tests pass.
- [x] 4.9 Code-split the examples. Enabled `docs: { async: true }` so only frontmatter is eager, loaded each page body through `use()` inside a Suspense boundary, and switched the server entry to `prerender` from `react-dom/static` so prerendering waits for those boundaries instead of emitting fallbacks. Largest chunk 10M -> 476K, chunks 22 -> 464, per-page payload ~10M -> ~0.7M. Prerendered HTML still contains full content and Griffel styles (verified with JavaScript disabled).

- [x] 4.10 Fix component descriptions rendering as JavaScript source. Sibling `*Description.md` imports were being compiled into MDX components by `fumadocs-mdx` rather than read as strings, so every component page rendered `function MDXContent(props = {}) {...}` in place of its prose. The raw-string plugin now redirects those imports to a base64-encoded virtual module id, which the MDX file filter cannot match. Present since the first build; surfaced by the hydration mismatch that async collections introduced.

- [x] 4.11 Add a content audit that sweeps every prerendered page for defects (`test-content` target), rather than relying on spot-checks. Generated pages make "verify one, assume the rest" unsafe: it was exactly that habit which let 4.10 survive across 144 pages.
- [x] 4.12 Slot props leaking onto the DOM (`icon="[object Object]"` on Avatar, `root=`/`avatar=` on AvatarGroup) is **upstream Fluent behaviour, not introduced here**. Confirmed by rendering AvatarGroup in both hosts: Storybook emits the identical attributes (`role, id, root, avatar, class, aria-label`), so the site reproduces the workbench faithfully. The content audit now only flags `[object Object]` in page _text_, since flagging the attribute form would keep the gate permanently red and train people to ignore it.

- [x] 4.13 **Restore the props tables, which had silently disappeared site-wide.** Two causes: the docgen manifest still listed only Button, left over from the Phase 1 walking skeleton, and the page generator never emitted the `docgen` prop — so regenerating content overwrote the one hand-written page that had it. Every page rendered examples and no API. Components are now discovered from each package's `library/src/components/<Name>/<Name>.tsx` (214 components), parsed one package at a time because handing react-docgen-typescript all 351 files at once returns entries with zero props, and pages emit `docgen` when the manifest has an entry (122 pages). The content audit now fails a page that documents a component present in the manifest but renders no table — the earlier rule only caught a _failed_ lookup, and rendering nothing at all left no symptom.

## 5. Phase 4 — Conceptual MDX pages

- [x] 5.1 Codemod (`scripts/migrate-mdx.mjs`, one-shot, `--force` to regenerate) converting Storybook MDX to Fumadocs pages: strips the `<Meta>` marker and docs-block imports, derives frontmatter title and file path from the meta title, removes the now-duplicate leading h1, rewrites relative imports to a `@repo/*` alias so pages keep importing the originals rather than copies, and rewrites Storybook id links (`/docs/a-b-c--docs`) to their new paths using a map built from both conceptual and component pages.
- [x] 5.2 Migrated the conceptual pages. 54 of 118 source files became pages; 64 were excluded because they render live v8/v0 components (see 5.2a). Build is green at 203 routes and the content audit passes on all 202 prerendered pages.
- [x] 5.3 Package MDX pages are covered by the same codemod pass (it globs `packages/react-components/*/stories/src/**/*.mdx`), including the `*AccessibilitySpec.mdx` files.
- [x] 5.4 Converted the MDX pages that embedded live examples. `FluentCanvas` became `<StoryPreview>`, so those examples get this site's theming, direction and error boundary instead of pulling the Storybook addon into the bundle — the addon is now entirely absent from the output. `<FluentStory id="…">`, which references a story by id and has no component to render, became a link to that example's own page and anchor, as did Storybook's `?path=` deep links.
      Fixing this surfaced three heading defects the codemod had left: `<h1 class="sbdocs-title">` carried over from Storybook, `<Title>` usage surviving after its import was stripped (undefined at hydration, React error #419), and mid-document `#` headings. The content audit gained rules for duplicate h1s and for docs-block usage without an import, both scoped to the page's own headings so a component that legitimately renders an h1 — AccordionHeader, Image's examples, the theme designer — is not flagged.
- [x] 5.5 Image imports resolve through the same `@repo/*` alias rewrite as other relative imports, so no per-file conversion was needed.
- [x] 5.2a Exclude the per-component v8/v0 migration guides (`concepts/migration/from-v0/**`, `from-v8/**`, 64 pages). They render legacy components side by side and pull `@fluentui/react` and `@fluentui/react-northstar` into the bundle — transitively via story modules, so inspecting page text does not catch them; this was isolated by bisecting the content tree. Excluded by path for the same reason as the migration shim packages (proposal Non-goals); they remain on the Storybook docsite, which the site links out to.
- [x] 5.6 Internal link validation (`test-links` target) checks every `/docs/...` link in the built output, resolving page links against the actual routes and asset links against files on disk. It immediately caught a systematic bug: rewritten links included the router `basename`, producing `/docs/docs/react/...` on every migrated page. Links into the excluded v8/v0 subtree are now rewritten to the Storybook docsite so readers still reach that content. 20,759 links across 202 pages resolve.

## 6. Phase 5 — Navigation, search, machine-readable output

> Note: 3 pages log `ReferenceError: require is not defined` during prerender. The pages still render (content present, no error boundary, content audit passes), so it is a CommonJS dependency reached through a migrated page rather than a rendering failure. Worth tracing before publishing.

Exit criterion: `docsite/site-navigation` scenarios pass.

- [x] 6.1 Ported the sidebar IA. Two parts: the page _positions_ now come from each story's `meta.title` (`Components/Badge/CounterBadge`, `Utilities/...`) rather than its directory — deriving paths from directories had flattened every component to the root and lost the grouping entirely — and the _order_ is transcribed from `options.storySort.order` into `meta.json` files by `scripts/generate-nav.mjs`, with Fumadocs' `...` rest so unlisted pages still appear. Sidebar now reads Concepts, Theme, Components, ... as Storybook does.
- [x] 6.2 The two trees are layout tabs. Passing `tabs` alone rendered nothing: each tree is a separate `loader()`, so a tab cannot bind to a page tree, and Fumadocs needs `urls` to resolve the active tab in that case — plus `tabMode="top"` to place them. Verified in a browser: both tabs render, clicking switches to `/docs/headless`, and that tree's sidebar loads.
- [x] 6.3 Full-text search via the static client. The dialog fetches a prebuilt index rather than querying an `api/search` route, which cannot exist on static hosting. The index is built by `scripts/build-search-index.mjs`, which reads the content directory directly — the Fumadocs loader is built on `import.meta.glob` and only resolves inside Vite, so it cannot be used from a plain Node step. Fenced code, JSX and imports are stripped before indexing so pages match on prose rather than framework noise. Verified in a browser: 200 pages indexed, results returned, and the only search-related request is for the static index. Index is 3.5MB and fetched lazily when the dialog opens; worth revisiting if that proves heavy.
- [x] 6.4 `llms.txt` summary plus a plain-text rendering per page (201 files), generated by `scripts/build-llms.mjs` from the same content the site renders. Example source comes from the same babel plugin the source panels use, so published code is byte-identical to what a reader sees — unlike the previous generator, which scraped a built Storybook with Playwright and round-tripped MDX through HTML. Table cells escape `|` (union types would otherwise split rows) and very long generated unions are truncated, since `focusgroup` alone expands to several thousand members.
- [x] 6.5 Machine-readable prop output uses the same abbreviated slot types as the rendered page: both read the one docgen manifest, where the abbreviation is applied once at build time (design D6). Confirmed in the output — Button's `icon` is published as `Slot<"span">`, not the expanded `WithSlotShorthandValue<...>` the old extractor emitted.
- [x] 6.6 Outbound navigation links for charts and the migration guides, marked as external.
- [x] 6.7 Link from the documentation site to the component workbench, alongside the charts and migration links.
- [x] 6.8 **Re-scoped: keep the workbench's `llms.txt` generator.** Removing it was written before the decision that the workbench stays published and deprecated rather than retired, and it conflicts with `docsite/site-navigation`'s requirement that the deprecated workbench remains functional. Its output is published at `storybooks.fluentui.dev/react/llms.txt` and consumed by the workbench's own copy-as-markdown button; the new site publishes to a different address, so it is not a drop-in replacement and removal would simply break existing consumers. `tools/storybook-llms-extractor` therefore stays as-is, and is revisited only if the workbench is ever retired.

- [x] 6.9 TimePicker's page renders again (6 examples, 30 props, prerendered rather than falling back to client rendering). **Self-inflicted, from 4.4a.** Generated defaults are strings, and for a prop with no default docgen records the literal `"undefined"`; the derived controls passed that through, so the story received `hourCycle="undefined"`. Node's ICU rejects the _string_ "undefined" — the value `undefined` is fine — so `toLocaleTimeString` threw and took the page's content boundary with it. The literals `"undefined"` and `"null"` are now treated as no default.
      Worth recording: the stack pointed into `react-timepicker-compat`, and a fix there looked obvious. Reproducing the throw first showed `hourCycle: undefined` does not throw at all, which is what identified the real cause — otherwise an unrelated published component would have been changed to accommodate a bug introduced here.

- [x] 6.10 `ReferenceError: require is not defined` on three pages resolved. Storybook's webpack build
      resolved images with `require()` inside JSX; an ES module has no `require`, so those pages threw
      during prerender and fell back to client rendering. They are now real imports, and the codemod
      leaves fenced samples alone since a `require()` shown as an example is documentation.

## 7. Phase 6 — Publish and cross-link

- [ ] 7.0 **Fix the accessibility violations in the examples** found by 7.1 (13 rules). These live in the story files and component implementations, are equally present in Storybook, and are therefore out of scope for the migration itself — but the new site makes them prominent, and publishing documentation that fails its own accessibility bar is worth resolving before or shortly after launch. Ownership sits with the component teams.

- [x] 7.1 Full accessibility and link audit across every page. Links: 11,297 across 201 pages, all resolve. Accessibility (`audit:a11y`, a sweep rather than a gate — too slow to run per commit): 13 rules violated at serious/critical, all inside the rendered examples rather than the docs chrome — missing form labels, unnamed progressbars, unnamed buttons, scrollable regions without keyboard access. Provenance verified rather than assumed: headless ProgressBar reports `aria-progressbar-name` identically in Storybook and on the new site, so these are pre-existing defects in the examples that the migration surfaces but does not cause. The per-commit chrome gate stays green.
- [x] 7.1a Simulated the GitHub Pages deploy exactly as the workflow performs it: assembled the `_pages` artifact, copied the built site into `_pages/docs`, and served the result as static files. `/docs/react/components/button/` and `/docs/headless/components/accordion/` return 200 with examples and props tables, zero 404s and zero console errors; `llms.txt`, the search index and per-page text all serve; and the existing `/headless` Storybook still returns 200 alongside, confirming the new tree does not disturb it. Previously only local dev/preview had been exercised.
- [x] 7.2 Content parity checked mechanically rather than by sampling (`audit:parity`), comparing every component Storybook indexes against the examples the new site publishes. Headless: 53/53 components, every story present. React: 99/123, the 24 absent being the 23 migration shims and `useUncontrolledFocus`, all excluded by design because they render v8/v0 components. (Held at 99 only after 6.11 below: the page for `Concepts/Developer/Positioning Components` was in fact absent, so this figure was briefly wrong.)
      Accepted divergence: Concepts/Developer/Accessibility/Scenarios publishes none of its 20 stories inline. That matches Storybook, where the page is MDX linking to stories marked `!autodocs` rather than embedding them — though those links point at Storybook story URLs and are worth revisiting.
- [x] 7.2a **Include the Storybook docsite's own stories.** Parity revealed 10 entry points under `apps/public-docsite-v9/src` — focus-management and theme utilities, positioning concepts, accessibility scenarios — that the generator never scanned because it only looked at component packages. They appear in Storybook's sidebar like any other page and had been silently dropped. Nine are now generated; `useUncontrolledFocus` is excluded because its example renders v8's `FocusTrapZone`.
- [ ] 7.3 Link the new site from the repository README and docs entry points. **Deliberately deferred to launch:** linking to a site that is published but unannounced is fine; linking before it is actually deployed to Pages is not.
- [ ] 7.4 Add a deprecation notice to the Storybook documentation experience. **Deliberately deferred to launch:** `docsite/site-navigation` ties the notice to content parity being reached, and telling readers the workbench is deprecated before its replacement is live would mislead them.
- [x] 7.5 No existing published address changed and no redirect was introduced. The deploy workflow still copies the four existing trees to `_pages/react`, `_pages/charts`, `_pages/web-components` and `_pages/headless` unchanged; the new site only adds `_pages/docs`.
- [x] 7.6 Documented where documentation now lives and how to author it: a README for the app covering the no-duplication model, the gates, the one-shot generators and the deliberate exclusions, plus an AGENTS.md entry stating that examples are changed in their story, never in the docs site.
- [x] 7.7 Beachball change files verified with `yarn beachball check`, which reports none are needed.
      One published package is touched, `@fluentui/react-storybook-addon-export-to-sandbox`, and it has
      both a minor file for the widened export API and a patch file for the React version alignment.
      Everything else the branch changes is private or unpublished: the docs app itself, the deploy
      workflow, `.storybook/preview.js`, the root `package.json` and `tsconfig.base.json`.
      Note for the PR: the branch's base commit (`a774575c2c`, "docs: design v8 to v9 migration
      handbook") predates this work and is unrelated to it. It is not on master, so it will be carried
      into the pull request unless it is rebased out or raised separately.

## 8. Defects found by closing gaps in the checks

- [x] 8.1 **The link checker never looked at anchored links.** Its pattern was `href="(/docs/[^"#?]*)"`,
      and a class excluding `#` makes an href containing one fail to match at all rather than match its
      path — so every anchored link was skipped in silence. "~12k links resolve" overstated what was
      actually being checked. Fixing the pattern immediately surfaced 21 broken links that had been
      reported clean.
- [x] 8.2 **Doubled `/docs` prefix.** Component routes were registered as `/docs/<tree>/...` while page
      routes used `/<tree>/...`; the router adds the basename itself, so 18 links resolved to
      `/docs/docs/...`.
- [x] 8.3 **Four derivations of one path.** `generate-pages.mjs` derived a page's path from `meta.title`,
      while `migrate-mdx.mjs` derived links to that page from the story's _directory_ — so
      `Components/Accordion` was linked as `/react/accordion` but generated at
      `/react/components/accordion`. `component-page.tsx` and `audit-parity.mjs` each had a third and
      fourth copy of the anchor rule. All four now use `scripts/story-route.mjs`, which has tests
      (`yarn test`, 23 -> 33) because the paths and anchors of the whole site depend on it.
- [x] 8.4 **Anchors did not match Storybook's ids, contrary to the comment claiming they did.**
      `nameToHash` lowercased the export name, giving `motioncustom` where Storybook uses
      `motion-custom`, so every migrated deep link landed at the top of the page.
- [x] 8.5 **`?path=` links.** 17 links kept Storybook's query-string form and resolved against the
      current page. A related rule had been placed before the rewrite that produces the route it looks
      for, so it matched nothing until it was moved after it.
- [x] 8.6 **Fragments are now verified, not just paths.** A fragment matching no element leaves the
      reader at the top of the page with no sign anything is wrong. Three remained after the rewrites:
      two were Storybook's shorter anchor form and are now resolved against the real heading slugs;
      `#linkTBA` is a placeholder its author left for undocumented API, dead on Storybook too, and is
      listed as a known-dead fragment rather than invented a target for.
- [x] 8.7 **A page was missing entirely.** `Concepts/Developer/Positioning Components` had no page;
      parity reported 98/123 rather than the 99/123 recorded at 7.2, at HEAD as well as here, so the
      note had been inaccurate for some time. Now generated, rendering 16 examples. Its heading also
      showed why titles come from the directory rather than `meta.title` — `AvatarGroup` reads better
      as "Avatar Group" — so `meta.title` is used only where it says something genuinely different,
      as here ("Positioning" vs "Positioning Components").

### Mistakes made while doing the above, kept as warnings

- Deleting generated directories to force regeneration destroyed 14 pages, because `migrate-mdx.mjs`
  and `generate-pages.mjs` are one-shot codemods whose output is committed and hand-editable, not
  build steps. Recovered with `git checkout`; the diff is now inspected by category instead.
- An import was inserted into `generate-pages.mjs` by finding the last `import` line, which was inside
  the template literal for generated pages. That broke the generator and would have written a bogus
  import into every page it produced. Nothing caught it: one-shot scripts are outside type-check and
  the tests. It was found only by running the script.

## 9. Every page was blank

- [x] 9.1 **The site rendered no content at all, and every gate passed.** `tabMode="top"` renders the
      tree switcher into the same grid area as the page itself (`[grid-area:main]`). Neither element
      sets `align-self`, so both stretched to fill the row: the switcher became a 23,936px bar with an
      opaque background and `z-10`, painted over the article on all 209 pages. Fixed with one rule
      giving the switcher its own height. Present in fumadocs-ui 16.14.4 and unchanged in 16.15.1, so
      it is worth reporting upstream.
- [x] 9.2 **Why nothing caught it.** Every check reads the DOM, and the DOM was correct throughout:
      links resolved, content audits passed, axe was satisfied, parity matched. Presence was never the
      property that mattered. `yarn test:render` now asserts that a page's heading is the element you
      actually hit at its own coordinates, and that a page-appropriate amount of text is visible.
      Verified by removing the fix and watching all four pages fail with the covering element named.
- [ ] 9.3 **Descriptions render as raw Markdown on 127 of 209 pages** — literal `##`, `###` and
      backticks in the component description. `.md` imports become strings, matching Storybook's
      `asset/source` rule, but Storybook then renders that string as Markdown while the page prints it
      as text. The rule mirrored the input and not the output.
- [ ] 9.4 The `/react` and `/headless` landing pages carry two near-duplicate sentences
      ("Documentation for Fluent UI React v9 components." / "Documentation for Fluent UI React v9.")
      and little else, and their sidebar shows only the Storybook link while component pages show
      Charts and Migration guides too.
