import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './CardPreview.module.css';
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardPreviewClassNames: SlotClassNames<CardPreviewSlots> = {
  root: 'fui-CardPreview',
  logo: 'fui-CardPreview__logo',
};

/**
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  state.root.className = clsx(cardPreviewClassNames.root, styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = clsx(cardPreviewClassNames.logo, styles.logo, state.logo.className);
  }

  return state;
};
