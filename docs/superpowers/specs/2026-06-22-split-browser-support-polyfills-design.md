# Split "Browser support" into Browser support + Polyfills & fallbacks

**Date:** 2026-06-22
**Status:** Approved design
**Scope:** Headless React docsite only (`apps/public-docsite-v9-headless`). The web-components
"Polyfilling" page (`packages/web-components/src/_docs/developer/polyfilling.mdx`) is **out of scope**
and untouched.

## Problem

The headless docsite "Browser support" page conflates two distinct concerns:

1. **Browser support** — which browsers / versions the components work in (Baseline, the support matrix).
2. **Polyfills & fallbacks** — how to make components work on browsers that lack the underlying
   web-platform features.

The page (`apps/public-docsite-v9-headless/src/BrowserSupport.mdx` + its `BrowserSupport/` React
component) interleaves a Baseline support matrix with per-feature "Fallback:" copy and polyfill
recommendations. A consumer cannot quickly answer the most basic question — *"what minimum browser
version do I target?"* — without reading the per-feature matrix and computing it themselves.

Separately, the existing per-feature "Fallback:" copy in
`apps/public-docsite-v9-headless/src/BrowserSupport/constants.ts` **overstates** the fallbacks the
**published headless React library** actually provides (verified against source — see
"Accuracy corrections" below).

## Goals

- Split into two Storybook pages: **Browser support** and **Polyfills & fallbacks**.
- Browser support page answers "which minimum version do I target?" with a **single minimum version
  per browser**, derived from data (not hand-calculated by the reader).
- Polyfills & fallbacks page is the detailed reference: the matrix + accurate per-feature guidance,
  each stating whether to use **a polyfill** or a **built-in fallback**.
- Correct the inaccurate fallback copy so docs match the library's real behavior.

## Non-goals (YAGNI)

- No changes to web-components docs.
- No changes to component runtime behavior — docs only (plus corrected copy + a derived helper).
- No new generated-data pipeline; reuse the existing `browser-support-data.generated.json`.

## Verified current behavior (headless React library)

Researched against `packages/react-components/react-headless-components-preview/library/src`:

| Feature                | Built-in fallback in the **published library**?                                                                                                            | Polyfill shipped by library? |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **Popover API**        | **Partial.** `DialogSurface` (non-modal) falls back `showPopover()` → `dialog.show()`. `Popover` / `MenuPopover` no-op (render in place). `Tooltip` warns. | No                           |
| **CSS anchor positioning** | **None.** Anchor CSS written as inline styles unconditionally; no JS positioning fallback. Overlays render at static DOM position when unsupported.     | No                           |
| **focusgroup**         | **None.** Components emit the `focusgroup` attribute only. The polyfill is applied only by Storybook, not the published library.                            | No                           |

Implication: for the headless React library, **a polyfill is the practical recommendation for all
three features**, because the built-in fallbacks are minimal/absent.

## Architecture & file changes

Two Storybook MDX pages under `apps/public-docsite-v9-headless/src/`, both in the **Overview** section.
The existing `BrowserSupport/` React component folder (matrix + data + utils) is **reused**, not
rebuilt.

### 1. `BrowserSupport.mdx` (rewrite) — `<Meta title="Overview/Browser support" />`

Page keeps its existing Storybook slug (`overview-browser-support--docs`) so the per-component
"Browser support" callout link in `browserSupportNotice.ts` stays valid. (Verify slug after rewrite.)

Content:

1. **Intro** (1–2 sentences) — headless components build overlays on modern web-platform features;
   this page tells you which browsers support them.
2. **Minimum supported versions** — a small data-driven summary rendered by a new tiny component
   (`MinimumVersions`), showing one version per browser:
   - **Chrome / Edge 129+, Firefox 147+, Safari 26+** (as of `web-features@3.30.0`).
   - Computed as the **MAX** of the minimum supporting version across all features that ship natively
     (Popover, `<dialog>`, and the CSS anchor-positioning properties). Values come from
     `browser-support-data.generated.json`, so they stay correct when the data regenerates.
   - **focusgroup caveat line:** focusgroup has no native support in any browser yet, so arrow-key
     navigation always requires the polyfill — link to Polyfills & fallbacks.
3. **Supported by default vs. needs polyfills/fallbacks** — two short hand-written lists:
   - *By default:* evergreen Chrome, Edge, Firefox, Safari at or above the versions above.
   - *Needs polyfills/fallbacks:* older versions of those browsers, plus focusgroup everywhere →
     link to Polyfills & fallbacks.
4. **Baseline, briefly** — a fresh, short overview of the three Baseline stages
   (Limited → Newly → Widely available) with links to web.dev/baseline and MDN. **No** polyfill /
   fallback wording here (that lives on the other page).

No support matrix on this page.

### 2. `PolyfillsAndFallbacks.mdx` (new) — `<Meta title="Overview/Polyfills & fallbacks" />`

Content:

