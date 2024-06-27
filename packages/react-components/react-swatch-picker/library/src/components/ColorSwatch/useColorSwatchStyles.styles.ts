import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  icon: 'fui-ColorSwatch__icon',
  disabledIcon: 'fui-ColorSwatch__disabledIcon',
};

export const swatchCSSVars = {
  color: `--fui-SwatchPicker--color`,
  borderColor: `--fui-SwatchPicker--borderColor`,
};

const { color, borderColor } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  border: `1px solid var(${borderColor})`,
  background: `var(${color})`,
  overflow: 'hidden',
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

const useStyles = makeStyles({
  disabled: {
    ':hover': {
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  },
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

const useIconStyles = makeStyles({
  disabledIcon: {
    color: tokens.colorNeutralForegroundInverted,
    filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 1))',
  },
  icon: {
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
  },
  'extra-small': {
    fontSize: '16px',
  },
  small: {
    fontSize: '16px',
  },
  medium: {
    fontSize: '20px',
  },
  large: {
    fontSize: '24px',
  },
});

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  'use no memo';

  const resetStyles = useResetStyles();
  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const shapeStyles = useShapeStyles();
  const iconStyles = useIconStyles();

  const { size = 'medium', shape = 'square' } = state;

  state.root.className = mergeClasses(
    colorSwatchClassNames.root,
    resetStyles,
    sizeStyles[size],
    shapeStyles[shape],
    state.selected && styles.selected,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.disabled && state.disabledIcon) {
    state.disabledIcon.className = mergeClasses(
      iconStyles.icon,
      iconStyles[size],
      iconStyles.disabledIcon,
      state.disabledIcon.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.icon, iconStyles[size], state.icon.className);
  }

  return state;
};
