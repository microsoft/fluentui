import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CardSlots, CardState } from './Card.types';
import styles from './Card.module.css';

export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
  floatingAction: 'fui-Card__floatingAction',
  checkbox: 'fui-Card__checkbox',
};

/**
 * Apply styling to the Card slots based on the state.
 */
export const useCardStyles = (state: CardState): CardState => {
  state.root.className = clsx(cardClassNames.root, styles.root, state.root.className);

  if (state.floatingAction) {
    state.floatingAction.className = clsx(
      cardClassNames.floatingAction,
      styles.floatingAction,
      state.floatingAction.className,
    );
  }

  if (state.checkbox) {
    state.checkbox.className = clsx(cardClassNames.checkbox, styles.checkbox, state.checkbox.className);
  }

  return state;
};
