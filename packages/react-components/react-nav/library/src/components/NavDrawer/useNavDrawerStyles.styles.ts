import { clsx } from 'clsx';

import type { NavDrawerState } from './NavDrawer.types';

import styles from './NavDrawer.module.css';

/**
 * NavDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The rendered element carries TWO markers, this one and react-drawer's
 * `group/fui-inline-drawer`: a NavDrawer IS an InlineDrawer (D16.3), and a descendant can
 * address whichever identity it means.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navDrawerClassNames: { root: string } = {
  root: 'group/fui-nav-drawer',
};

/**
 * Apply styling to the NavDrawer slots based on the state
 */
export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  const { size } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    navDrawerClassNames.root,
    !size && styles['default-width'],
    state.root.className,
  );

  return state;
};
