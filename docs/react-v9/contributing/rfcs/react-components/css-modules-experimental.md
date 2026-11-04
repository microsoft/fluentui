# RFC: Experimental CSS Modules styles for v9 components

---

@dmytrokirpa

Stakeholders: Fluent UI v9 core team, partner teams in the Fluent ecosystem (FluentAI, SCC, and other v9 consumers)

Authored: 2026-11-04
Feedback deadline: 2026-11-25

Reference implementation: [microsoft/fluentui#37044](https://github.com/microsoft/fluentui/pull/37044)

## Summary

Add layered CSS Modules as an **opt-in, experimental** styling option for v9 components, alongside Griffel. The goal is to support partners whose apps are already built on native CSS or CSS Modules and who want the same approach all the way down, including the design system layer.

Griffel stays the default and the recommended option. This proposal doesn't replace it. It gives teams with a different styling stack a supported way to use Fluent.

Each component gets a `<Component>.module.css` and a `use<Component>Styles.styles.css.ts` hook next to the existing `use<Component>Styles.styles.ts`. Default imports, public APIs, and runtime behavior stay the same. Consumers opt in with bundler resolution only.

After it ships, we want to roll it out with Fluent ecosystem partners that already work this way (FluentAI, SCC, others), check that it fits their setup, and use their feedback to decide whether it becomes a supported option.

## Background

v9 components are styled with Griffel (`makeStyles`/`makeResetStyles`), and that works well for most consumers.

Some partners in the Fluent ecosystem have standardized on native CSS or CSS Modules for their own code. For them, Fluent is the one part of the app that uses a different styling model. That means:

- two styling systems in one app, each with its own authoring rules, tooling, and debugging workflow;
- customizing Fluent components in a different way than the rest of the product (Griffel overrides and `mergeClasses` instead of plain CSS and the cascade);
- extra build configuration just for the design system layer.

These partners have asked for a way to use Fluent components that matches the stack they already use.

## Problem statement

Today v9 offers one styling option: Griffel. Partners who are already all-in on native CSS or CSS Modules have no supported way to keep that model consistent through the design system layer. We want to give them that option without changing anything for existing Griffel consumers, and learn from real partner apps whether it meets their needs.

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
2. **Pilot** with partners that already use native CSS or CSS Modules (FluentAI and SCC first, then others who volunteer). Each pilot turns on the alias in a staging or flighted build.
3. **Gather feedback** per pilot:
   - how well it fits their existing CSS setup and customization patterns;
   - visual parity with the Griffel version (VR diffs, reported regressions);
   - integration effort and any gaps in coverage;
   - bundle size and runtime numbers, as supporting data.
4. **Decide** with that feedback: promote to a supported option (with a stability contract and CI parity gates), keep iterating, or stop. Stopping means deleting the alternative files; consumers just remove the alias.

### Pros and Cons

**Pros**

- Partners on native CSS or CSS Modules can use one styling model across their whole app, including Fluent.
- They customize Fluent components with plain CSS and the cascade (`@layer`), the same way they style everything else.
- No migration cost and no risk for current consumers; it's opt-in per app with automatic fallback.
- Lets us validate the option with real partner apps before we commit to anything.

**Cons**

- Two style implementations to maintain until we decide. Every Griffel change has to be ported.
- Parity checks are browser-based and opt-in; JSDOM tests only cover the state-to-class mapping. Drift is possible until parity becomes a CI gate.
- Opting in depends on the bundler (`extensionAlias` or an equivalent); some toolchains will need extra setup.
- Custom styles written with Griffel that depend on `mergeClasses` ordering against component atomic classes may behave differently with layered CSS.
- Shadow DOM consumers have to install styles manually.

## Discarded Solutions

- **Replace Griffel in place.** Not the goal. Griffel works well for most consumers, and many rely on Griffel overrides. This proposal adds an option and doesn't remove one.
- **Separate `-css` packages.** Duplicates the package graph and the release overhead, and consumers would have to rewrite imports.
- **Point partners to Griffel AOT/CSS extraction.** It produces static CSS, but partners still author and override Fluent styles through Griffel, so their app still has two styling models.

## Open Issues

- Final layer name (`fluent`) and whether to expose an ordered layer stack (for example `fluent.base`, `fluent.overrides`).
- Turning on Monosize CSS asset reporting, and which CI parity gate to require before promotion.
- Consumer guidance for bundlers without `extensionAlias` (Vite/Rollup/esbuild plugins).
- Pilot owners, timelines, and success thresholds for each partner.
