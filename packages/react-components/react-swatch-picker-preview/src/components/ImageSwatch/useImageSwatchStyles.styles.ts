import { makeStyles, mergeClasses, makeResetStyles, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ImageSwatchSlots, ImageSwatchState } from './ImageSwatch.types';

export const imageSwatchClassNames: SlotClassNames<ImageSwatchSlots> = {
  root: 'fui-ImageSwatch',
  icon: 'fui-ImageSwatch__icon',
};

export const imageCSSVars = {
  swatchImage: `--fui-SwatchPicker--image`,
};

const { swatchImage } = imageCSSVars;
/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  ...shorthands.border('none'),
  width: '28px',
  height: '28px',
  background: `var(${swatchImage})`,
  backgroundSize: 'contain',
  ...shorthands.transition('all', '0.1s', 'ease-in-out'),
  '&:hover': {
    cursor: 'pointer',
    boxShadow: `inset 0 0 0 2px #fff, inset 0 0 0 4px #fff`,
  },
});

const useIconStyles = makeResetStyles({});

const useStylesSelected = makeStyles({
  selected: {
    boxShadow: `inset 0 0 0 4px #fff, inset 0 0 0 6px #fff`,
  },
});

/**
 * Apply styling to the ImageSwatch slots based on the state
 */
export const useImageSwatchStyles_unstable = (state: ImageSwatchState): ImageSwatchState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const selectedStyles = useStylesSelected();
  state.root.className = mergeClasses(imageSwatchClassNames.root, styles, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(imageSwatchClassNames.icon, iconStyles, state.icon.className);
  }

  if (state.selected) {
    state.root.className = mergeClasses(state.root.className, selectedStyles.selected);
  }
  return state;
};
