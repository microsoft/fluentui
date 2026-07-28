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
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';

import styles from './CardFooter.module.css';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardFooterClassNames: SlotClassNames<CardFooterSlots> = {
  root: 'fui-CardFooter',
  action: 'fui-CardFooter__action',
};

/**
 * Apply styling to the CardFooter slots based on the state.
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this footer's state, because `styles.root` is hashed and unaddressable from outside
  // this file. Read it as `@variant group-…/fui-card-footer { … }` (DECISIONS.md D15). Only
  // the root slot carries a marker; `action` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CardFooter.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the action slot's
  // forced-colors Button/Link rules sit at `fui.components.l2`.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx('group/fui-card-footer', cardFooterClassNames.root, styles.root, state.root.className);

  if (state.action) {
    state.action.className = clsx(cardFooterClassNames.action, styles.action, state.action.className);
  }

  return state;
};
