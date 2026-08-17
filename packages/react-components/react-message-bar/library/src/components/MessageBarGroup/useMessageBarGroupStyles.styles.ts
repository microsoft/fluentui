/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * MessageBarGroup declares NO styles — its Griffel hook only ran `mergeClasses` over the
 * static class name and the consumer className — so `mergeClasses` was replaced by `clsx`
 * only to keep `@griffel/react` out of the package (CONVERSION_GUIDE.md §4).
 * `MessageBarGroup.module.css` accordingly carries no styling: it exists for the single
 * identity-only `.root` local imported below, and its header explains both why that local is
 * needed and why it cannot be spelled as an empty rule.
 *
 * There is no `'use client'` directive to preserve here: the original file had none.
 */

import { clsx } from 'clsx';
import type { MessageBarGroupState } from './MessageBarGroup.types';

import styles from './MessageBarGroup.module.css';

/**
 * MessageBarGroup's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const messageBarGroupClassNames: { root: string } = {
  root: 'group/fui-message-bar-group',
};

/**
 * Apply styling to the MessageBarGroup slots based on the state
 */
export const useMessageBarGroupStyles_unstable = (state: MessageBarGroupState): MessageBarGroupState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, messageBarGroupClassNames.root, state.root.className);
  return state;
};
