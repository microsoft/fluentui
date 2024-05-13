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
    columnGap: tokens.spacingHorizontalXS,
    alignItems: 'center',
    justifyContent: 'center',
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.borderColor('transparent'),
    }),
  },
});

/**
 * Apply styling to the CarouselNav slots based on the state
 */
export const useCarouselNavStyles_unstable = (state: CarouselNavState): CarouselNavState => {
  const styles = useStyles();
  state.root.className = mergeClasses(carouselNavClassNames.root, styles.root, state.root.className);

  return state;
};
