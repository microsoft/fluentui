import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';
import styles from './CardFooter.module.css';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardFooterClassNames: SlotClassNames<CardFooterSlots> = {
  root: 'fui-CardFooter',
  action: 'fui-CardFooter__action',
};

/**
 * Apply styling to the CardFooter slots based on the state.
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  state.root.className = clsx(cardFooterClassNames.root, styles.root, state.root.className);

  if (state.action) {
    state.action.className = clsx(cardFooterClassNames.action, styles.action, state.action.className);
  }

  return state;
};
