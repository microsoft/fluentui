import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardHeaderClassNames: SlotClassNames<CardHeaderSlots> = {
  root: 'fui-CardHeader',
  image: 'fui-CardHeader__image',
  header: 'fui-CardHeader__header',
  description: 'fui-CardHeader__description',
  action: 'fui-CardHeader__action',
};

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridAutoColumns: 'min-content 1fr min-content',
    gridAutoRows: '1fr min-content',
    alignItems: 'center',
    ...shorthands.gap('12px', '0'),
  },
  image: {
    gridColumnStart: '1',
    gridRowStart: 'span 2',
  },
  header: {
    gridColumnStart: '2',
    gridRowStart: '1',
  },
  description: {
    gridColumnStart: '2',
    gridRowStart: '2',
  },
  action: {
    gridColumnStart: '3',
    gridRowStart: 'span 2',
  },
});

/**
 * Apply styling to the CardHeader slots based on the state.
 */
export const useCardHeaderStyles_unstable = (state: CardHeaderState): CardHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(cardHeaderClassNames.root, styles.root, state.root.className);

  if (state.image) {
    state.image.className = mergeClasses(cardHeaderClassNames.image, styles.image, state.image.className);
  }

  if (state.header) {
    state.header.className = mergeClasses(cardHeaderClassNames.header, styles.header, state.header.className);
  }

  if (state.description) {
    state.description.className = mergeClasses(
      cardHeaderClassNames.description,
      styles.description,
      state.description.className,
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(cardHeaderClassNames.action, styles.action, state.action.className);
  }

  return state;
};
