'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BreadcrumbDividerSlots, BreadcrumbDividerState } from './BreadcrumbDivider.types';

import styles from './BreadcrumbDivider.module.css';

export const breadcrumbDividerClassNames: SlotClassNames<BreadcrumbDividerSlots> = {
  root: 'fui-BreadcrumbDivider',
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

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this divider's state, because `styles.root` is hashed and unaddressable from outside
  // this file. Read it as `@variant group-…/fui-breadcrumb-divider { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in BreadcrumbDivider.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    'group/fui-breadcrumb-divider',
    breadcrumbDividerClassNames.root,
    styles.root,
    state.root.className,
  );

  return state;
};
