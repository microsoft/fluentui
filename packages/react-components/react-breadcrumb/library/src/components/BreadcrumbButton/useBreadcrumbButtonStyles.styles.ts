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
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';

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
 * Static CSS class names used internally for the component slots.
 */
export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  icon: 'fui-BreadcrumbButton__icon',
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

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this button's state, because `styles.root` is hashed and unaddressable from outside
  // this file. Read it as `@variant group-current/fui-breadcrumb-button { … }`
  // (DECISIONS.md D15).
  //
  // This root ends up carrying TWO markers, which is correct and not a duplication:
  // `useButtonStyles_unstable` below stamps its own `group/fui-button` on the same element,
  // because the element genuinely IS both a Button and a BreadcrumbButton. A module reading
  // either name resolves to this element; `data-current` is only visible under the
  // breadcrumb name, since react-button never stamps it.
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
  state.root.className = clsx(
    'group/fui-breadcrumb-button',
    breadcrumbButtonClassNames.root,
    styles.root,
    state.root.className,
  );

  if (state.icon) {
    // NOTE: `breadcrumbButtonClassNames.icon` is intentionally not applied — the Griffel
    // hook never merged it either, so the icon slot renders with react-button's
    // `fui-Button__icon` alone. The export stays part of the package's public API.
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  useButtonStyles_unstable(state);

  return state;
};
