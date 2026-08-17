import { clsx } from 'clsx';
import type { MessageBarState } from './MessageBar.types';

import styles from './MessageBar.module.css';

/**
 * MessageBar's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const messageBarClassNames: { root: string } = {
  root: 'group/fui-message-bar',
};

/**
 * Data attributes rendered on the root slot and matched by `:where([data-…])` selectors in
 * `MessageBar.module.css`.
 */
type MessageBarRootDataAttributes = {
  'data-layout': MessageBarState['layout'];
  'data-intent': MessageBarState['intent'];
};

/**
 * Apply styling to the MessageBar slots based on the state
 */
export const useMessageBarStyles_unstable = (state: MessageBarState): MessageBarState => {
  const { intent, layout, shape } = state;

  const root = state.root as MessageBarState['root'] & MessageBarRootDataAttributes;

  root['data-layout'] = layout;
  root['data-intent'] = intent;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    messageBarClassNames.root,
    shape === 'square' && styles.square,
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  if (state.bottomReflowSpacer) {
    // No consumer className is merged here — reproduced verbatim from the Griffel hook,
    // which also omitted it.
    state.bottomReflowSpacer.className = clsx(styles['bottom-reflow-spacer']);
  }

  return state;
};
