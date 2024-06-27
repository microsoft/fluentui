import { makeStyles, mergeClasses, makeResetStyles } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ImageSwatchSlots, ImageSwatchState } from './ImageSwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const imageSwatchClassNames: SlotClassNames<ImageSwatchSlots> = {
  root: 'fui-ImageSwatch',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'inline-flex',
  boxSizing: 'border-box',
  border: `1px solid ${tokens.colorTransparentStroke}`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '0',
  ':hover': {
    cursor: 'pointer',
    border: 'none',
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThick} ${tokens.colorBrandStroke1}, inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorStrokeFocus1}`,
  },
  ':hover:active': {
    border: 'none',
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorBrandStroke1}, inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorStrokeFocus1}`,
  },
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    outline: 'none',
  },
  ...createCustomFocusIndicatorStyle({
    border: 'none',
    outline: 'none',
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}, inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorStrokeFocus1}`,
  }),

  // High contrast styles

  '@media (forced-colors: active)': {
    forcedColorAdjust: 'none',
    ':hover': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThick} ${tokens.colorBrandStroke2Hover}, inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorStrokeFocus1}`,
    },
    ':hover:active': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorBrandStroke2Pressed}, inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorStrokeFocus1}`,
    },
  },
});

const useStylesSelected = makeStyles({
  selected: {
    border: 'none',
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorBrandStroke1}, inset 0 0 0 5px ${tokens.colorStrokeFocus1}`,
    ':hover': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorBrandStroke1}, inset 0 0 0 6px ${tokens.colorStrokeFocus1}`,
    },
    ':hover:active': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorBrandStroke1}, inset 0 0 0 7px ${tokens.colorStrokeFocus1}`,
    },
    ...createCustomFocusIndicatorStyle({
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorStrokeFocus2}, inset 0 0 0 5px ${tokens.colorStrokeFocus1}`,
    }),
    '@media (forced-colors: active)': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorBrandStroke2Pressed}, inset 0 0 0 5px ${tokens.colorStrokeFocus1}`,
    },
  },
});

const useSizeStyles = makeStyles({
  'extra-small': {
    width: '20px',
    height: '20px',
  },
  small: {
    width: '24px',
    height: '24px',
  },
  medium: {
    width: '28px',
    height: '28px',
  },
  large: {
    width: '32px',
    height: '32px',
  },
});

const useShapeStyles = makeStyles({
  rounded: {
    borderRadius: tokens.borderRadiusMedium,
    ...createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusMedium }),
  },
  circular: {
    borderRadius: tokens.borderRadiusCircular,
    ...createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusCircular }),
  },
  square: {
    borderRadius: tokens.borderRadiusNone,
    ...createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusNone }),
  },
});

/**
 * Apply styling to the ImageSwatch slots based on the state
 */
export const useImageSwatchStyles_unstable = (state: ImageSwatchState): ImageSwatchState => {
  'use no memo';

  const styles = useStyles();
  const selectedStyles = useStylesSelected();
  const sizeStyles = useSizeStyles();
  const shapeStyles = useShapeStyles();

  const { size = 'medium', shape = 'square' } = state;

  state.root.className = mergeClasses(
    imageSwatchClassNames.root,
    styles,
    sizeStyles[size],
    shapeStyles[shape],
    state.selected && selectedStyles.selected,
    state.root.className,
  );

  return state;
};
