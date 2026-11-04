# RFC: Experimental CSS Modules styles for v9 components

---

@dmytrokirpa

Stakeholders: Fluent UI v9 core team, partner teams in the Fluent ecosystem (FluentAI, SCC, and other v9 consumers)

Authored: 2026-11-04
Feedback deadline: 2026-11-25

Reference implementation: [microsoft/fluentui#37044](https://github.com/microsoft/fluentui/pull/37044)

## Summary

Ship static, layered CSS Modules as an **opt-in, experimental** alternative to the Griffel style hooks of v9 components. Each component gets a `<Component>.module.css` and a `use<Component>Styles.styles.css.ts` hook next to the existing `use<Component>Styles.styles.ts`. Default imports, public APIs, and runtime behavior stay the same. Consumers opt in with bundler resolution only.

After it ships, we want to roll it out with a few Fluent ecosystem partners (FluentAI, SCC, others) to check visual parity, bundle size, and runtime performance in real apps. Those results decide whether CSS Modules becomes a supported styling option.

## Background

v9 components style themselves at runtime with Griffel (`makeStyles`/`makeResetStyles`). Griffel supports AOT/CSS extraction, but each consuming app has to set up the extraction toolchain, and the runtime and `mergeClasses` stay in the bundle.

Partners have asked for:

- static CSS that works with any standard CSS pipeline, with no Griffel-specific build plugin;
- less runtime style work and a smaller JS bundle;
- predictable overrides through the cascade (`@layer`) rather than atomic-class merge order;
- compatibility with strict CSP and with environments that avoid runtime style injection.

## Problem statement

Today v9 offers only one way to style components: Griffel. Apps that cannot or do not want to run Griffel's runtime or build tooling have no supported path. We want to know whether static CSS can match Griffel output closely enough to be a real option, and we can only answer that by testing it in production apps.

## Detailed Design or Proposal

### Per-component alternatives

For each component (the reference PR covers about 60 v9 packages, including FluentProvider and Portal):

```
components/Button/
  useButtonStyles.styles.ts        # existing Griffel hook (default, unchanged)
  useButtonStyles.styles.css.ts    # new CSS Modules hook, same exports
  Button.module.css                # new layered stylesheet
```

The CSS hook keeps the Griffel module's export names and signatures (`useButtonStyles_unstable`, `buttonClassNames`, helpers), so the bundler can swap the whole module:

```ts
import { clsx } from 'clsx';
import styles from './Button.module.css';

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const { appearance, size, shape, icon, iconOnly, disabled, disabledFocusable } = state;

  state.root.className = clsx(
    buttonClassNames.root, // stable fui-* class names are kept
    styles.root,
    styles[appearance],
    styles[size],
    styles[shape],
    icon && styles.withIcon,
    (disabled || disabledFocusable) && styles.disabled,
    iconOnly && styles.iconOnly,
    state.root.className, // user className last
  );
  return state;
};
```

Authoring rules:

- All rules live in `@layer fluent`, so any unlayered app CSS overrides them without specificity tricks.
- Values come only from the theme's CSS custom properties (`var(--colorNeutralBackground1)`). FluentProvider still generates these, so theming and nested providers work as before.
- Each independent state value becomes one class named after the prop value (`.primary`, `.small`, `.disabled`). CSS selectors and native nesting handle combinations of states. We don't add TypeScript class maps or classes for combinations like `disabledPrimary`.
- Stable `fui-*` class names, slot structure, and the user's `className` (always last) are kept.

### Opt-in through bundler resolution

Built packages contain both `.styles.js` and `.styles.css.js`. A consumer opts in by preferring the CSS variant:

```js
// webpack
resolve.extensionAlias = { '.styles.js': ['.styles.css.js', '.styles.js'] };
```

If a component has no CSS alternative, resolution falls back to Griffel, so partial coverage is safe. Without the alias, nothing changes.

Consumer requirements:

- a CSS Modules loader and native CSS nesting (or a transform for it);
- CSS side effects kept (packages declare `"sideEffects": ["**/*.css"]`);
- headless/CSS-styled icons imported into the same layer: `@import url('@fluentui/react-icons/headless/styles.css') layer(fluent);`
- in Shadow DOM, the static styles installed inside each shadow root (CSS Modules don't cross shadow boundaries).

### Build and tooling

- The Nx build executor copies `**/*.css` into `lib` and `lib-commonjs` for vNext packages that declare CSS side effects.
- Export maps keep explicit `./*.css` entries.
- Storybook and VR tests resolve the CSS hooks first, so the same stories exercise both implementations.
- `scripts/check-v9-css-modules.js` compares computed styles between a Griffel build and a CSS Modules build (RTL, badges, typography, icons, shadow roots, overlapping hover/focus/active states, reduced motion).
- The `griffel-to-css-modules` agent skill describes how to port a component and how to keep the CSS version in sync when the Griffel styles change.
- Monosize support for CSS assets is ready but turned off until rollout.

### Shipping as experimental

- Released as `patch` changes in the existing packages. No new package, no new public API, no change to default behavior.
- Documented as **experimental**: class names inside `.module.css`, the layer name, and the file layout may change without a major version bump. Only the opt-in mechanism and the existing hook exports count as contract.
- Griffel remains the default and the reference implementation. Both are maintained in parallel, with Griffel diffs ported to CSS via the skill above.

### Ecosystem rollout

1. **Ship** the reference PR behind the opt-in. Publish a short consumer guide (bundler config, icons, Shadow DOM).
2. **Pilot** with 2–3 partners (FluentAI and SCC first, then others who volunteer). Each pilot turns on the alias in a staging or flighted build.
3. **Measure** per pilot, against the same app on Griffel:
   - visual parity (VR diffs, reported regressions);
   - JS and CSS bundle size;
   - runtime metrics (first render, style recalculation, interaction latency);
   - how hard it was to integrate, and override patterns that broke.
4. **Decide** with the data: promote to a supported option (with a stability contract and CI parity gates), keep iterating, or stop. Stopping means deleting the alternative files; consumers just remove the alias.

### Pros and Cons

**Pros**

- No migration cost and no risk for current consumers; it's opt-in per app with automatic fallback.
- Static CSS works with any standard toolchain and with strict CSP.
- `@layer` gives predictable, low-specificity overrides.
- Lets us measure real benefits in real apps before we commit to anything.

**Cons**

- Two style implementations to maintain until we decide. Every Griffel change has to be ported.
- Parity checks are browser-based and opt-in; JSDOM tests only cover the state-to-class mapping. Drift is possible until parity becomes a CI gate.
- Opting in depends on the bundler (`extensionAlias` or an equivalent); some toolchains will need extra setup.
- Custom styles written with Griffel that depend on `mergeClasses` ordering against component atomic classes may behave differently with layered CSS.
- Shadow DOM consumers have to install styles manually.

## Discarded Solutions

- **Replace Griffel in place.** Too risky without production parity data, and it would break consumers who rely on Griffel overrides.
- **Separate `-css` packages.** Duplicates the package graph and the release overhead, and consumers would have to rewrite imports.
- **Only promote Griffel AOT/CSS extraction.** Still needs Griffel tooling and runtime in every app, and doesn't give layered, human-readable CSS.

## Open Issues

- Final layer name (`fluent`) and whether to expose an ordered layer stack (for example `fluent.base`, `fluent.overrides`).
- Turning on Monosize CSS asset reporting, and which CI parity gate to require before promotion.
- Consumer guidance for bundlers without `extensionAlias` (Vite/Rollup/esbuild plugins).
- Pilot owners, timelines, and success thresholds for each partner.
