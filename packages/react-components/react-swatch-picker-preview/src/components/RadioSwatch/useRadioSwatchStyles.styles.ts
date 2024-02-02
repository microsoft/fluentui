import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioSwatchSlots, RadioSwatchState } from './RadioSwatch.types';
import { createFocusOutlineStyle, createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const radioSwatchClassNames: SlotClassNames<RadioSwatchSlots> = {
  root: 'fui-RadioSwatch',
  input: 'fui-RadioSwatch__input',
  icon: 'fui-RadioSwatch__icon',
  swatch: 'fui-RadioSwatch__swatch',
};

export const radioCSSVars = {
  swatchColor: `--fui-SwatchPicker--color`,
  stateColor: `--fui-SwatchPicker--stateColor`,
  borderColor: `--fui-SwatchPicker--borderColor`,
};

const { swatchColor, stateColor, borderColor } = radioCSSVars;

const useInputBaseClassName = makeResetStyles({
  position: 'relative',
  opacity: 0,
  boxSizing: 'border-box',
  ...shorthands.margin(0),
  ':enabled': {
    cursor: 'pointer',
  },
  ':enabled:not(:checked)': {
    ':hover': {
      [`& ~ .${radioSwatchClassNames.swatch}`]: {
        boxShadow: `inset 0 0 0 2px var(${swatchColor}), inset 0 0 0 4px var(${stateColor})`,
      },
    },
    ':hover:active': {
      [`& ~ .${radioSwatchClassNames.swatch}`]: {
        boxShadow: `inset 0 0 0 3px var(${swatchColor}), inset 0 0 0 6px var(${stateColor})`,
      },
    },
  },
  ':enabled:checked': {
    [`& ~ .${radioSwatchClassNames.swatch}`]: {
      boxShadow: `inset 0 0 0 4px var(${swatchColor}), inset 0 0 0 6px var(${stateColor})`,
    },
    ':hover': {
      [`& ~ .${radioSwatchClassNames.swatch}`]: {
        boxShadow: `inset 0 0 0 5px var(${swatchColor}), inset 0 0 0 7px var(${stateColor})`,
      },
    },
    ':hover:active': {
      [`& ~ .${radioSwatchClassNames.swatch}`]: {
        boxShadow: `inset 0 0 0 6px var(${swatchColor}), inset 0 0 0 8px var(${stateColor})`,
      },
    },
  },
  ':focus': {
    [`& ~ .${radioSwatchClassNames.swatch}`]: {
      // boxShadow: `inset 0 0 0 2px var(${stateColor})`,
      boxShadow: `inset 0 0 0 2px #fff`,
    },
  },
  ':focus-within': {
    [`& ~ .${radioSwatchClassNames.swatch}`]: {
      // boxShadow: `inset 0 0 0 2px var(${stateColor})`,
      boxShadow: `inset 0 0 0 2px #fff`,
    },
  },
  ':focus-visible': {
    [`& ~ .${radioSwatchClassNames.swatch}`]: {
      // boxShadow: `inset 0 0 0 2px var(${stateColor})`,
      boxShadow: `inset 0 0 0 2px #fff`,
    },
  },
  ':disabled': {
    // [`& ~ .${radioClassNames.indicator}`]: {
    //   borderColor: tokens.colorNeutralStrokeDisabled,
    //   color: tokens.colorNeutralForegroundDisabled,
    // },
  },
  // TODO add focus color
  // ...createCustomFocusIndicatorStyle({
  //   borderColor: tokens.colorStrokeFocus2,
  //   borderRadius: tokens.borderRadiusMedium,
  //   borderWidth: '1px',
  //   outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
  //   boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2}
  //     inset
  //   `,
  //   zIndex: 1,
  // }),
});

const useSwatchBaseClassName = makeResetStyles({
  position: 'absolute',
  top: 0,
  left: 0,
  background: `var(${swatchColor})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  pointerEvents: 'none',
  boxSizing: 'border-box',
  border: `1px solid var(${borderColor})`,
});

/**
 * Styles for the root slot
 */
const useBaseStyles = makeResetStyles({
  position: 'relative',
  boxSizing: 'border-box',
  // ...createCustomFocusIndicatorStyle({
  //   borderColor: tokens.colorStrokeFocus2,
  //   borderRadius: tokens.borderRadiusMedium,
  //   borderWidth: '1px',
  //   outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
  //   boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2}
  //     inset
  //   `,
  //   zIndex: 1,
  // }),
  ...createFocusOutlineStyle({
    style: {
      outlineRadius: 'none',
    },
    selector: 'focus-within',
  }),
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

const useIconStyles = makeResetStyles({});

/**
 * Apply styling to the RadioSwatch slots based on the state
 */
export const useRadioSwatchStyles_unstable = (state: RadioSwatchState): RadioSwatchState => {
  const baseStyles = useBaseStyles();
  const sizeStyles = useSizeStyles();
  const shapeStyles = useShapeStyles();
  const inputBaseClassName = useInputBaseClassName();
  const swatchBaseClassName = useSwatchBaseClassName();

  const iconStyles = useIconStyles();

  state.root.className = mergeClasses(
    radioSwatchClassNames.root,
    baseStyles,
    sizeStyles[state.size ?? 'medium'],
    state.root.className,
  );

  state.input.className = mergeClasses(
    radioSwatchClassNames.input,
    inputBaseClassName,
    sizeStyles[state.size ?? 'medium'],
    state.input.className,
  );

  if (state.swatch) {
    state.swatch.className = mergeClasses(
      radioSwatchClassNames.swatch,
      swatchBaseClassName,
      sizeStyles[state.size ?? 'medium'],
      shapeStyles[state.shape ?? 'square'],
      state.swatch.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(radioSwatchClassNames.icon, iconStyles, state.icon.className);
  }

  return state;
};
