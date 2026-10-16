import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ImageSlots, ImageState } from './Image.types';
import styles from './Image.module.css';

export const imageClassNames: SlotClassNames<ImageSlots> = {
  root: 'fui-Image',
};

/**
 * Apply styling to the Image root.
 */
export const useImageStyles = (state: ImageState): ImageState => {
  state.root.className = clsx(imageClassNames.root, styles.root, state.root.className);

  return state;
};
