import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  button: 'fui-ColorSwatch__button',
};

export const swatchCSSVars = {
  color: `--fui-SwatchPicker--color`,
};

const { color } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'inline-flex',
  boxSizing: 'border-box',
  border: `1px solid ${tokens.colorTransparentStroke}`,
  background: `var(${color})`,
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
    ':focus': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorBrandStroke1}, inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorStrokeFocus1}`,
    },

    ':hover': {
      backgroundColor: 'HighlightText',
      borderColor: 'Highlight',
      color: 'Highlight',
      forcedColorAdjust: 'none',
    },

    ':hover:active': {
      backgroundColor: 'HighlightText',
      borderColor: 'Highlight',
      color: 'Highlight',
      forcedColorAdjust: 'none',
    },
  },
});

const useButtonStyles = makeResetStyles({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  opacity: 0,
  ':hover': {
    cursor: 'pointer',
  },
});

const useStylesSelected = makeStyles({
  selected: {
    ...shorthands.border('none'),
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorBrandStroke1}, inset 0 0 0 5px ${tokens.colorStrokeFocus1}`,
    ...shorthands.borderColor(tokens.colorBrandStroke1),
    ':hover': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorBrandStroke1}, inset 0 0 0 6px ${tokens.colorStrokeFocus1}`,
    },
    ':hover:active': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorBrandStroke1}, inset 0 0 0 7px ${tokens.colorStrokeFocus1}`,
    },
    ...createCustomFocusIndicatorStyle({
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorStrokeFocus2}, inset 0 0 0 5px ${tokens.colorStrokeFocus1}`,
    }),
  },
});

const useSizeStyles = makeStyles({
  extraSmall: {
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
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    }),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
    }),
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusNone),
    }),
  },
});

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  const styles = useStyles();
  const buttonStyles = useButtonStyles();
  const selectedStyles = useStylesSelected();
  const sizeStyles = useSizeStyles();
  const shapeStyles = useShapeStyles();

  state.root.className = mergeClasses(
    colorSwatchClassNames.root,
    styles,
    sizeStyles[state.size ?? 'medium'],
    shapeStyles[state.shape ?? 'square'],
    state.selected && selectedStyles.selected,
    state.root.className,
  );

  state.button.className = mergeClasses(colorSwatchClassNames.button, buttonStyles, state.button.className);

  return state;
};
