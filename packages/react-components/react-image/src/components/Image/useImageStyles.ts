import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ImageSlots, ImageState } from './Image.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `imageClassNames.root` instead.
 */
export const imageClassName = 'fui-Image';
export const imageClassNames: SlotClassNames<ImageSlots> = {
  root: 'fui-Image',
};

const useStyles = makeStyles({
  base: {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),

    boxSizing: 'border-box',
    display: 'inline-block',
  },

  // Bordered styles
  bordered: {
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },

  // Shape styles
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },

  // Shadow styles
  shadow: {
    boxShadow: tokens.shadow4,
  },

  // Fit styles
  none: {
    objectFit: 'none',
    objectPosition: 'left top',
    height: '100%',
    width: '100%',
  },
  center: {
    objectFit: 'none',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  cover: {
    objectFit: 'cover',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  contain: {
    objectFit: 'contain',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },

  // Block styles
  block: {
    width: '100%',
  },
});

export const useImageStyles_unstable = (state: ImageState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    imageClassNames.root,
    styles.base,
    styles[state.fit],
    styles[state.shape],
    state.block && styles.block,
    state.bordered && styles.bordered,
    state.shadow && styles.shadow,
    state.root.className,
  );
};
