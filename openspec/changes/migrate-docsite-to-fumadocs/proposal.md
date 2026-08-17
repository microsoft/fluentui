## Why

The Fluent UI v9 and headless documentation sites are Storybook builds. Storybook is an excellent
component workbench but a poor documentation framework: the entire docs experience is carried by a
bespoke ~15-file addon (`@fluentui/react-storybook-addon`) that reimplements a table of contents,
theme picker, RTL switch, props tables, and "copy as markdown" on top of `DocsContext`. Search,
navigation, SEO, and LLM-facing output are all second-class — `llms.txt` is currently produced by
scraping a _built_ Storybook with Playwright and round-tripping MDX through HTML and Turndown.

Fumadocs is a purpose-built documentation framework that provides navigation, search, i18n, SEO,
static export, and first-class `llms.txt` out of the box. Moving the docsite there lets us delete a
large amount of bespoke documentation machinery while keeping Storybook for what it is genuinely
good at.

The critical constraint: **example code must not be duplicated.** Examples are authored today as
Storybook stories and must remain so.

## What Changes

- Add a new React Router + Vite + Fumadocs application (`apps/public-docsite-v9-new`), statically prerendered and
  published alongside the existing sites as `/docs/react` (Fluent UI v9, 242 pages) and
  `/docs/headless` (headless preview, 53 pages).
- Consume Storybook story modules **directly as React modules**. The docsite imports the same
  `index.stories.tsx` files Storybook does and reads `meta`/`parameters` at runtime. No CSF parser,
  no code generation of examples, no duplicated example source.
- Reuse `@fluentui/babel-preset-storybook-full-source` unchanged, invoked from a Vite plugin, to
  obtain per-story source snippets, and mirror Storybook's `.md`-as-string module rule so component
  descriptions resolve identically in both hosts.
- Extract the pure, framework-agnostic parts of `@fluentui/react-storybook-addon-export-to-sandbox`
  into its public API so "Open in CodeSandbox / StackBlitz" works in the new site with the same
  scaffolding, dependency inference, and CSS-Module support.
- Add a build-time `react-docgen-typescript` step producing a props manifest, replacing Storybook's
  `<ArgTypes>` block. Port the slot-shorthand and native-props detection heuristics as **pure**
  functions (they currently mutate `__docgenInfo` in place).
- Reimplement the docs page chrome (story preview, source panel, props table, theme picker, RTL
  switch, copy-as-markdown) as Fumadocs MDX components. Drop the custom table of contents in favour
  of the framework's.
- Replace the Playwright-based `llms.txt` generator with Fumadocs' native LLM integration.
- Port the sidebar information architecture, which today exists only as a hand-maintained
  `options.storySort.order` array, into Fumadocs `meta.json` files.
- Keep Storybook deployed and unchanged as the component workbench, VRT/a11y harness, and the
  authoring surface for all examples. Its existing addresses are untouched.
- Once the new site reaches content parity, mark the Storybook documentation experience as
  deprecated and point readers to the new site. It stays published and functional.

This change is **purely additive to published addresses**. No existing URL changes, moves, or
redirects. The two sites run side by side.

### Non-goals

- Charts (`packages/charts`, 20 pages) remains a separate Storybook, composed today via a Storybook
  `refs` entry. Fumadocs has no `refs` equivalent; it becomes an external navigation link.
- The v8 docsite (`apps/public-docsite`) and `apps/theming-designer` are untouched.
- The migration-shim packages (`react-migration-v8-v9`, `react-migration-v0-v9`, 23 pages) are **not**
  ported. They contain inline playground applications that pull `@fluentui/react` (v8) and
  `@fluentui/react-northstar` (v0) into the bundle. They stay on Storybook and are linked out.
- No change to how examples are authored. Story files, their conventions, and their location are
  unchanged.
- **Removing or unpublishing the Storybook documentation site is out of scope.** It will be marked
  deprecated once parity is reached, but remains published indefinitely. Deciding when — or whether —
  the new site becomes the canonical documentation address is a separate future change.
