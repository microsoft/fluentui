import { clsx } from 'clsx';
import type { MessageBarTitleState } from './MessageBarTitle.types';

import styles from './MessageBarTitle.module.css';

/**
 * MessageBarTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `messageBarClassNames` in
 * `../MessageBar/useMessageBarStyles.styles.ts` for the full rationale, including why this is
 * not tagged `@deprecated`. In short: the `fui-MessageBarTitle` BEM static is gone (D16.1),
 * the type narrowed to `{ root: string }` so per-slot reads are compile errors, and the value
 * is a class TOKEN — use `fuiSelector(messageBarTitleClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const messageBarTitleClassNames: { root: string } = {
  root: 'group/fui-message-bar-title',
};

/**
 * Apply styling to the MessageBarTitle slots based on the state
 */
export const useMessageBarTitleStyles_unstable = (state: MessageBarTitleState): MessageBarTitleState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-message-bar-title` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-MessageBarTitle` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `messageBarTitleClassNames` — and is the only handle by which another module, in
  // this package or any other, can style an element from this title's state, because
  // `styles.root` is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // The component has a single unconditional slice, so it needs no data-attributes — see
  // MessageBarTitle.module.css for the mapping back to the mergeClasses() argument order.
  state.root.className = clsx(styles.root, messageBarTitleClassNames.root, state.root.className);

  return state;
};
