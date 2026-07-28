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
import type { ToolbarSlots, ToolbarState } from './Toolbar.types';

import styles from './Toolbar.module.css';

export const toolbarClassNames: SlotClassNames<ToolbarSlots> = {
  root: 'fui-Toolbar',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md).
 *
 * Both are stamped UNCONDITIONALLY. `data-size` in particular is written even on a
 * vertical toolbar, where the Griffel hook applied no size slice: the `!vertical` half of
 * that gate is expressed in CSS by nesting the size variants inside `@variant horizontal`
 * (see Toolbar.module.css), not by withholding the attribute. Toolbar also publishes
 * `size` to its children through ToolbarContext, so an absent `data-size` would make the
 * DOM disagree with the state the children are reading.
 */
type ToolbarRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size': ToolbarState['size'];
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  const { vertical, size } = state;

  const root = state.root as ToolbarState['root'] & ToolbarRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';
  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Toolbar.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(toolbarClassNames.root, styles.root, state.root.className);

  return state;
};
