import { clsx } from 'clsx';

import type { DialogActionsState } from './DialogActions.types';

import styles from './DialogActions.module.css';

/**
 * DialogActions' public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const dialogActionsClassNames: { root: string } = {
  root: 'group/fui-dialog-actions',
};

/**
 * Apply styling to the DialogActions slots based on the state
 */
export const useDialogActionsStyles_unstable = (state: DialogActionsState): DialogActionsState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    dialogActionsClassNames.root,
    state.position === 'start' && styles['grid-position-start'],
    state.position === 'end' && styles['grid-position-end'],
    state.fluid && state.position === 'start' && styles['fluid-start'],
    state.fluid && state.position === 'end' && styles['fluid-end'],
    state.root.className,
  );

  return state;
};
