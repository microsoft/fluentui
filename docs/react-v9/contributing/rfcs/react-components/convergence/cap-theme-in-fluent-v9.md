# RFC: Bring the CAP visual language into Fluent UI v9

---

_Contributors: (author: Enrico Gianoglio)_

## Summary

Make the **CAP visual language** a first-class part of Fluent UI v9 so that:

1. A consumer of Fluent v9 can opt in to CAP **without installing any separate package** (no `@fluentui-contrib/*` dependency).
2. All future CAP work happens inside the Fluent v9 repo, on the Fluent release cadence, with the same CI guarantees (bundle size, conformance, VR) as the rest of v9.
3. CAP is discoverable and try-able directly on https://react.fluentui.dev/ — as a **visual-language toggle** that overlays the currently-selected base theme (web / teams / high-contrast / light / dark), _not_ as additional entries in the theme dropdown.
4. Consumers who already pass their own `customStyleHooks_unstable` (brand overrides, internal design systems built on Fluent) can adopt CAP **without losing their overrides**. See [Phase 3 — `composeStyleHooks` helper](#phase-3--composestylehooks-helper).

The change is small because the consumer-facing primitive already exists: `FluentProvider` accepts a `customStyleHooks_unstable` prop today and CAP is just a value to pass to it. We propose shipping that value (`CAP_STYLE_HOOKS`) from `@fluentui/react-components`, wiring it into the docs site as a toggle, moving the source into the Fluent v9 monorepo, and adding a small public helper (`composeStyleHooks`) so consumers can layer CAP on top of their own overrides.

## Background

### What CAP is

CAP is a **visual-language overlay** — a set of style decisions (border-radius, spacing, hover/focus treatment, etc.) that re-skin a subset of Fluent v9 components.

CAP **is**:

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

That is the entire opt-in surface today.

A sibling map `TEAMS_STYLE_HOOKS` is shipped from the same package and follows the same pattern.

### Where CAP lives today and why that hurts

`CAP_STYLE_HOOKS` is published from `@fluentui-contrib/react-cap-theme`. Consequences:

- CAP is perceived as a third-party theme rather than a peer of `webLightTheme` / `teamsLightTheme`.
- It is not selectable from the Fluent v9 docs, so adoption requires extra discovery.
- Product teams must add a non-Fluent package to `package.json` just to access one exported value.
- Every API gap forces a fork (an override hook in contrib) instead of an upstream contribution that benefits all Fluent users.
- CAP releases are decoupled from Fluent's release pipeline; bundle-size and VR signals don't gate CAP changes against the Fluent components they override.

## Problem statement

> "We should try to get off this island of working in FluentUI Contrib so that the CAP theme becomes synonymous with Fluent and not a separate entity."

Three things must change:

1. **Consumer install surface.** A product team opting in to CAP should not see `@fluentui-contrib/*` in their `package.json`. CAP should be reachable from the package they already have.
2. **Development location.** New CAP override hooks (and any related Fluent component extensions) should be authored and reviewed inside the Fluent v9 repo, with the same CI as the rest of v9.

The proposal must also avoid:

- Regressing bundle size for consumers who don't opt in to CAP.
- Forcing every CAP consumer to rewrite provider plumbing.
- Coupling brand-specific knowledge into base primitives like `FluentProvider`.

## Detailed Design or Proposal

### Phased approach

| Phase                                  | Goal                                                                                                                                                                                | Risk                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **1. Re-export from Fluent v9**        | `@fluentui/react-components` internally depends on `@fluentui-contrib/react-cap-theme` and re-exports `CAP_STYLE_HOOKS`. Products import CAP from Fluent. Docs site shows a toggle. | Low — additive only.            |
| **2. Move source into Fluent v9**      | New `packages/react-components/react-cap-theme/` package in the Fluent monorepo. Contrib package becomes a deprecated shim re-exporting from Fluent.                                | Medium — coordinated migration. |
| **3. Ship `composeStyleHooks` helper** | Public utility for layering multiple style-hook maps (consumer brand + CAP).                                                                                                        | Low.                            |
| **4. Deprecate contrib package**       | Mark `@fluentui-contrib/react-cap-theme` deprecated on npm after one Fluent minor cycle.                                                                                            | Low.                            |

### Phase 1 — Re-export contrib from Fluent v9

`@fluentui/react-components` adds `@fluentui-contrib/react-cap-theme` as an internal dependency and re-exports the hooks map:

```ts
// packages/react-components/react-components/src/index.ts
export { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';
// (and TEAMS_STYLE_HOOKS, if Fluent also wants to surface it)
```

That's the entire Phase 1 change to the public API.

Result for the product team:

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

No `@fluentui-contrib/*` in `package.json`. The contrib dependency is an internal implementation detail.

#### Why no `CapProvider` wrapper

Earlier drafts proposed a `<CapProvider>` component. Rejected: `FluentProvider` already has a first-class `customStyleHooks_unstable` prop. Adding a second provider component would duplicate the prop, force existing `<FluentProvider>` users to swap to a different component just to opt in, and complicate library code that wraps `<FluentProvider>` internally. The simpler answer is "expose the value and let consumers pass it to the prop they already use."

### Phase 2 — Move source into Fluent v9

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

### Phase 3 — `composeStyleHooks` helper

**This is the answer to the most common product-team blocker.** Today, `customStyleHooks_unstable` is a single map and assigning it replaces whatever was there. A product team that already does this:

```tsx
const productHooks = {
  useButtonStyles_unstable: useBrandedButtonStyles,
  useInputStyles_unstable: useBrandedInputStyles,
};

<FluentProvider customStyleHooks_unstable={productHooks}>
```

…cannot opt in to CAP without **losing their own overrides**.

Ship a tiny composition utility:

```ts
// packages/react-components/react-provider/library/src/utils/composeStyleHooks.ts
import type { FluentProviderCustomStyleHooks } from '../components/FluentProvider/FluentProvider.types';

/**
 * Combine multiple custom-style-hook maps into one. For each component, every
 * matching hook runs in order; later hooks see the state mutated by earlier
 * hooks. Conflicting className writes resolve by Griffel's `mergeClasses`
 * rule (rightmost class wins on the same CSS rule).
 *
 * Typical usage: layer CAP on top of a consumer's brand overrides.
 */
export function composeStyleHooks(
  ...maps: ReadonlyArray<FluentProviderCustomStyleHooks | undefined>
): FluentProviderCustomStyleHooks {
  const defined = maps.filter((m): m is FluentProviderCustomStyleHooks => Boolean(m));
  const keys = new Set(defined.flatMap(Object.keys));
  const out: Record<string, (state: unknown) => void> = {};

  for (const key of keys) {
    const hooks = defined.map(m => (m as Record<string, unknown>)[key]).filter(Boolean) as Array<(s: unknown) => void>;
    out[key] = state => {
      for (const h of hooks) h(state);
    };
  }

  return out as FluentProviderCustomStyleHooks;
}
```

Re-exported from `@fluentui/react-components`. Usage:

```tsx
import { FluentProvider, webLightTheme, CAP_STYLE_HOOKS, composeStyleHooks } from '@fluentui/react-components';

const productHooks = {
  useButtonStyles_unstable: useBrandedButtonStyles,
};

<FluentProvider theme={webLightTheme} customStyleHooks_unstable={composeStyleHooks(productHooks, CAP_STYLE_HOOKS)}>
  <App />
</FluentProvider>;
```
