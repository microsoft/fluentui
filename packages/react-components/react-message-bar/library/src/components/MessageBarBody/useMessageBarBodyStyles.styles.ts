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
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, messageBarBodyClassNames.root, state.root.className);

  return state;
};
