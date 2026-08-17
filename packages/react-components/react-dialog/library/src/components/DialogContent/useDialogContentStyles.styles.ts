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
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-dialog-content` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-DialogContent` static held that position; `styles.root` holds it now.
  state.root.className = clsx(styles.root, dialogContentClassNames.root, state.root.className);

  return state;
};