1. **Intro** — when/why you need this (older browsers, focusgroup); link back to Browser support.
2. **Baseline support matrix** (moved here) — the full per-feature × per-browser table **and** the
   "Feature usage by component" table, rendered by the existing component (see split below).
3. **Per-feature guidance** — one section each, each stating **polyfill vs. fallback**:
   - **focusgroup** → **Polyfill required.** Name `@microsoft/focusgroup-polyfill` (Microsoft-owned,
     progressive — no-ops when native). How to apply it; how to opt out via base classes. Without it:
     no arrow-key navigation.
   - **Popover API** → **Polyfill recommended** — refer to it generically as **"a polyfill"** (do NOT
     name a third-party package). Note the one built-in fallback: `DialogSurface` (non-modal) degrades
     to `dialog.show()`; `Popover` / `MenuPopover` render in place; `Tooltip` warns. Show the
     feature-detect-then-lazy-import pattern and the CSS cleanup snippet generically.
   - **CSS anchor positioning** → **Polyfill recommended** — refer to it generically as **"a polyfill"**
     (do NOT name a third-party package). No JS positioning fallback exists in the library; overlays
     render at static position without one. Show the conditional-import pattern generically.
4. **Provenance footer** — keep "Generated with web-features@…".

### 3. Component split — `BrowserSupport/`

- Split `BrowserSupportMatrix.tsx` so the **matrix + "How each feature is used" + "Feature usage by
  component" + provenance** render on the **Polyfills & fallbacks** page (keep the existing component,
  used by the new MDX).
- Add a small **`MinimumVersions`** component for the Browser support page that renders the single
  per-browser minimum version.
- Add a derived helper **`getMinimumVersions()`** (in `utils/`) that computes, per browser, the MAX
  minimum supporting version across the natively-shipping features, reading
  `browser-support-data.generated.json`. focusgroup (null support everywhere) is excluded from the MAX
  and surfaced via the separate caveat line.
- `index.ts` barrel updated to export the new helper/component.

### 4. Copy corrections — `BrowserSupport/constants.ts`

Correct `FEATURE_DETAILS[*].fallback` to match verified behavior:

- **popover**: only `DialogSurface` (non-modal) falls back to `dialog.show()`; `Popover`/`MenuPopover`
  render in place; only `Tooltip` logs a dev warning. Recommend **a polyfill** (generic, unnamed) for
  full coverage.
- **anchor-positioning**: **no** JS positioning fallback in the headless library; overlays render at
  static DOM position when unsupported. Recommend **a polyfill** (generic, unnamed).
- **focusgroup**: the **published library** does not ship/auto-apply the polyfill; recommend applying
  `@microsoft/focusgroup-polyfill`. Keep the `polyfill` field naming the Microsoft package.

(Generic third-party polyfills are referred to as "a polyfill"; only the Microsoft-owned focusgroup
polyfill is named.)

### 5. Sidebar order — `apps/public-docsite-v9-headless/.storybook/preview.js`

Update the `Overview` sub-order so both pages are explicitly placed:

```js
order: ['Overview', ['Introduction', 'Getting Started', 'Accessibility', 'Browser support', 'Polyfills & fallbacks'], 'Guides', 'Components', 'Concepts'],
```

(MDX pages are auto-discovered by the `../src/**/*.mdx` glob, so no manual registration beyond the
`<Meta>` title is required.)

## Minimum-version computation (detail)

`getMinimumVersions()` logic:

- Input: `features` from `browser-support-data.generated.json`, over browsers `[chrome, edge, firefox,
  safari]`.
- Consider the natively-shipping feature set used by the matrix (Popover, `<dialog>`, and the anchor
  properties: `anchor-name`, `position-area`, `position-try-fallbacks`, `anchor-center`). Skip any
  feature whose support value for a browser is null (focusgroup is null for all browsers and is
  therefore excluded entirely).
- For each browser, the minimum "works by default" version = the **maximum** (numerically compared,
  handling values like `15.4`) of those per-feature minimums.
- Result as of `web-features@3.30.0`: **Chrome 129, Edge 129, Firefox 147, Safari 26**
  (Chrome/Edge driven by `position-area` 129; Firefox 147 / Safari 26 by the anchor properties).

## Error / edge handling

- focusgroup (no native support at any version) is the only "always needs a polyfill" feature; it is
  excluded from the MAX and called out separately so the single version stays meaningful.
- The helper compares versions numerically (e.g. `15.4`), not lexicographically, so `116` > `15.4`.

## Testing / verification

- Storybook builds for `public-docsite-v9-headless`; both pages render; sidebar order is
  Introduction → Getting Started → Accessibility → Browser support → Polyfills & fallbacks.
- The per-component "Browser support" callout link still resolves (slug unchanged).
- `MinimumVersions` renders Chrome/Edge 129, Firefox 147, Safari 26 from the current data.
- Lint/TS pass for the headless docsite + `BrowserSupport/` component.
