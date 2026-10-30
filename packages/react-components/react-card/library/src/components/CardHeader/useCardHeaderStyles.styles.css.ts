import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';
import styles from './CardHeader.module.css';

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

/**
 * Apply styling to the CardHeader slots based on the state.
 */
export const useCardHeaderStyles_unstable = (state: CardHeaderState): CardHeaderState => {
  state.root.className = clsx(
    cardHeaderClassNames.root,
    styles.root,
    state.description ? styles.grid : styles.flex,
    state.root.className,
  );
  if (state.image) {
    state.image.className = clsx(cardHeaderClassNames.image, styles.image, state.image.className);
  }
  if (state.header) {
    state.header.className = clsx(cardHeaderClassNames.header, styles.header, state.header.className);
  }
  if (state.description) {
    state.description.className = clsx(
      cardHeaderClassNames.description,
      styles.description,
      state.description.className,
    );
  }
  if (state.action) {
    state.action.className = clsx(cardHeaderClassNames.action, styles.action, state.action.className);
  }
  return state;
};
