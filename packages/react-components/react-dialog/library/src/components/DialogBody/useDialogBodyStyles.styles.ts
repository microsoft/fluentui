import { clsx } from 'clsx';

import type { DialogBodyState } from './DialogBody.types';

import styles from './DialogBody.module.css';

/**
 * DialogBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const dialogBodyClassNames: { root: string } = {
  root: 'group/fui-dialog-body',
};

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, dialogBodyClassNames.root, state.root.className);

  return state;
};
