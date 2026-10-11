import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';
import styles from './CardPreview.module.css';

export const cardPreviewClassNames: SlotClassNames<CardPreviewSlots> = {
  root: 'fui-CardPreview',
  logo: 'fui-CardPreview__logo',
};

export const useCardPreviewStyles = (state: CardPreviewState): CardPreviewState => {
  state.root.className = clsx(cardPreviewClassNames.root, styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = clsx(cardPreviewClassNames.logo, styles.logo, state.logo.className);
  }

  return state;
};
