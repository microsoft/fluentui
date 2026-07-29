'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * the other three converted styles files in this package carry an
 * `enforce-use-client` suppression, because a converted hook normally calls no React hook
 * and no RSC-unsafe function once `makeStyles` is gone. This one is the exception and needs
 * NO suppression: it still calls `useButtonStyles_unstable`, so the directive is genuinely
 * required and the rule does not flag it. (Adding the suppression anyway trips
 * `--report-unused-disable-directives`.)
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { BreadcrumbButtonState } from './BreadcrumbButton.types';

/*
 * `@fluentui/react-button` is imported ABOVE this module, deliberately. The generated ESM
 * class map for a `*.module.css` carries a side-effect import of its package's
 * `dist/styles.css`, so import order here is also stylesheet order: react-button's sheet is
 * evaluated first and this package's second. Every rule in BreadcrumbButton.module.css is
 * layered (`fui.components.l2`) or specificity-pinned, so nothing DEPENDS on that order —
 * but keeping it matching the composition direction costs nothing.
 */
import styles from './BreadcrumbButton.module.css';

/**
 * Public identity class for BreadcrumbButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot `icon` key was removed: there is no public
 * class-name handle on component internals any more (DECISIONS.md D16.1). It had never been
 * applied to the DOM by either the Griffel or the converted hook, so nothing stops matching
 * that used to match — reads of it are now a compile error instead of silently `undefined`.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + breadcrumbButtonClassNames.root` is a `SyntaxError`. Build selectors with
 * `fuiSelector(breadcrumbButtonClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * token-taking DOM APIs (`classList.contains`, `getElementsByClassName`) need no escaping.
 */
export const breadcrumbButtonClassNames: { root: string } = {
  root: 'group/fui-breadcrumb-button',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Only ONE attribute is stamped here. `data-size` — which this component's rules read on
 * both slots — is written by `useButtonStyles_unstable`, called unconditionally at the end
 * of this hook: `size` is a single field on the shared state object, so Button stamps
 * exactly the value the Griffel `styles[state.size]` lookups used. Stamping it again here
 * would be a redundant write of an identical value.
 *
 * `data-current` mirrors `state.current`, the boolean the Griffel hook branched on, and is
 * written `current || undefined` (React omits an attribute whose value is `undefined`;
 * `false` would render `data-current="false"` and still match `[data-current]`).
 *
 * It is deliberately NOT read off `aria-current`. The catalog's `current` variant also
 * matches `[aria-current]:not([aria-current='false'])`, and this component lets a consumer
 * set that attribute directly (`...rest` overrides the computed value in
 * `useBreadcrumbButtonBase_unstable`) — so an `aria-current` passed WITHOUT `current` would
 * newly pick up the current styling. Stamping the boolean keeps the common path exact; the
 * residual aria-only widening is inherited from the shared variant and accepted rather than
 * hand-writing a bespoke selector. (Same reasoning react-infolabel used to prefer
 * `data-open` over PopoverTrigger's consumer-overridable `aria-expanded`.)
 */
type BreadcrumbButtonRootDataAttributes = {
  'data-current'?: true;
};

/**
 * Apply styling to the BreadcrumbButton slots based on the state
 */
export const useBreadcrumbButtonStyles_unstable = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  const { current } = state;

  const root = state.root as BreadcrumbButtonState['root'] & BreadcrumbButtonRootDataAttributes;

  /*
   * The `react-hooks/immutability` suppressions below are carried over from the Griffel
   * version of this file, unchanged. The state-mutation pattern is KEPT during conversion
   * (CONVERSION_GUIDE §3 / DECISIONS.md D14): the mixed-mode sibling seam and the
   * customStyleHooks contract both depend on the shared object, and its removal is a single
   * committed Phase 3 sweep rather than a per-conversion change. Note this file is the only
   * converted styles hook in the package that still trips the rule — the other three no
   * longer call any hook, so eslint no longer treats them as hooks at all.
   */
  // eslint-disable-next-line react-hooks/immutability
  root['data-current'] = current || undefined;

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires; the `fui-BreadcrumbButton`
  // static that used to hold that position was removed in the D16 sweep.
  //
  // The marker is a literal, unhashed, GLOBAL token, and is now this component's SOLE public
  // identity class (D16.1): the only handle by which a consumer, or another module in this
  // package or any other, can select or style an element from this button's state, because
  // `styles.root` is hashed and unaddressable from outside this file. Read it as
  // `@variant group-current/fui-breadcrumb-button { … }` (DECISIONS.md D15). It is also what
  // the UNLAYERED icon-swap rule at the bottom of BreadcrumbButton.module.css now compounds
  // for its specificity bump, in place of the deleted static (D16.4) — so this literal is
  // load-bearing for rendered pixels, not just for identity.
  //
  // This root ends up carrying TWO markers, which is correct and not a duplication:
  // `useButtonStyles_unstable` below stamps its own `group/fui-button` on the same element,
  // because the element genuinely IS both a Button and a BreadcrumbButton. A module reading
  // either name resolves to this element; `data-current` is only visible under the
  // breadcrumb name, since react-button never stamps it. (This is why the component opts out
  // of `component-has-group-marker` — see BreadcrumbButton.test.tsx.)
  //
  // Cascade priority is decided by the `@layer fui.*` order in BreadcrumbButton.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why EVERY block sits at altitude
  // `fui.components.l2` (both slots are react-button's elements) and why the icon swap has
  // to be unlayered.
  //
  // `state.root.className` is what `useButtonStyles_unstable` receives as its own LAST
  // argument below, so this string still arrives after react-button's classes — exactly as
  // it did under mergeClasses.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, 'group/fui-breadcrumb-button', state.root.className);

  if (state.icon) {
    // `styles.icon` is this module's own hashed local on react-button's `icon` element. It is
    // the D16.3 "M2" handle: every rule in BreadcrumbButton.module.css that used to reach
    // that element through react-button's `:global(.fui-Button__icon)` static now selects
    // this local instead, so the cross-package coupling is composed in JS here rather than
    // published as a global class name. Same element, same descendant-selector shape, same
    // specificity — a class-for-class substitution.
    //
    // The slot carries no marker, so D15.1 does not apply to it; the hashed class is
    // `classList[0]` and react-button appends its own classes after this string.
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  useButtonStyles_unstable(state);

  return state;
};
