import { clsx } from 'clsx';
import type { ToastContainerState } from './ToastContainer.types';

import styles from './ToastContainer.module.css';

/**
 * ToastContainer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The `timer` key goes with the narrowing, and it was already dead: `fui-ToastContainer__timer`
 * was declared here but never applied to any element by any hook, so nothing in the rendered
 * DOM ever carried it. `Timer` styles its own `<span>` from `Timer.module.css`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const toastContainerClassNames: { root: string } = {
  root: 'group/fui-toast-container',
};

/**
 * Apply styling to the ToastContainer slots based on the state
 */
export const useToastContainerStyles_unstable = (state: ToastContainerState): ToastContainerState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, toastContainerClassNames.root, state.root.className);

  return state;
};
