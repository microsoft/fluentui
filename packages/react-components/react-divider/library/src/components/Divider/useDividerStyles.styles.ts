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
import type { DividerSlots, DividerState } from './Divider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Divider.module.css';

export const dividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-Divider',
  wrapper: 'fui-Divider__wrapper',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-inset` / `data-childless` are *presence* selectors, so the flags are written as
 * `flag || undefined` — React omits an attribute whose value is `undefined`, whereas
 * `false` would render `data-inset="false"` and still match `[data-inset]`.
 */
type DividerRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-align-content': DividerState['alignContent'];
  'data-inset'?: true;
  'data-childless'?: true;
};

export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  const { alignContent, appearance, inset, vertical } = state;
  const isChildless = state.root.children === undefined;

  const root = state.root as DividerState['root'] & DividerRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';
  root['data-align-content'] = alignContent;
  root['data-inset'] = inset || undefined;
  root['data-childless'] = isChildless || undefined;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Divider.module.css,
  // not by the order of these arguments — see that file's header for the mapping back
  // to the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    dividerClassNames.root,
    styles.root,
    appearance && styles[appearance],
    state.root.className,
  );

  if (state.wrapper) {
    state.wrapper.className = clsx(dividerClassNames.wrapper, state.wrapper.className);
  }

  return state;
};
