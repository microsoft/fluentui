# Split Browser Support into Browser Support + Polyfills & Fallbacks — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the headless docsite "Browser support" page into two pages — a lean **Browser support** page (single minimum version per browser) and a detailed **Polyfills & fallbacks** page (matrix + per-feature guidance) — and correct the inaccurate fallback copy.

**Architecture:** Reuse the existing `apps/public-docsite-v9-headless/src/BrowserSupport/` React component + generated data. Add a derived `getMinimumVersions()` helper and a small `MinimumVersions` component for the new lean page. Move the matrix/usage/component-table rendering onto a new `PolyfillsAndFallbacks.mdx`. Rewrite `BrowserSupport.mdx` to the lean form. Fix the per-feature copy in `constants.ts`. Both pages live in the Storybook **Overview** section with explicit sidebar order.

**Tech Stack:** Storybook MDX (`@storybook/addon-docs`), React 19, TypeScript, CSS Modules. This is a Storybook docsite app — **there is no unit-test runner in this package** (only `build-storybook`). Verification is by TypeScript type-check + Storybook build + visual inspection, not Jest.

## Global Constraints

- **Scope: headless React docsite only** (`apps/public-docsite-v9-headless`). Do **not** touch `packages/web-components/src/_docs/developer/polyfilling.mdx`.
- **Docs only.** No component runtime behavior changes. Allowed code changes are limited to the `BrowserSupport/` helper + component, the two MDX pages, the constants copy, and the Storybook sidebar order.
- **Polyfill naming rule:** name **only** the Microsoft-owned `@microsoft/focusgroup-polyfill`. Refer to the Popover API polyfill and the CSS anchor-positioning polyfill **generically as "a polyfill"** — never name a third-party package (no `@oddbird/*`).
- **Minimum versions are data-derived**, computed as the MAX of per-feature minimum supporting versions across the natively-shipping features, read from `browser-support-data.generated.json`. As of `web-features@3.30.0` the result is **Chrome 129, Edge 129, Firefox 147, Safari 26**. Do not hardcode these numbers in the component — compute them.
- **focusgroup** has no native support at any version → excluded from the MAX, surfaced as a separate caveat. Always needs the polyfill.
- **Browser support page keeps its Storybook slug** `overview-browser-support--docs` (title stays `Overview/Browser support`) so the per-component callout link in `browserSupportNotice.ts` keeps working.
- **Copy must match verified library behavior** (no overstated fallbacks):
  - Popover: only `DialogSurface` non-modal falls back to `dialog.show()`; `Popover`/`MenuPopover` render in place; only `Tooltip` warns.
  - CSS anchor positioning: **no** JS positioning fallback in the library; overlays render at static DOM position without a polyfill.
  - focusgroup: the **published library** does not ship/auto-apply the polyfill.
- **Environment note:** this repo's yarn enforces Node `^22 || ^24`; the current shell has Node 25, so `yarn nx …` fails. Run nx via a compatible Node (e.g. `nvm use 22`) or invoke the nx binary directly. Type-check/build commands below assume a compatible Node.

---

### Task 1: Add `getMinimumVersions()` derived helper

Computes, per browser, the minimum version where every natively-shipping feature is supported (the MAX of per-feature minimums). Excludes features with null support for a browser (focusgroup).

**Files:**
- Create: `apps/public-docsite-v9-headless/src/BrowserSupport/utils/getMinimumVersions.ts`
- Modify: `apps/public-docsite-v9-headless/src/BrowserSupport/utils/index.ts`
- Modify: `apps/public-docsite-v9-headless/src/BrowserSupport/index.ts`

**Interfaces:**
- Consumes: `features` (`Record<FeatureKey, FeatureSupport>`) and `browsers` (`string[]`) from `../constants`; `MATRIX_ORDER` (`FeatureKey[]`) from `../constants`; `FeatureKey` from `../types`.
- Produces: `getMinimumVersions(): Record<string, string | null>` — maps each browser id to its minimum "works by default" version string (e.g. `{ chrome: '129', edge: '129', firefox: '147', safari: '26' }`), or `null` for a browser if any considered feature is unsupported there. Also `compareVersions(a: string, b: string): number` (exported for reuse/testing).

