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
import type { ListItemSlots, ListItemState } from './ListItem.types';

import styles from './ListItem.module.css';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  checkmark: 'fui-ListItem__checkmark',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-interactive` carries the `selectable || navigable` union that gated Griffel's
 * `rootClickableOrSelectable` slice. It is ONE attribute rather than two because neither
 * half gates anything on its own (cookbook: "prefer ONE presence attribute over two").
 *
 * Both are *presence* selectors, so the flags are written `flag || undefined` — React
 * omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-interactive="false"` and still match `[data-interactive]`.
 *
 * The checkmark slot carries no data attributes: its only slice is unconditional.
 */
type ListItemRootDataAttributes = {
  'data-interactive'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  const root = state.root as ListItemState['root'] & ListItemRootDataAttributes;

  root['data-interactive'] = state.selectable || state.navigable || undefined;
  root['data-disabled'] = state.disabled || undefined;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this ListItem's state, because `styles.root` is
  // hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // ListItem needs no state mirrors: `data-interactive` and `data-disabled` are stamped on
  // this very element above, so `@variant group-interactive/fui-list-item` /
  // `group-disabled/fui-list-item` work as-is (D15.6, Tier 0). The marker nests under
  // `group/fui-list` for free — each component root carries its own (D15.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ListItem.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the checkmark slot's rules
  // live in `fui.components.l2` rather than l1.
  state.root.className = clsx(listItemClassNames.root, 'group/fui-list-item', styles.root, state.root.className);

  if (state.checkmark) {
    state.checkmark.className = clsx(listItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }

  return state;
};
