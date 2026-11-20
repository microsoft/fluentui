import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './Image.module.css';
import type { ImageSlots, ImageState } from './Image.types';

export const imageClassNames: SlotClassNames<ImageSlots> = {
  root: 'fui-Image',
};

export const useImageStyles_unstable = (state: ImageState): ImageState => {
  const { height, width } = state.root;
  // eslint-disable-next-line eqeqeq
  const hasExplicitSize = height != null || width != null;
  const shouldApplyFitFill = state.fit !== 'default' && !hasExplicitSize;

  state.root.className = clsx(
    imageClassNames.root,
    styles.base,
    state.block && styles.block,
    state.bordered && styles.bordered,
    state.shadow && styles.shadow,
    state.fit !== 'default' && styles[state.fit],
    shouldApplyFitFill && styles.fitFill,
    state.shape !== 'square' && styles[state.shape],
    state.root.className,
  );

  return state;
};
