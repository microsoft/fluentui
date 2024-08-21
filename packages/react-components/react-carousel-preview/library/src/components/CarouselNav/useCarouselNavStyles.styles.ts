import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavSlots, CarouselNavState } from './CarouselNav.types';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const carouselNavClassNames: SlotClassNames<CarouselNavSlots> = {
  root: 'fui-CarouselNav',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--773, var(--774, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
    borderRadius: `var(--775, var(--776, ${tokens.borderRadiusXLarge}))`,
    margin: `auto ${tokens.spacingHorizontalS}`,
    backgroundColor: `var(--779, var(--780, ${tokens.colorNeutralBackgroundAlpha}))`,
  },
});

/**
 * Apply styling to the CarouselNav slots based on the state
 */
export const useCarouselNavStyles_unstable = (state: CarouselNavState): CarouselNavState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselNavClassNames.root, styles.root, state.root.className);

  return state;
};
