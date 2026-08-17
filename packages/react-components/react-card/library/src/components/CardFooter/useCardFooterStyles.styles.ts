import { clsx } from 'clsx';
import type { CardFooterState } from './CardFooter.types';

import styles from './CardFooter.module.css';

/**
 * CardFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const cardFooterClassNames: { root: string } = {
  root: 'group/fui-card-footer',
};

/**
 * Apply styling to the CardFooter slots based on the state.
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, cardFooterClassNames.root, state.root.className);

  if (state.action) {
    state.action.className = clsx(styles.action, state.action.className);
  }

  return state;
};
