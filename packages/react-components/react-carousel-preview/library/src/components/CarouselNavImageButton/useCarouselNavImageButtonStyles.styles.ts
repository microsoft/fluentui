import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonSlots, CarouselNavImageButtonState } from './CarouselNavImageButton.types';
import { tokens } from '@fluentui/react-theme';

export const carouselNavImageButtonClassNames: SlotClassNames<CarouselNavImageButtonSlots> = {
  root: 'fui-CarouselNavImageButton',
  image: 'fui-CarouselNavImageButton__image',
};

const imageButtonSize = 40;
const selectedImageButtonSize = 48;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    padding: '0px',
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    borderRadius: tokens.borderRadiusSmall,
    width: imageButtonSize + 'px',
    height: imageButtonSize + 'px',
    boxSizing: 'content-box',
    ':hover': {
      cursor: 'pointer',
    },
  },
  image: {
    width: imageButtonSize + 'px',
    height: imageButtonSize + 'px',
  },
  selected: {
    width: selectedImageButtonSize + 'px',
    height: selectedImageButtonSize + 'px',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the CarouselNavImageButton slots based on the state
 */
export const useCarouselNavImageButtonStyles_unstable = (
  state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
  'use no memo';

  const { selected } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselNavImageButtonClassNames.root,
    styles.root,
    selected && styles.selected,
    state.root.className,
  );

  if (state.image) {
    state.image.className = mergeClasses(
      carouselNavImageButtonClassNames.image,
      styles.image,
      selected && styles.selected,
      state.image?.className,
    );
  }

  return state;
};
