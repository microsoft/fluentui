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
 * `data-inset` / `data-empty` are *presence* selectors, so the flags are written as
 * `flag || undefined` — React omits an attribute whose value is `undefined`, whereas
 * `false` would render `data-inset="false"` and still match `[data-inset]`.
 */
type DividerRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-align-content': DividerState['alignContent'];
  'data-inset'?: true;
  'data-empty'?: true;
};

export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  const { alignContent, appearance, inset, vertical } = state;
  const isEmpty = state.root.children === undefined;

  const root = state.root as DividerState['root'] & DividerRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';
  root['data-align-content'] = alignContent;
  root['data-inset'] = inset || undefined;
  root['data-empty'] = isEmpty || undefined;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Divider's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Divider needs no state mirrors:
  // `data-orientation`, `data-align-content`, `data-inset` and `data-empty` are already
  // stamped on this very element above, so `@variant group-vertical/fui-divider`,
  // `group-inset/fui-divider` etc. work as-is (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Divider.module.css,
  // not by the order of these arguments — see that file's header for the mapping back
  // to the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    dividerClassNames.root,
    'group/fui-divider',
    styles.root,
    appearance && styles[appearance],
    state.root.className,
  );

  if (state.wrapper) {
    state.wrapper.className = clsx(dividerClassNames.wrapper, state.wrapper.className);
  }

  return state;
};
