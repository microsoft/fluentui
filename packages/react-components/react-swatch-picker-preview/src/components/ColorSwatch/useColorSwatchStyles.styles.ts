import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
};

export const swatchCSSVars = {
  color: `--fui-SwatchPicker--color`,
};

const { color } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  border: 'none',
  background: `var(${color})`,
  ':hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1}`,
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandStroke1),
  },
  ':hover:active': {
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1}`,
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
  },
  ...createCustomFocusIndicatorStyle({
    outline: 'none',
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1}`,
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorStrokeFocus2),
  }),

  // High contrast styles

  '@media (forced-colors: active)': {
    ':focus': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1}`,
      ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
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

const useStylesSelected = makeStyles({
  selected: {
    boxShadow: `inset 0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1}`,
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
    ':hover': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1}`,
      ...shorthands.border(tokens.strokeWidthThickest, 'solid', tokens.colorBrandStroke1),
    },
    ':hover:active': {
      boxShadow: `inset 0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1}`,
      ...shorthands.border(tokens.strokeWidthThickest, 'solid', tokens.colorBrandStroke1),
    },
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

  return state;
};
