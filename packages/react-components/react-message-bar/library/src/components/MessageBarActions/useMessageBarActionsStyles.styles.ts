import { clsx } from 'clsx';
import type { MessageBarActionsState } from './MessageBarActions.types';

import styles from './MessageBarActions.module.css';

/**
 * MessageBarActions' public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const messageBarActionsClassNames: { root: string } = {
  root: 'group/fui-message-bar-actions',
};

/**
 * Data attributes rendered on the root slot and matched by `:where([data-…])` selectors in
 * `MessageBarActions.module.css`.
 */
type MessageBarActionsRootDataAttributes = {
  'data-layout': MessageBarActionsState['layout'];
  'data-has-actions'?: true;
};

/**
 * Apply styling to the MessageBarActions slots based on the state
 */
export const useMessageBarActionsStyles_unstable = (state: MessageBarActionsState): MessageBarActionsState => {
  const { hasActions, layout } = state;

  const root = state.root as MessageBarActionsState['root'] & MessageBarActionsRootDataAttributes;

  root['data-layout'] = layout;
  root['data-has-actions'] = hasActions || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, messageBarActionsClassNames.root, state.root.className);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.containerAction) {
    state.containerAction.className = clsx(styles['container-action'], state.containerAction.className);
  }

  return state;
};
