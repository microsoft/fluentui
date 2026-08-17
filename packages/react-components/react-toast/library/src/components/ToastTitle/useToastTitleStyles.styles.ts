import { clsx } from 'clsx';
import type { ToastTitleState } from './ToastTitle.types';

import styles from './ToastTitle.module.css';

/**
 * ToastTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const toastTitleClassNames: { root: string } = {
  root: 'group/fui-toast-title',
};

/**
 * Apply styling to the ToastTitle slots based on the state
 */
export const useToastTitleStyles_unstable = (state: ToastTitleState): ToastTitleState => {
  const { intent } = state;
  const inverted = state.backgroundAppearance === 'inverted';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    toastTitleClassNames.root,
    inverted && styles['root-inverted'],
    state.root.className,
  );

  if (state.media) {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    state.media.className = clsx(
      styles.media,
      inverted && styles['media-inverted'],
      intent && styles[`media-${intent}` as const],
      inverted && intent && styles[`media-inverted-${intent}` as const],
      state.media.className,
    );
  }

  if (state.action) {
    state.action.className = clsx(styles.action, inverted && styles['action-inverted'], state.action.className);
  }

  return state;
};
