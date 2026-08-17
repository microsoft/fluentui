import { clsx } from 'clsx';

import type { AppItemState } from './AppItem.types';

import styles from './AppItem.module.css';

/**
 * AppItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const appItemClassNames: { root: string } = {
  root: 'group/fui-app-item',
};

/**
 * Apply styling to the AppItem slots based on the state
 */
export const useAppItemStyles_unstable = (state: AppItemState): AppItemState => {
  const { density, icon } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    appItemClassNames.root,
    density === 'small' && styles.small,
    !icon && styles['absent-icon'],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
