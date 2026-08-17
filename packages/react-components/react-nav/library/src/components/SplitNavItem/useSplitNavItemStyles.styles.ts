import { clsx } from 'clsx';

import type { SplitNavItemState } from './SplitNavItem.types';

import styles from './SplitNavItem.module.css';

/**
 * SplitNavItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The marker is ALSO what the three button slots read their show/hide state from:
 * `SplitNavItem.module.css`'s `.hover-action` composes `group-hover/fui-split-nav-item` and
 * `group-focus-within/fui-split-nav-item`, replacing the `& .fui-SplitNavItem__*Button`
 * descendant selectors the statics used to key (D16.3, mechanism M2).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const splitNavItemClassNames: { root: string } = {
  root: 'group/fui-split-nav-item',
};

/**
 * Apply styling to the SplitNavItem slots based on the state
 */
export const useSplitNavItemStyles_unstable = (state: SplitNavItemState): SplitNavItemState => {
  const isMediumDensity = state.density === 'medium';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, splitNavItemClassNames.root, state.root.className);

  if (state.navItem) {
    state.navItem.className = clsx(styles['nav-item'], state.navItem.className);
  }

  // The three button slots are react-button roots this hook RENDERS, so it holds their slot
  // objects and D16.3's M2 applies: the class it composes here is what the module's
  // `group-*/fui-split-nav-item` variants attach to, replacing the
  // `& .fui-SplitNavItem__actionButton, …` descendant selectors the statics used to key.
  if (state.actionButton) {
    state.actionButton.className = clsx(
      styles.secondary,
      styles['hover-action'],
      isMediumDensity && styles.medium,
      state.actionButton.className,
    );
  }

  if (state.toggleButton) {
    state.toggleButton.className = clsx(
      styles.secondary,
      styles['hover-action'],
      isMediumDensity && styles.medium,
      state.toggleButton.className,
    );
  }

  if (state.menuButton) {
    state.menuButton.className = clsx(
      styles.secondary,
      styles['hover-action'],
      isMediumDensity && styles.medium,
      state.menuButton.className,
    );
  }

  return state;
};