- No existing published address changes. There are no redirects in this change.

## Capabilities

### New Capabilities

- `docsite/story-integration`: How the documentation site consumes Storybook story modules as the
  single source of truth for examples — module resolution, the `.md`-as-string and `fullSource`
  build rules, description resolution, and the guarantee that example code is never duplicated.
- `docsite/component-page`: The structure and behaviour of a component documentation page — section
  order, live story previews as client islands, source panel, props table, slot/native-props
  disclosure, theme picker, and text-direction switching.
- `docsite/sandbox-export`: Exporting any rendered example to CodeSandbox or StackBlitz, including
  dependency inference, project scaffolding, and CSS-Module support, from a non-Storybook host.
- `docsite/site-navigation`: Site information architecture, routing for the two documentation trees,
  search, `llms.txt` output, static serving with no server runtime, and non-interference with the
  existing published sites.

### Modified Capabilities

None. No existing specs are defined in this project.

## Impact

**New code**

- `apps/public-docsite-v9-new/` — React Router + Vite + Fumadocs application, content trees, and docs chrome
  components. Statically prerendered; no server runtime.

**Modified code**

- `packages/react-components/react-storybook-addon-export-to-sandbox` — widen the public API to
  export `scaffold`, `openCodeSandbox`, `openStackblitz`, `getDependencies`, and the `Data` type;
  move `Data` from the Storybook-coupled `sandbox-utils.ts` to `public-types.ts`; accept an injected
  `targetDocument` instead of reaching for the ambient `document` (repo rule #3).
- `tsconfig.base.json` — wildcard path entries for the 66 `*-stories` packages, whose current
  entries resolve only to an empty `stories/src/index.ts` barrel.
- Root `package.json` — `vite` 6.4.2 → 7.3.6 (see Dependencies).
- `packages/web-components`, `packages/charts/chart-web-components` — no source changes, but their
  Storybook builds now run on Vite 7 and are re-validated as part of this change.
- `tools/workspace-plugin` — generator support for the above path entries.
- `.github/workflows/docsite-publish-ghpages.yml` — build the new app and publish it into
  `_pages/docs/`, alongside the existing `react`, `headless`, `charts`, and `web-components` trees.
- `apps/public-docsite-v9`, `apps/public-docsite-v9-headless` — remain published at their current
  addresses, minus the `generate-llms-docs` post-build step, plus a deprecation notice once parity is
  reached.

**Removed / deprecated**

- `tools/storybook-llms-extractor` — superseded by Fumadocs' LLM integration once both trees have
  migrated. Its prop-table formatting helpers are reused; its Playwright scraping layer is deleted.
- The docs-page portion of `@fluentui/react-storybook-addon` becomes redundant for published docs,
  but is retained while Storybook remains the component workbench.

**Dependencies**

- Adds `react-router` 7.18.2, `@react-router/dev`, `@react-router/node`, `tailwindcss` v4,
  `fumadocs-core`/`fumadocs-ui` 16.x, `fumadocs-mdx` 15.x, and `shiki` to the workspace.
- **Bumps root `vite` 6.4.2 → 7.3.6.** `fumadocs-mdx` generates content indexes using the
  `import.meta.glob` `base` option, which is Vite 7+ only, despite declaring Vite 6 support. This
  affects the `web-components` and `chart-web-components` Storybook builds, which share root Vite;
  both are verified to build on Vite 7 (`@storybook/builder-vite@9.1.17` supports `^5 || ^6 || ^7`).
- Requires Node.js 22+ (already the repo's engine constraint).

**Risks**

- Fumadocs UI requires Tailwind CSS 4. Its preflight must not leak into the Griffel-styled examples
  rendered inside previews.
- 295 statically prerendered routes over ~1,100 example modules — build time must be measured early.
- 399 stateful stories and 42 stories touching `document`/`window` require every preview to be a
  client-only island.
- Two documentation sites run side by side indefinitely, which risks content divergence and reader
  confusion about which is canonical.
- `react-card` stories load assets from a hardcoded `raw.githubusercontent.com/.../master/...` URL.
