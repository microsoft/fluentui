import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardFooterClassNames: SlotClassNames<CardFooterSlots> = {
  root: 'fui-CardFooter',
  action: 'fui-CardFooter__action',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('12px'),
  },
  action: {
    marginLeft: 'auto',
  },
});

/**
 * Apply styling to the CardFooter slots based on the state.
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(cardFooterClassNames.root, styles.root, state.root.className);

  if (state.action) {
    state.action.className = mergeClasses(cardFooterClassNames.action, styles.action, state.action.className);
  }

  return state;
};
