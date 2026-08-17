import { clsx } from 'clsx';
import type { ToastFooterState } from './ToastFooter.types';

import styles from './ToastFooter.module.css';

/**
 * ToastFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const toastFooterClassNames: { root: string } = {
  root: 'group/fui-toast-footer',
};

/**
 * Apply styling to the ToastFooter slots based on the state
 */
export const useToastFooterStyles_unstable = (state: ToastFooterState): ToastFooterState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, toastFooterClassNames.root, state.root.className);

  return state;
};
