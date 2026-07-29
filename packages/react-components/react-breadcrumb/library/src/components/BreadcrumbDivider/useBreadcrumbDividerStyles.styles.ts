import { clsx } from 'clsx';
import type { BreadcrumbDividerState } from './BreadcrumbDivider.types';

import styles from './BreadcrumbDivider.module.css';

/**
 * Public identity class for BreadcrumbDivider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. There is no public class-name handle on component
 * internals any more (DECISIONS.md D16.1).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + breadcrumbDividerClassNames.root` is a `SyntaxError`. Build selectors with
 * `fuiSelector(breadcrumbDividerClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * token-taking DOM APIs (`classList.contains`, `getElementsByClassName`) need no escaping.
 */
export const breadcrumbDividerClassNames: { root: string } = {
  root: 'group/fui-breadcrumb-divider',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides `data-size` rather than a module class
 * (DECISIONS.md D3) — the same attribute react-button/react-badge/react-avatar stamp.
 * `BreadcrumbDividerState['size']` is optional (it is injected from BreadcrumbContext by
 * the full hook, and the base hook omits it), so the `= 'medium'` default the Griffel hook
 * applied in its destructure is preserved here and the DEFAULTED value is what gets stamped.
 */
type BreadcrumbDividerRootDataAttributes = {
  'data-size': NonNullable<BreadcrumbDividerState['size']>;
};

/**
 * Apply styling to the BreadcrumbDivider slots based on the state
 */
export const useBreadcrumbDividerStyles_unstable = (state: BreadcrumbDividerState): BreadcrumbDividerState => {
  const { size = 'medium' } = state;

  const root = state.root as BreadcrumbDividerState['root'] & BreadcrumbDividerRootDataAttributes;

  root['data-size'] = size;

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional (a makeResetStyles port), so
  // it is always the selector-safe token at index 0 that the invariant requires; the
  // `fui-BreadcrumbDivider` static that used to hold that position was removed in the D16
  // sweep.
  //
  // The marker is a literal, unhashed, GLOBAL token, and is now this component's SOLE public
  // identity class (D16.1): the only handle by which a consumer, or another module in this
  // package or any other, can select or style an element from this divider's state, because
  // `styles.root` is hashed and unaddressable from outside this file. Read it as
  // `@variant group-…/fui-breadcrumb-divider { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in BreadcrumbDivider.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-breadcrumb-divider', state.root.className);

  return state;
};
