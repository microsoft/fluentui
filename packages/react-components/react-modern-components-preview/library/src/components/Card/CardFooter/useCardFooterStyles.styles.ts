import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';
import styles from './CardFooter.module.css';

export const cardFooterClassNames: SlotClassNames<CardFooterSlots> = {
  root: 'fui-CardFooter',
  action: 'fui-CardFooter__action',
};

export const useCardFooterStyles = (state: CardFooterState): CardFooterState => {
  state.root.className = clsx(cardFooterClassNames.root, styles.root, state.root.className);

  if (state.action) {
    state.action.className = clsx(cardFooterClassNames.action, styles.action, state.action.className);
  }

  return state;
};
