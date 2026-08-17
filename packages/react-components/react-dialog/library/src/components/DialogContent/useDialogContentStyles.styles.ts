import { clsx } from 'clsx';

import type { DialogContentState } from './DialogContent.types';

import styles from './DialogContent.module.css';

/**
 * DialogContent's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const dialogContentClassNames: { root: string } = {
  root: 'group/fui-dialog-content',
};

/**
 * Apply styling to the DialogContent slots based on the state
 */
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, dialogContentClassNames.root, state.root.className);

  return state;
};
