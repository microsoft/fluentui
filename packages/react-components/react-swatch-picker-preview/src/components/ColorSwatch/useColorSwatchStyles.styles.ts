import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-components';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  icon: 'fui-ColorSwatch__icon',
};

export const swatchCSSVars = {
  swatchColor: `--fui-SwatchPicker--color`,
  swatchBorderColor: `--fui-SwatchPicker--borderColor`,
  swatchStateColor: `--fui-SwatchPicker--stateColor`,
};

const { swatchColor, swatchBorderColor, swatchStateColor } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  boxSizing: 'border-box',
  ...shorthands.border('none'),
  ...shorthands.padding(0),
  width: '28px',
  height: '28px',
  background: `var(${swatchColor})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  border: `1px solid var(${swatchBorderColor})`,
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px var(${swatchColor}), inset 0 0 0 4px var(${swatchStateColor})`,
  },
  ':hover:active': {
    boxShadow: `inset 0 0 0 3px var(${swatchColor}), inset 0 0 0 6px var(${swatchStateColor})`,
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

  ...createCustomFocusIndicatorStyle({
    border: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${swatchStateColor}
      inset
    `,
    borderRadius: tokens.borderRadiusNone,
  }),
});

const useIconStyles = makeResetStyles({});

const useStylesSelected = makeStyles({
  selected: {
    boxShadow: `inset 0 0 0 4px var(${swatchColor}), inset 0 0 0 6px var(${swatchStateColor})`,
    ':hover': {
      boxShadow: `inset 0 0 0 5px var(${swatchColor}), inset 0 0 0 7px var(${swatchStateColor})`,
    },
    ':hover:active': {
      boxShadow: `inset 0 0 0 6px var(${swatchColor}), inset 0 0 0 8px var(${swatchStateColor})`,
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
    ...shorthands.borderRadius('4px'),
  },
  circular: {
    ...shorthands.borderRadius('50%'),
  },
  square: {
    ...shorthands.borderRadius('0'),
  },
});

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
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

  if (state.icon) {
    state.icon.className = mergeClasses(colorSwatchClassNames.icon, iconStyles, state.icon.className);
  }

  if (state.selected) {
    state.root.className = mergeClasses(state.root.className, selectedStyles.selected);
  }
  return state;
};
