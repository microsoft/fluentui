import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  button: 'fui-ColorSwatch__button',
};

export const swatchCSSVars = {
   color: `--fui-SwatchPicker--color`,
};

const { swatchColor } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  position: 'relative',
  boxSizing: 'border-box',
  border: 'none',
  padding: 0,
  background: `var(${swatchColor})`,
  ':hover': {
    cursor: 'pointer',
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorBrandStroke1),
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorBrandBackgroundInverted),
  },
  ':hover:active': {
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorBrandStroke1),
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandBackgroundInverted),
  },
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useButtonStyles = makeResetStyles({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  margin: 0,
  opacity: 0,
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
