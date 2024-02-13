import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { tokens } from '@fluentui/react-theme';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
};

export const swatchCSSVars = {
  swatchColor: `--fui-SwatchPicker--color`,
};

const { swatchColor } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  boxSizing: 'border-box',
  ...shorthands.border('none'),
  ...shorthands.padding(0),
  background: `var(${swatchColor})`,
  '&:hover': {
    cursor: 'pointer',
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorBrandStroke1),
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandBackgroundInverted),
  },
  ':hover:active': {
    ...shorthands.outline(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorBrandBackgroundInverted),
  },
});

const useStylesSelected = makeStyles({
  selected: {
    ...shorthands.outline(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandBackgroundInverted),
    ':hover': {
      ...shorthands.outline(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
      ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandBackgroundInverted),
    },
    ':hover:active': {
      ...shorthands.outline(tokens.strokeWidthThicker, 'solid', tokens.colorBrandStroke1),
      ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandBackgroundInverted),
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
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
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
    state.root.className,
  );

  if (state.selected) {
    state.root.className = mergeClasses(state.root.className, selectedStyles.selected);
  }
  return state;
};
