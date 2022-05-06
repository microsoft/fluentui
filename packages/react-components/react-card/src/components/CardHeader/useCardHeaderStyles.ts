import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

/**
 * @deprecated Use `cardHeaderClassNames.root` instead.
 */
export const cardHeaderClassName = 'fui-CardHeader';
export const cardHeaderClassNames: SlotClassNames<CardHeaderSlots> = {
  root: 'fui-CardHeader',
  image: 'fui-CardHeader__image',
  content: 'fui-CardHeader__content',
  header: 'fui-CardHeader__header',
  description: 'fui-CardHeader__description',
  action: 'fui-CardHeader__action',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    height: '32px',
  },
  image: {
    minWidth: '24px',
    minHeight: '24px',
    maxWidth: '32px',
    maxHeight: '32px',

    display: 'flex',
    alignItems: 'center',

    '> *': {
      minWidth: 'inherit',
      minHeight: 'inherit',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: 'inherit',

    '> *': {
      height: '50%',
    },
  },
});

/**
 * Apply styling to the CardHeader slots based on the state
 */
export const useCardHeaderStyles_unstable = (state: CardHeaderState): CardHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(cardHeaderClassNames.root, styles.root, state.root.className);

  if (state.image) {
    state.image.className = mergeClasses(cardHeaderClassNames.image, styles.image, state.image.className);
  }

  if (state.content) {
    state.content.className = mergeClasses(cardHeaderClassNames.content, styles.textContainer, state.content.className);
  }

  if (state.header) {
    state.header.className = mergeClasses(cardHeaderClassNames.header, state.header.className);
  }

  if (state.description) {
    state.description.className = mergeClasses(cardHeaderClassNames.description, state.description.className);
  }

  if (state.action) {
    state.action.className = mergeClasses(cardHeaderClassNames.action, state.action.className);
  }

  return state;
};
