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
  },
  contain: {
    objectFit: 'contain',
    objectPosition: 'center',
  },
  default: {
    /* The default styles are exactly the same as the base styles. */
  },
  cover: {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  none: {
    objectFit: 'none',
    objectPosition: 'left top',
  },

  // When no explicit height/width props are provided, apply full-size
  // sizing so fit modes behave as intended (object-fit fills the element).
  fitFill: {
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

  const { height, width } = state.root;
  // eslint-disable-next-line eqeqeq
  const hasExplicitSize = height != null || width != null;
  const shouldApplyFitFill = state.fit !== 'default' && !hasExplicitSize;

  state.root.className = mergeClasses(
    imageClassNames.root,
    styles.base,
    state.block && styles.block,
    state.bordered && styles.bordered,
    state.shadow && styles.shadow,
    styles[state.fit],
    shouldApplyFitFill && styles.fitFill,
    styles[state.shape],
    state.root.className,
  );

  return state;
};
