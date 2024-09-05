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
    cursor: 'pointer',
    width: tokens.spacingHorizontalS,
    height: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    boxSizing: 'content-box',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderWidth(0),
    '::after': {
      content: '""',
      display: 'block',
      boxSizing: 'border-box',
      borderRadius: '50%',
      border: 'none',
      height: tokens.spacingVerticalS,
      width: tokens.spacingHorizontalS,
      backgroundColor: tokens.colorNeutralForeground1,
      color: tokens.colorNeutralForeground1,
    },
  },
  rootUnselected: {
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      border: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      margin: `calc(-1 * ${tokens.strokeWidthThick})`,
      borderRadius: tokens.borderRadiusMedium,
    }),
    '::after': {
      opacity: 0.65,
    },
    ':hover': {
      '::after': {
        opacity: 0.75,
      },
    },
    ':active': {
      '::after': {
        opacity: 1,
      },
    },
  },
  rootSelected: {
    width: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXS}`,
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      border: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      margin: `calc(-1 * ${tokens.strokeWidthThick})`,
      borderRadius: tokens.borderRadiusMedium,
    }),
    '::after': {
      width: tokens.spacingHorizontalL,
      borderRadius: '4px',
    },
    ':hover': {
      '::after': {
        opacity: 0.75,
      },
    },
    ':active': {
      '::after': {
        opacity: 0.65,
      },
    },
  },
  brand: {
    '::after': {
      backgroundColor: tokens.colorBrandBackground,
      opacity: 1,
    },
    ':hover': {
      '::after': {
        backgroundColor: tokens.colorBrandBackgroundHover,
        opacity: 1,
      },
    },
    ':active': {
      '::after': {
        backgroundColor: tokens.colorBrandBackgroundPressed,
        opacity: 1,
      },
    },
  },
  unselectedBrand: {
    '::after': {
      opacity: 0.6,
    },
  },
});

/**
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  'use no memo';

  const styles = useStyles();

  const { selected, appearance } = state;

  state.root.className = mergeClasses(
    carouselNavButtonClassNames.root,
    styles.root,
    selected ? styles.rootSelected : styles.rootUnselected,
    appearance === 'brand' && styles.brand,
    !selected && appearance === 'brand' && styles.unselectedBrand,
    state.root.className,
  );

  return state;
};
