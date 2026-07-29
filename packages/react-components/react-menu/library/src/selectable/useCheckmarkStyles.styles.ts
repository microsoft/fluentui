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
import type { MenuItemSelectableState } from './types';
import type { MenuItemState } from '../components/MenuItem/MenuItem.types';

import styles from './Checkmark.module.css';

/**
 * Applies styles to a checkmark slot for selectable menu items
 *
 * Called once per render, from `useMenuItemStyles_unstable` — which every selectable menu
 * item's styles hook delegates to. It is deliberately NOT called a second time by
 * `useMenuItemCheckboxStyles_unstable` / `useMenuItemRadioStyles_unstable`: `mergeClasses`
 * used to collapse the duplicate atomics, `clsx` does not, and a doubled class token in the
 * rendered DOM is the only thing that would change.
 *
 * @param state - should contain a `checkmark` slot
 */
export const useCheckmarkStyles_unstable = (
  state: MenuItemSelectableState & Pick<MenuItemState, 'checkmark'>,
): void => {
  if (state.checkmark) {
    // Composes AHEAD of whatever the caller already put on the slot (MenuItem's own
    // `.checkmark`, then the consumer's className), so the consumer's string stays last —
    // the `classname-overrides-win` contract (DECISIONS.md D9).
    state.checkmark.className = clsx(styles.root, state.checked && styles['root-checked'], state.checkmark.className);
  }
};
