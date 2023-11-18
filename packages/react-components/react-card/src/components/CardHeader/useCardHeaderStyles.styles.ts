import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
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

/**
 * CSS variable names used internally for uniform styling in CardHeader.
 */
export const cardHeaderCSSVars = {
  cardHeaderGapVar: '--fui-CardHeader--gap',
};

const useStyles = makeStyles({
  root: {
    [cardHeaderCSSVars.cardHeaderGapVar]: '12px',
    display: 'grid',
    gridAutoColumns: 'min-content 1fr min-content',
    alignItems: 'center',
  },
  image: {
    display: 'inline-flex',
    marginRight: `var(${cardHeaderCSSVars.cardHeaderGapVar})`,
    gridColumnStart: '1',
    gridRowStart: 'span 2',
  },
  header: {
    gridColumnStart: '2',
    gridRowStart: '1',
    display: 'flex',
  },
  description: {
    gridColumnStart: '2',
    gridRowStart: '2',
    display: 'flex',
  },
  action: {
    marginLeft: `var(${cardHeaderCSSVars.cardHeaderGapVar})`,
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
