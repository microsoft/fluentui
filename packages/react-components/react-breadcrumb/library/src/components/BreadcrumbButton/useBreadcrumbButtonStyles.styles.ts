'use client';

/*
 * NOTE on the directive above:
 * a converted hook normally calls no React hook and no RSC-unsafe function once `makeStyles`
 * is gone, so the other three styles files in this package carry no directive at all. This
 * one is the exception: it still calls `useButtonStyles_unstable`, so the directive is
 * genuinely required and the rule does not flag it. (Adding a suppression anyway would trip
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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type BreadcrumbButtonRootDataAttributes = {
  'data-current'?: true;
};

/**
 * Apply styling to the BreadcrumbButton slots based on the state
 */
export const useBreadcrumbButtonStyles_unstable = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  const { current } = state;

  const rootDataAttributes: BreadcrumbButtonRootDataAttributes = {
    'data-current': current || undefined,
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(styles.root, breadcrumbButtonClassNames.root, state.root.className),
    },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.icon) {
    state = { ...state, icon: { ...state.icon, className: clsx(styles.icon, state.icon.className) } };
  }

  // BreadcrumbButtonState widens ButtonState, so the delegate's narrower return is re-merged
  // onto this component's own shape (F1 of the D14 mutation removal — thread the
  // composed result, do not discard it).
  state = { ...state, ...useButtonStyles_unstable(state) };

  return state;
};
