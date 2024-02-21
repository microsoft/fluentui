import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster'; //createCustomFocusIndicatorStyle

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  button: 'fui-ColorSwatch__button',
  icon: 'fui-ColorSwatch__icon',
  disabledIcon: 'fui-ColorSwatch__disabledIcon',
};

export const swatchCSSVars = {
  color: `--fui-SwatchPicker--color`,
  swatchBorderColor: `--fui-SwatchPicker--borderColor`,
  swatchStateColor: `--fui-SwatchPicker--stateColor`,
};

const { color, swatchBorderColor, swatchStateColor } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  position: 'relative',
  boxSizing: 'border-box',
  padding: 0,
  ...shorthands.border('none'),
  ...shorthands.padding(0),
  background: `var(${color})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  border: `1px solid var(${swatchBorderColor})`,
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px var(${color}), inset 0 0 0 4px var(${swatchStateColor})`,
  },
  ':hover:active': {
    boxShadow: `inset 0 0 0 3px var(${color}), inset 0 0 0 6px var(${swatchStateColor})`,
  },
  // ':focus': {
  //   border: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
  //   boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorNeutralForegroundInverted}
  //     inset
  //   `,
  // },
  // High contrast styles

  '@media (forced-colors: active)': {
    ':focus': {
      borderColor: 'ButtonText',
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

  // Focus styles

  // ...createCustomFocusIndicatorStyle({
  //   border: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
  //   boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${swatchStateColor}
  //     inset
  //   `,
  //   borderRadius: tokens.borderRadiusNone,
  // }),
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
    boxShadow: `inset 0 0 0 4px var(${color}), inset 0 0 0 6px var(${swatchStateColor})`,
    ':hover': {
      boxShadow: `inset 0 0 0 5px var(${color}), inset 0 0 0 7px var(${swatchStateColor})`,
    },
    ':hover:active': {
      boxShadow: `inset 0 0 0 6px var(${color}), inset 0 0 0 8px var(${swatchStateColor})`,
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

const useIconStyles = makeResetStyles({});

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  const styles = useStyles();
  const buttonStyles = useButtonStyles();
  const iconStyles = useIconStyles();
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

  if (state.icon) {
    state.icon.className = mergeClasses(colorSwatchClassNames.icon, iconStyles, state.icon.className);
  }

  state.button.className = mergeClasses(colorSwatchClassNames.button, buttonStyles, state.button.className);

  return state;
};
