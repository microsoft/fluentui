import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';

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
  width: '28px',
  height: '28px',
  background: `var(${swatchColor})`,
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  border: `1px solid var(${swatchBorderColor})`,
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px var(${swatchColor}), inset 0 0 0 4px var(${swatchStateColor})`,
  },
});

const useIconStyles = makeResetStyles({});

const useStylesSelected = makeStyles({
  selected: {
    boxShadow: `inset 0 0 0 4px var(${swatchColor}), inset 0 0 0 6px var(${swatchStateColor})`,
  },
});

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const selectedStyles = useStylesSelected();
  state.root.className = mergeClasses(colorSwatchClassNames.root, styles, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(colorSwatchClassNames.icon, iconStyles, state.icon.className);
  }

  if (state.selected) {
    state.root.className = mergeClasses(state.root.className, selectedStyles.selected);
  }
  return state;
};
