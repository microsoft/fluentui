import { clsx } from 'clsx';
import type { MessageBarBodyState } from './MessageBarBody.types';

import styles from './MessageBarBody.module.css';

/**
 * MessageBarBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const messageBarBodyClassNames: { root: string } = {
  root: 'group/fui-message-bar-body',
};

/**
 * Apply styling to the MessageBarBody slots based on the state
 */
export const useMessageBarBodyStyles_unstable = (state: MessageBarBodyState): MessageBarBodyState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-message-bar-body` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-MessageBarBody` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `messageBarBodyClassNames` — and is the only handle by which another module, in
  // this package or any other, can style an element from this body's state, because
  // `styles.root` is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // The component has a single unconditional slice, so it needs no data-attributes — see
  // MessageBarBody.module.css for the mapping back to the mergeClasses() argument order.
  state.root.className = clsx(styles.root, messageBarBodyClassNames.root, state.root.className);

  return state;
};
