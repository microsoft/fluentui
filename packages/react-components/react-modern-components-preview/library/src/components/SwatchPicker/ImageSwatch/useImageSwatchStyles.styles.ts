import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ImageSwatchSlots, ImageSwatchState } from './ImageSwatch.types';
import styles from './ImageSwatch.module.css';

export const imageSwatchClassNames: SlotClassNames<ImageSwatchSlots> = {
  root: 'fui-ImageSwatch',
};

export const useImageSwatchStyles = (state: ImageSwatchState): ImageSwatchState => {
  state.root.className = clsx(imageSwatchClassNames.root, styles.root, state.root.className);
  return state;
};
