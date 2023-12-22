import { makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  icon: 'fui-ColorSwatch__icon',
};

export const swatchCSSVars = {
  swatchColor: `--fui-SwatchPicker--color`,
};

const { swatchColor } = swatchCSSVars;

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  ...shorthands.border('none'),
  width: '28px',
  height: '28px',
  backgroundColor: `var(${swatchColor})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px var(${swatchColor}), inset 0 0 0 4px #fff`,
  },
});

const useIconStyles = makeResetStyles({});

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  state.root.className = mergeClasses(colorSwatchClassNames.root, styles, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(colorSwatchClassNames.icon, iconStyles, state.icon.className);
  }
  return state;
};
