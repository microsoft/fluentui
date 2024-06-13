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
    columnGap: `var(--ctrl-token-CarouselNav-771, var(--semantic-token-CarouselNav-772, ${tokens.spacingHorizontalXS}))`,
    alignItems: 'center',
    justifyContent: 'center',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--ctrl-token-CarouselNav-773, var(--semantic-token-CarouselNav-774, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
    borderRadius: `var(--ctrl-token-CarouselNav-775, var(--semantic-token-CarouselNav-776, ${tokens.borderRadiusXLarge}))`,
    margin: `auto ${tokens.spacingHorizontalS}`,
    padding: `var(--ctrl-token-CarouselNav-777, var(--semantic-token-CarouselNav-778, ${tokens.spacingHorizontalXS}))`,
    backgroundColor: `var(--ctrl-token-CarouselNav-779, var(--semantic-token-CarouselNav-780, ${tokens.colorNeutralBackgroundAlpha}))`,
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
