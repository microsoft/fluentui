import { clsx } from 'clsx';

import type { AppItemStaticState } from './AppItemStatic.types';

import styles from './AppItemStatic.module.css';

/**
 * AppItemStatic's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const appItemStaticClassNames: { root: string } = {
  root: 'group/fui-app-item-static',
};

/**
 * Apply styling to the AppItemStatic slots based on the state
 */
export const useAppItemStaticStyles_unstable = (state: AppItemStaticState): AppItemStaticState => {
  const { density, icon } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    appItemStaticClassNames.root,
    density === 'small' && styles.small,
    !icon && styles['absent-icon'],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
