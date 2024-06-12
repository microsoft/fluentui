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
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXS}`,
    boxSizing: 'content-box',
    backgroundColor: `var(--781, var(--782, ${tokens.colorNeutralForeground1}))`,
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
      borderRadius: `var(--783, var(--784, ${tokens.borderRadiusMedium}))`,
      margin: `calc(-1 * ${tokens.strokeWidthThick})`,
    }),
    '::after': {
      opacity: 0.3,
    },
  },
  rootSelected: {
    width: '16px',
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      border: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      margin: `calc(-1 * ${tokens.strokeWidthThick})`,
      borderRadius: `var(--787, var(--788, ${tokens.borderRadiusMedium}))`,
    }),
    '::after': {
      width: '16px',
      borderRadius: '4px',
    },
  },
});

/**
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  'use no memo';

  const styles = useStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    carouselNavButtonClassNames.root,
    styles.root,
    selected ? styles.rootSelected : styles.rootUnselected,
    state.root.className,
  );

  return state;
};
