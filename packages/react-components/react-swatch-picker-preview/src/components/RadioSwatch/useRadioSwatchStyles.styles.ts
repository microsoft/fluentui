import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioSwatchSlots, RadioSwatchState } from './RadioSwatch.types';

export const radioSwatchClassNames: SlotClassNames<RadioSwatchSlots> = {
  root: 'fui-RadioSwatch',
  // icon: 'fui-RadioSwatch__icon',
};

export const radioCSSVars = {
  swatchColor: `--fui-SwatchPicker--color`,
};

const { swatchColor } = radioCSSVars;

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

  // const iconStyles = useIconStyles();
  state.root.className = mergeClasses(
    radioSwatchClassNames.root,
    styles,
    sizeStyles[state.size ?? 'medium'],
    shapeStyles[state.shape ?? 'square'],
    state.root.className,
  );

  // if (state.icon) {
  //   state.icon.className = mergeClasses(radioSwatchClassNames.icon, iconStyles, state.icon.className);
  // }

  return state;
};
