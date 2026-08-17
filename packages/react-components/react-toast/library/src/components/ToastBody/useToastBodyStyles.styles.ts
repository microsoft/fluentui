import { clsx } from 'clsx';
import type { ToastBodyState } from './ToastBody.types';

import styles from './ToastBody.module.css';

/**
 * ToastBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const toastBodyClassNames: { root: string } = {
  root: 'group/fui-toast-body',
};

/**
 * Apply styling to the ToastBody slots based on the state
 */
export const useToastBodyStyles_unstable = (state: ToastBodyState): ToastBodyState => {
  const inverted = state.backgroundAppearance === 'inverted';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    toastBodyClassNames.root,
    inverted && styles['root-inverted'],
    state.root.className,
  );

  if (state.subtitle) {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    state.subtitle.className = clsx(styles.subtitle, inverted && styles['subtitle-inverted'], state.subtitle.className);
  }

  return state;
};
