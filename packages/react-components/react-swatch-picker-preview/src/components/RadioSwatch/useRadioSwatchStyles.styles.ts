import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioSwatchSlots, RadioSwatchState } from './RadioSwatch.types';
import { useRadioStyles_unstable, RadioState } from '@fluentui/react-radio';

export const radioSwatchClassNames: SlotClassNames<RadioSwatchSlots> = {
  root: 'fui-RadioSwatch',
  input: 'fui-RadioSwatch__input',
  icon: 'fui-RadioSwatch__icon',
};

export const radioCSSVars = {
  swatchColor: `--fui-SwatchPicker--color`,
};

const { swatchColor } = radioCSSVars;

const useInputBaseClassName = makeStyles({
  input: {
    width: '100%',
    height: '100%',
    opacity: 0,
  },

  // ':enabled': {
  //   cursor: 'pointer',
  //   [`& ~ .${radioClassNames.label}`]: {
  //     cursor: 'pointer',
  //   },
  // },

  // // When unchecked, hide the circle icon (child of the indicator)
  // [`:not(:checked) ~ .${radioClassNames.indicator} > *`]: {
  //   opacity: '0',
  // },

  // // Colors for the unchecked state
  // ':enabled:not(:checked)': {
  //   [`& ~ .${radioClassNames.label}`]: {
  //     color: tokens.colorNeutralForeground3,
  //   },
  //   [`& ~ .${radioClassNames.indicator}`]: {
  //     borderColor: tokens.colorNeutralStrokeAccessible,
  //   },

  //   ':hover': {
  //     [`& ~ .${radioClassNames.label}`]: {
  //       color: tokens.colorNeutralForeground2,
  //     },
  //     [`& ~ .${radioClassNames.indicator}`]: {
  //       borderColor: tokens.colorNeutralStrokeAccessibleHover,
  //     },
  //   },

  //   ':hover:active': {
  //     [`& ~ .${radioClassNames.label}`]: {
  //       color: tokens.colorNeutralForeground1,
  //     },
  //     [`& ~ .${radioClassNames.indicator}`]: {
  //       borderColor: tokens.colorNeutralStrokeAccessiblePressed,
  //     },
  //   },
  // },

  // // Colors for the checked state
  // ':enabled:checked': {
  //   [`& ~ .${radioClassNames.label}`]: {
  //     color: tokens.colorNeutralForeground1,
  //   },
  //   [`& ~ .${radioClassNames.indicator}`]: {
  //     borderColor: tokens.colorCompoundBrandStroke,
  //     color: tokens.colorCompoundBrandForeground1,
  //   },

  //   ':hover': {
  //     [`& ~ .${radioClassNames.indicator}`]: {
  //       borderColor: tokens.colorCompoundBrandStrokeHover,
  //       color: tokens.colorCompoundBrandForeground1Hover,
  //     },
  //   },

  //   ':hover:active': {
  //     [`& ~ .${radioClassNames.indicator}`]: {
  //       borderColor: tokens.colorCompoundBrandStrokePressed,
  //       color: tokens.colorCompoundBrandForeground1Pressed,
  //     },
  //   },
  // },

  // // Colors for the disabled state
  // ':disabled': {
  //   [`& ~ .${radioClassNames.label}`]: {
  //     color: tokens.colorNeutralForegroundDisabled,
  //     cursor: 'default',
  //   },
  //   [`& ~ .${radioClassNames.indicator}`]: {
  //     borderColor: tokens.colorNeutralStrokeDisabled,
  //     color: tokens.colorNeutralForegroundDisabled,
  //   },
  // },
});

/**
 * Styles for the root slot
 */
const useBaseStyles = makeResetStyles({
  background: `var(${swatchColor})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px var(${swatchColor}), inset 0 0 0 4px #fff`,
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

// const useIconStyles = makeResetStyles({});

/**
 * Apply styling to the RadioSwatch slots based on the state
 */
export const useRadioSwatchStyles_unstable = (state: RadioSwatchState): RadioSwatchState => {
  const styles = useBaseStyles();
  const sizeStyles = useSizeStyles();
  const shapeStyles = useShapeStyles();
  const inputBaseClassName = useInputBaseClassName();

  // const iconStyles = useIconStyles();
  state.root.className = mergeClasses(
    radioSwatchClassNames.root,
    styles,
    sizeStyles[state.size ?? 'medium'],
    shapeStyles[state.shape ?? 'square'],
    state.root.className,
  );

  state.input.className = mergeClasses(
    inputBaseClassName.input,
    // inputBaseClassName,
    state.input.className,
  );
  // if (state.icon) {
  //   state.icon.className = mergeClasses(radioSwatchClassNames.icon, iconStyles, state.icon.className);
  // }

  return state;
};