- [ ] **Step 1: Create the helper**

Create `apps/public-docsite-v9-headless/src/BrowserSupport/utils/getMinimumVersions.ts`:

```ts
import { browsers, features, MATRIX_ORDER } from '../constants';
import type { FeatureKey } from '../types';

/** Features that ship natively in at least one browser and gate "works by default". */
const NATIVE_FEATURES: FeatureKey[] = MATRIX_ORDER;

/** Compare dotted numeric versions (e.g. "15.4" vs "116"). Returns >0 if a > b. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
}

/**
 * Per browser, the minimum version where every natively-shipping feature is supported —
 * i.e. the MAX of each feature's minimum supporting version. Features that never shipped in a
 * browser (e.g. focusgroup, unsupported everywhere) are excluded from that browser's floor and
 * surfaced separately as an "always needs a polyfill" caveat in the docs. A browser whose
 * considered features are all unsupported yields `null`.
 */
export function getMinimumVersions(): Record<string, string | null> {
  const result: Record<string, string | null> = {};

  for (const browser of browsers) {
    let max: string | null = null;

    for (const key of NATIVE_FEATURES) {
      const version = features[key].support[browser];
      if (version == null) {
        // Feature never shipped in this browser — exclude it from the "by default" floor.
        continue;
      }
      if (max === null || compareVersions(version, max) > 0) {
        max = version;
      }
    }

    result[browser] = max;
  }

  return result;
}
```

- [ ] **Step 2: Export from the utils barrel**

In `apps/public-docsite-v9-headless/src/BrowserSupport/utils/index.ts`, add (keep alphabetical):

```ts
export { compareVersions, getMinimumVersions } from './getMinimumVersions';
```

- [ ] **Step 3: Re-export from the folder barrel**

In `apps/public-docsite-v9-headless/src/BrowserSupport/index.ts`, add `getMinimumVersions` to the `./utils/index` export block:

```ts
export {
  browserLabel,
  compareVersions,
  featureLabel,
  formatMonthYear,
  formatYear,
  getAvailabilityLevel,
  getBaselineLabel,
  getMinimumVersions,
  getStatusLabel,
} from './utils/index';
```

- [ ] **Step 4: Type-check (verify it compiles)**

Run (with a Node 22/24 toolchain): `npx tsc -p apps/public-docsite-v9-headless/tsconfig.app.json --noEmit`
Expected: no errors referencing `getMinimumVersions.ts`.

> If `tsc -p` surfaces unrelated pre-existing app errors, scope the check to the file:
> `npx tsc --noEmit --jsx react-jsx --module esnext --moduleResolution bundler --resolveJsonModule --esModuleInterop apps/public-docsite-v9-headless/src/BrowserSupport/utils/getMinimumVersions.ts` and confirm no errors originate from this file.

- [ ] **Step 5: Commit**

```bash
git add apps/public-docsite-v9-headless/src/BrowserSupport/utils/getMinimumVersions.ts \
        apps/public-docsite-v9-headless/src/BrowserSupport/utils/index.ts \
        apps/public-docsite-v9-headless/src/BrowserSupport/index.ts
git commit -m "feat(headless-docs): add getMinimumVersions helper for browser support"
```

---

### Task 2: Add `MinimumVersions` component + supporting CSS

Renders the single per-browser minimum version on the Browser support page.

**Files:**
- Create: `apps/public-docsite-v9-headless/src/BrowserSupport/MinimumVersions.tsx`
- Modify: `apps/public-docsite-v9-headless/src/BrowserSupport/browserSupport.module.css`

**Interfaces:**
- Consumes: `browsers`, `browserLabel`, `getMinimumVersions` from `.` (the folder barrel); `styles` from `./browserSupport.module.css`.
- Produces: `MinimumVersions` — `(): React.ReactNode`, a small table of Browser → Minimum version.

- [ ] **Step 1: Add CSS for the minimum-version table**

Append to `apps/public-docsite-v9-headless/src/BrowserSupport/browserSupport.module.css`:

