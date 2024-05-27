import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavButtonSlots, CarouselNavButtonState } from './CarouselNavButton.types';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const carouselNavButtonClassNames: SlotClassNames<CarouselNavButtonSlots> = {
  root: 'fui-CarouselNavButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    cursor: 'pointer',
    boxSizing: 'border-box',
    height: '8px',
    width: '8px',
    backgroundColor: tokens.colorBrandBackground,
  },
  rootUnselected: {
    border: 'none',
    borderRadius: '50%',
    padding: '0px',
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
    backgroundColor: `color-mix(in srgb, ${tokens.colorBrandBackground} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
  rootSelected: {
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    width: '16px',
    border: 'none',
    borderRadius: '4px',
    padding: '0px',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
  },
});

/**
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  const styles = useStyles();

  const { isSelected } = state;

  state.root.className = mergeClasses(
    carouselNavButtonClassNames.root,
    styles.root,
    isSelected ? styles.rootSelected : styles.rootUnselected,
    state.root.className,
  );

  return state;
};
