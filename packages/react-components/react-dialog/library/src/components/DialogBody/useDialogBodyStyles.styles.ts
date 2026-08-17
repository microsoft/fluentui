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
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-dialog-body` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-DialogBody` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `dialogBodyClassNames` — and is the only handle by which another module can style
  // an element from this body's state, because `styles.root` is hashed and unaddressable from
  // outside this file (DECISIONS.md D15).
  state.root.className = clsx(styles.root, dialogBodyClassNames.root, state.root.className);

  return state;
};