```css
.minVersions {
  width: auto;
  border-collapse: collapse;
  margin: var(--space-4) 0 var(--space-8);
  font-size: 14px;
}

.minVersions th,
.minVersions td {
  text-align: left;
  padding: var(--space-2) var(--space-4);
  border-bottom: var(--stroke-thin) solid var(--border);
}

.minVersions thead th {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 12.5px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-tight);
}

.minVersionValue {
  font-family: var(--font-mono);
  color: var(--text-soft);
}
```

- [ ] **Step 2: Create the component**

Create `apps/public-docsite-v9-headless/src/BrowserSupport/MinimumVersions.tsx`:

```tsx
import * as React from 'react';

import { browsers, browserLabel, getMinimumVersions } from '.';
import styles from './browserSupport.module.css';

/**
 * Single minimum browser version (per browser) where the headless overlay features work without a
 * polyfill. Derived from the generated Baseline data (max across natively-shipping features).
 * focusgroup is excluded here and called out separately — it always needs a polyfill.
 */
export const MinimumVersions = (): React.ReactNode => {
  const minimums = getMinimumVersions();
  return (
    <table className={styles.minVersions}>
      <thead>
        <tr>
          <th scope="col">Browser</th>
          <th scope="col">Minimum version</th>
        </tr>
      </thead>
      <tbody>
        {browsers.map(browser => (
          <tr key={browser}>
            <th scope="row">{browserLabel(browser)}</th>
            <td className={styles.minVersionValue}>{minimums[browser] ?? 'Not supported'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

- [ ] **Step 3: Type-check (verify it compiles)**

Run: `npx tsc -p apps/public-docsite-v9-headless/tsconfig.app.json --noEmit`
Expected: no errors referencing `MinimumVersions.tsx`.

- [ ] **Step 4: Commit**

```bash
git add apps/public-docsite-v9-headless/src/BrowserSupport/MinimumVersions.tsx \
        apps/public-docsite-v9-headless/src/BrowserSupport/browserSupport.module.css
