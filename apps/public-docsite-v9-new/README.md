# Fluent UI documentation site (Fumadocs)

Documentation site for Fluent UI React v9 and the headless component preview, built with
React Router, Vite and [Fumadocs](https://fumadocs.dev). Published at `/docs/react` and
`/docs/headless`, alongside — not replacing — the Storybook docsites.

## The idea

Examples are **not duplicated here**. This site imports the same `*.stories.tsx` modules
Storybook does and reads their `meta`/`parameters` at runtime, applying the same two build
rules Storybook applies:

| Rule                                           | Purpose                                                  |
| ---------------------------------------------- | -------------------------------------------------------- |
| `.md` as a string module                       | component descriptions resolve identically in both hosts |
| `@fluentui/babel-preset-storybook-full-source` | standalone, import-rewritten source per example          |

A component page is therefore a few lines:

```mdx
---
title: Button
---

import meta, * as stories from '@fluentui/react-button-stories/src/Button/index.stories';
import { ComponentPage } from '../../app/components/component-page';

<ComponentPage meta={meta} stories={stories} docgen="Button" />
```

Editing an example means editing its story. Nothing here needs to change.

## Commands

```bash
yarn nx run public-docsite-v9-new:build        # docgen -> search index -> llms.txt -> prerender
yarn nx run public-docsite-v9-new:dev
yarn nx run public-docsite-v9-new:type-check
```

### Gates

| Target         | Checks                                                 |
| -------------- | ------------------------------------------------------ |
| `test`         | pure build-script logic (Node's test runner)           |
| `test-content` | every prerendered page for content defects             |
| `test-links`   | every internal link resolves, against the built output |
| `test-a11y`    | accessibility of the page chrome                       |

Plus `audit:a11y`, a full-site accessibility sweep that is too slow to gate on.

**Verify against `dist/client`**, which is a faithful copy of what ships. Pages and assets
both live under `dist/client/docs`.

## Adding pages

Generators are one-shot; pages are hand-owned once created and are never overwritten unless
`--force` is passed.

```bash
node scripts/generate-pages.mjs react      # component pages, from story entry points
node scripts/migrate-mdx.mjs               # conceptual pages, from Storybook MDX
node scripts/generate-nav.mjs              # meta.json ordering
```

A page's position comes from its story `meta.title` (`Components/Badge/CounterBadge`), not
its directory. The sidebar _order_ comes from `options.storySort.order` in the Storybook
preview config, which is not derivable from titles or file names.

## Deliberately not migrated

- **Charts** — a separate Storybook; linked out.
- **v8/v0 migration guides and shim packages** — they render legacy components, which would
  pull `@fluentui/react` and `@fluentui/react-northstar` into the bundle. Linked out.

## Notes worth knowing

- Fluent packages resolve to **source** via aliases generated from `tsconfig.base.json`, the
  equivalent of Storybook's `TsconfigPathsPlugin`. A clean checkout builds without prebuilt
  `lib/` output, and a stale `lib/` cannot shadow the source being edited.
- Content collections are `async`, so each page's body is its own chunk. Without that, one
  eager bundle carried every page's examples.
- The server entry uses `prerender` from `react-dom/static`, which waits for suspended
  content, and injects Griffel styles after render so examples are styled before hydration.
- Tailwind preflight is scoped away from example previews, so components render as they do in
  Storybook and in a consumer app.
