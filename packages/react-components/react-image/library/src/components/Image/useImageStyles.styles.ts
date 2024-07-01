import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ImageSlots, ImageState } from './Image.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const imageClassNames: SlotClassNames<ImageSlots> = {
  root: 'fui-Image',
};

const useStyles = makeStyles({
  // Base styles
  base: {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    borderRadius: tokens.borderRadiusNone,

    boxSizing: 'border-box',
    display: 'inline-block',
  },

  // Bordered styles
  bordered: {
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },

  // Shape variations
  circular: { borderRadius: tokens.borderRadiusCircular },
  rounded: { borderRadius: tokens.borderRadiusMedium },
  square: {
    /* The square styles are exactly the same as the base styles. */
  },

  // Shadow styles
  shadow: {
    boxShadow: tokens.shadow4,
  },

  // Fit variations
  center: {
    objectFit: 'none',
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
  default: {
    /* The default styles are exactly the same as the base styles. */
  },
  cover: {
    objectFit: 'cover',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  none: {
    objectFit: 'none',
    objectPosition: 'left top',
    height: '100%',
    width: '100%',
  },

  // Block styles
  block: {
    width: '100%',
  },
});

export const useImageStyles_unstable = (state: ImageState): ImageState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(
    imageClassNames.root,
    styles.base,
    state.block && styles.block,
    state.bordered && styles.bordered,
    state.shadow && styles.shadow,
    styles[state.fit],
    styles[state.shape],
    state.root.className,
  );

  return state;
};