git commit -m "feat(headless-docs): add MinimumVersions component"
```

---

### Task 3: Correct the per-feature copy in `constants.ts`

Make `FEATURE_DETAILS` match verified library behavior and the polyfill-naming rule.

**Files:**
- Modify: `apps/public-docsite-v9-headless/src/BrowserSupport/constants.ts:44-74`

**Interfaces:**
- Consumes/Produces: same `FEATURE_DETAILS: Record<ConceptKey, FeatureDetail>` shape (`referenceUrl`, `usage`, `fallback`, optional `polyfill`). Only string values change.

- [ ] **Step 1: Replace the `FEATURE_DETAILS` object**

In `apps/public-docsite-v9-headless/src/BrowserSupport/constants.ts`, replace the existing `FEATURE_DETAILS` (lines 44-74) with:

```ts
export const FEATURE_DETAILS: Record<ConceptKey, FeatureDetail> = {
  popover: {
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Popover_API',
    usage:
      'Renders overlays in the top layer with native light-dismiss and stacking, avoiding portals and manual z-index management.',
    fallback:
      "Components detect support via `CSS.supports('selector(:popover-open)')`. Coverage on older browsers needs a polyfill: only non-modal `Dialog` surfaces fall back to `dialog.show()`; `Popover` and `Menu` surfaces render in place and `Tooltip` logs a development warning.",
  },
  dialog: {
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
    usage:
      'Provides accessible modal (`showModal()`) and non-modal overlays with native focus handling and a top-layer backdrop.',
    fallback:
      'Non-modal surfaces fall back from `showPopover()` to the basic `dialog.show()` when the Popover API is missing.',
  },
  'anchor-positioning': {
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning',
    usage:
      'Positions overlays relative to their trigger via `anchor-name` / `position-anchor` / `position-area`, with `position-try-fallbacks` for flipping. The properties land in browsers individually — see the matrix above.',
    fallback:
      'This is the newest feature and is not yet uniformly Baseline. The headless components do not include a JavaScript positioning fallback, so overlays render at their static position on browsers without CSS anchor positioning — add a polyfill to keep them anchored.',
  },
  focusgroup: {
    referenceUrl: 'https://open-ui.org/components/scoped-focusgroup.explainer/',
    usage:
      'Provides roving arrow-key focus navigation via the `focusgroup` attribute, replacing manual keyboard event handlers.',
    fallback:
      'Not yet available in any browser, and the published headless library does not apply a polyfill on your behalf. Add the Microsoft `focusgroup` polyfill (`@microsoft/focusgroup-polyfill`) so keyboard navigation works today.',
    polyfill: 'Microsoft focusgroup polyfill',
  },
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -p apps/public-docsite-v9-headless/tsconfig.app.json --noEmit`
Expected: no errors referencing `constants.ts`.

- [ ] **Step 3: Commit**

```bash
git add apps/public-docsite-v9-headless/src/BrowserSupport/constants.ts
git commit -m "docs(headless): correct fallback copy to match library behavior"
```

---

### Task 4: Rewrite `BrowserSupport.mdx` to the lean page

Remove the matrix; add minimum-version summary, default-vs-polyfill lists, and a fresh Baseline overview.

**Files:**
- Modify: `apps/public-docsite-v9-headless/src/BrowserSupport.mdx` (full rewrite)

**Interfaces:**
- Consumes: `MinimumVersions` from `./BrowserSupport/MinimumVersions`. (No longer imports `BrowserSupportMatrix`.)
- Produces: a page titled `Overview/Browser support` (slug `overview-browser-support--docs`, unchanged).

- [ ] **Step 1: Replace the whole file**

Replace the entire contents of `apps/public-docsite-v9-headless/src/BrowserSupport.mdx` with:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

import { MinimumVersions } from './BrowserSupport/MinimumVersions';

<Meta title="Overview/Browser support" />

# Browser support

Fluent UI Headless components build their overlays on modern web-platform features — the **Popover
API**, the native **`<dialog>` element**, and **CSS anchor positioning** — instead of JavaScript
portals and z-index stacks. This page tells you which browsers support those features out of the box.

## Minimum supported versions

In these browser versions and later, the overlay features work **without a polyfill**:

<MinimumVersions />

Arrow-key navigation uses the **focusgroup** attribute, which no browser supports natively yet — it
always needs a polyfill. See [Polyfills & fallbacks](?path=/docs/overview-polyfills-fallbacks--docs).

## What works by default vs. what needs help

- **Supported by default** — current Chrome, Edge, Firefox, and Safari at or above the versions above.
- **Needs polyfills or fallbacks** — older versions of those browsers, and **focusgroup** in every
  browser. See [Polyfills & fallbacks](?path=/docs/overview-polyfills-fallbacks--docs) for per-feature
  guidance.

## Baseline, briefly

Browser availability is described using [Baseline](https://web.dev/baseline) stages:

- **Limited availability** — the feature has shipped in some browsers but is not yet in all of them.
- **Newly available** — the feature works in the current version of every major browser.
- **Widely available** — newly available, plus 2.5 years of support across browsers; safe to rely on.

For per-feature details, see the [Baseline](https://web.dev/baseline) overview and the linked
[MDN](https://developer.mozilla.org) references on the Polyfills & fallbacks page.
```

- [ ] **Step 2: Verify the file has no dangling matrix import**

Confirm `BrowserSupport.mdx` no longer imports `BrowserSupportMatrix` and that `MinimumVersions` is imported. (Grep for `BrowserSupportMatrix` in this file → no matches.)

- [ ] **Step 3: Commit**

```bash
git add apps/public-docsite-v9-headless/src/BrowserSupport.mdx
git commit -m "docs(headless): slim Browser support page to minimum-version summary"
```

---

### Task 5: Create `PolyfillsAndFallbacks.mdx` with the matrix + per-feature guidance

The detailed reference page; mounts the existing matrix component and adds polyfill setup guidance.

**Files:**
- Create: `apps/public-docsite-v9-headless/src/PolyfillsAndFallbacks.mdx`

**Interfaces:**
- Consumes: `BrowserSupportMatrix` from `./BrowserSupport/BrowserSupportMatrix` (unchanged component — it already renders the matrix, the "How each feature is used" cards from the corrected `FEATURE_DETAILS`, the component table, and provenance).
- Produces: a page titled `Overview/Polyfills & fallbacks` (slug `overview-polyfills-fallbacks--docs`).

- [ ] **Step 1: Create the page**

Create `apps/public-docsite-v9-headless/src/PolyfillsAndFallbacks.mdx`:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

import { BrowserSupportMatrix } from './BrowserSupport/BrowserSupportMatrix';

<Meta title="Overview/Polyfills & fallbacks" />

# Polyfills & fallbacks

To support browsers that lack the underlying web-platform features (see
[Browser support](?path=/docs/overview-browser-support--docs)), add a polyfill for the feature you
need. Every component detects support at runtime, so a polyfill takes effect automatically once it is
loaded. The matrix below shows where each feature is available; the sections after it explain what to
do for each one.

<BrowserSupportMatrix />

## focusgroup

Roving arrow-key navigation uses the `focusgroup` attribute, which no browser supports natively yet,
and the published library does not apply a polyfill for you. Add the Microsoft
[`@microsoft/focusgroup-polyfill`](https://github.com/microsoft/polyfills/tree/main/packages/focusgroup) —
it is progressive and no-ops once browsers ship native support. Without it, arrow-key navigation does
not work.

## Popover API

Overlays render in the top layer using the Popover API. On browsers without it, only non-modal
`Dialog` surfaces fall back to `dialog.show()`; `Popover` and `Menu` surfaces render in place and
`Tooltip` logs a development warning. For full coverage on older browsers, add a polyfill. Detect
support and load it before Fluent UI, for example:

```js
if (!CSS.supports('selector(:popover-open)')) {
  await import('your-popover-polyfill');
}
```

## CSS anchor positioning

Overlays are positioned relative to their trigger with CSS anchor positioning. The headless library
does **not** include a JavaScript positioning fallback, so without support these overlays render at
their static position. Add a polyfill and load it before Fluent UI, for example:

```js
if (!CSS.supports('anchor-name: --x')) {
  // load your CSS anchor positioning polyfill here, before Fluent UI renders
}
```
```

- [ ] **Step 2: Type-check / sanity-check imports**

Run: `npx tsc -p apps/public-docsite-v9-headless/tsconfig.app.json --noEmit`
Expected: no new errors. (MDX is not type-checked by `tsc`, but the imported `BrowserSupportMatrix` path must resolve — confirm the file exists at `./BrowserSupport/BrowserSupportMatrix.tsx`.)

- [ ] **Step 3: Commit**

```bash
git add apps/public-docsite-v9-headless/src/PolyfillsAndFallbacks.mdx
git commit -m "docs(headless): add Polyfills & fallbacks page with matrix and guidance"
```

---

### Task 6: Update matrix component copy reference ("below" → "above")

The matrix component intro now sits **above** the per-feature cards on the new page, but the
anchor-positioning `usage` copy already says "see the matrix above" (fixed in Task 3). The
`BrowserSupportMatrix.tsx` heading "How each feature is used" follows the matrix, so no code change is
needed there. This task only verifies wording consistency after the move.

**Files:**
- Verify only: `apps/public-docsite-v9-headless/src/BrowserSupport/BrowserSupportMatrix.tsx`, `constants.ts`

- [ ] **Step 1: Grep for stale directional wording**

Search the `BrowserSupport/` folder for "matrix below" and "see the matrix". Confirm the only remaining reference (anchor-positioning `usage`) reads "see the matrix above" (set in Task 3) and there is no "matrix below" left.

Run: `rg -n "matrix (below|above)" apps/public-docsite-v9-headless/src/BrowserSupport/`
Expected: one match, "see the matrix above" in `constants.ts`. If "matrix below" appears, fix it to "above".

- [ ] **Step 2: Commit (only if a change was needed)**

```bash
git add apps/public-docsite-v9-headless/src/BrowserSupport/constants.ts
git commit -m "docs(headless): fix matrix directional wording after page split"
```

(If Step 1 found nothing to change, skip this commit.)

---

### Task 7: Set explicit sidebar order for both pages

Place Browser support and Polyfills & fallbacks in the Overview section order.

**Files:**
- Modify: `apps/public-docsite-v9-headless/.storybook/preview.js:11`

**Interfaces:**
- Consumes/Produces: the `options.storySort.order` array.

- [ ] **Step 1: Update the order array**

In `apps/public-docsite-v9-headless/.storybook/preview.js`, replace the `order` line:

```js
      order: ['Overview', ['Introduction', 'Getting Started', 'Accessibility'], 'Guides', 'Components', 'Concepts'],
```

with:

```js
      order: [
        'Overview',
        ['Introduction', 'Getting Started', 'Accessibility', 'Browser support', 'Polyfills & fallbacks'],
        'Guides',
        'Components',
        'Concepts',
      ],
```

- [ ] **Step 2: Commit**

```bash
git add apps/public-docsite-v9-headless/.storybook/preview.js
git commit -m "docs(headless): order Browser support and Polyfills & fallbacks in sidebar"
```

---

### Task 8: Build Storybook and verify both pages render correctly

Full integration check — this is the real test cycle for a docs change.

**Files:** none (verification only)

- [ ] **Step 1: Build Storybook**

Using a Node 22/24 toolchain (the repo requires it; current shell Node 25 will fail yarn):

Run: `yarn nx run public-docsite-v9-headless:build-storybook`
Expected: build succeeds with no errors about unresolved imports in `BrowserSupport.mdx`, `PolyfillsAndFallbacks.mdx`, `MinimumVersions.tsx`, or `getMinimumVersions.ts`.

> If `yarn nx` is unavailable due to Node version, run with a compatible Node (`nvm use 22 && yarn nx run public-docsite-v9-headless:build-storybook`).

- [ ] **Step 2: Visual check — Browser support page**

Serve the built Storybook (`npx http-server apps/public-docsite-v9-headless/dist/storybook` or `yarn nx run public-docsite-v9-headless:storybook`) and open the **Overview → Browser support** page. Confirm:
- The "Minimum supported versions" table shows **Chrome 129, Edge 129, Firefox 147, Safari 26**.
- There is **no** support matrix on this page.
- The focusgroup caveat and the two "default vs. needs help" bullets render, with working links to Polyfills & fallbacks.
- The Baseline section lists the three stages.

- [ ] **Step 3: Visual check — Polyfills & fallbacks page**

Open **Overview → Polyfills & fallbacks**. Confirm:
- The full support matrix + "How each feature is used" cards + "Feature usage by component" table + provenance footer all render.
- The three guidance sections (focusgroup, Popover API, CSS anchor positioning) read correctly.
- Only `@microsoft/focusgroup-polyfill` is named; Popover/anchor sections say "a polyfill" generically (no `@oddbird/*`).
- The anchor-positioning card says "see the matrix above".

- [ ] **Step 4: Verify sidebar order + cross-link**

Confirm the Overview sidebar order is: Introduction → Getting Started → Accessibility → Browser support → Polyfills & fallbacks. Then open any component story with the "Browser support" callout (e.g. **Components → Popover**) and confirm its "Browser support overview →" link still resolves to the Browser support page (slug `overview-browser-support--docs`).

- [ ] **Step 5: Lint the changed files**

Run: `yarn nx run public-docsite-v9-headless:lint` (or the repo's lint target for this project, via a compatible Node).
Expected: no new lint errors in the changed files. Fix any that appear, then re-commit.

- [ ] **Step 6: Final commit (if any fixes were made in Steps 1–5)**

```bash
git add -A
git commit -m "docs(headless): finalize browser support / polyfills page split"
```

---

## Notes for the implementer

- **No beachball change file is needed** — `apps/public-docsite-v9-headless` is a private docsite app, not a published package. (Confirm `"private": true` / absence from beachball scope before skipping; if in doubt, run `yarn beachball check`.)
- **Do not edit** `browser-support-data.generated.json` by hand — it is generated (see the `generate-browser-support` script). The minimum versions flow from it automatically.
- If the generated data is later regenerated and the numbers change, the Browser support page updates automatically; only the visual-check expectations in Task 8 (the specific numbers) would need updating.
