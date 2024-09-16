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

/**
 * CSS variable names used internally for uniform styling in CardHeader.
 */
export const cardHeaderCSSVars = {
  cardHeaderGapVar: '--fui-CardHeader--gap',
};

const useStyles = makeStyles<keyof CardHeaderSlots>({
  root: {
    [cardHeaderCSSVars.cardHeaderGapVar]: '12px',
    alignItems: 'center',
  },
  image: {
    display: 'inline-flex',
    marginRight: `var(${cardHeaderCSSVars.cardHeaderGapVar})`,
  },
  header: {
    display: 'flex',
  },
  description: {
    display: 'flex',
  },
  action: {
    marginLeft: `var(${cardHeaderCSSVars.cardHeaderGapVar})`,

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

const useStylesGrid = makeStyles<keyof CardHeaderSlots>({
  root: {
    display: 'grid',
    gridAutoColumns: 'min-content 1fr min-content',
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

const useStylesFlex = makeStyles<keyof CardHeaderSlots>({
  root: {
    display: 'flex',
  },

  header: {
    flexGrow: 1,
  },

  image: {},
  description: {},
  action: {},
});

/**
 * Apply styling to the CardHeader slots based on the state.
 */
export const useCardHeaderStyles_unstable = (state: CardHeaderState): CardHeaderState => {
  'use no memo';

  const styles = useStyles();
  const stylesGrid = useStylesGrid();
  const stylesFlex = useStylesFlex();

  const boxModelStyles = state.description ? stylesGrid : stylesFlex;

  const getSlotStyles = (slotName: keyof CardHeaderSlots): string => {
    return mergeClasses(
      cardHeaderClassNames[slotName],
      styles[slotName],
      boxModelStyles[slotName],
      state[slotName]?.className,
    );
  };

  state.root.className = getSlotStyles('root');

  if (state.image) {
    state.image.className = getSlotStyles('image');
  }

  if (state.header) {
    state.header.className = getSlotStyles('header');
  }

  if (state.description) {
    state.description.className = getSlotStyles('description');
  }

  if (state.action) {
    state.action.className = getSlotStyles('action');
  }

  return state;
};
