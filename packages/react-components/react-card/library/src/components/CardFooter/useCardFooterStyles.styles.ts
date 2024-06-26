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
    gap: '12px',
  },
  action: {
    marginLeft: 'auto',

    // when the card is selected or hovered, it has custom high contrast color and background styles
    // setting this ensures action buttons adopt those colors and are still visible in forced-colors mode
    '@media (forced-colors: active)': {
      '& .fui-Button, & .fui-Link': {
        ...shorthands.borderColor('currentColor'),
        color: 'currentColor',
        outlineColor: 'currentColor',
      },
    },
  },
});

/**
 * Apply styling to the CardFooter slots based on the state.
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(cardFooterClassNames.root, styles.root, state.root.className);

  if (state.action) {
    state.action.className = mergeClasses(cardFooterClassNames.action, styles.action, state.action.className);
  }

  return state;
};
