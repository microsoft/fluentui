import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterButtonSlots,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import { tokens } from '@fluentui/react-theme';
import { useButtonStyles_unstable } from '@fluentui/react-button';

export const teachingPopoverCarouselFooterButtonClassNames: SlotClassNames<TeachingPopoverCarouselFooterButtonSlots> = {
  root: 'fui-TeachingPopoverCarouselFooterButton',
};

const useStyles = makeStyles({
  root: {
    minWidth: '96px',
  },
  brandNext: {
    color: `var(--2527, var(--2528, ${tokens.colorBrandForeground1}))`,
    backgroundColor: `var(--2529, var(--2530, ${tokens.colorNeutralForegroundOnBrand}))`,
    ...shorthands.borderColor(tokens.colorTransparentBackground),
    ':hover': {
      color: `var(--2531, var(--2532, ${tokens.colorCompoundBrandForeground1Hover}))`,
      backgroundColor: `var(--2533, var(--2534, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
    ':hover:active': {
      color: `var(--2535, var(--2536, ${tokens.colorCompoundBrandForeground1Pressed}))`,
      backgroundColor: `var(--2537, var(--2538, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
  },
  brandPrevious: {
    // In brand, this is always 'NeutralForegroundOnBrand'
    color: `var(--2539, var(--2540, ${tokens.colorNeutralForegroundOnBrand}))`,
    backgroundColor: `var(--2541, var(--2542, ${tokens.colorBrandBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    ':hover': {
      color: `var(--2543, var(--2544, ${tokens.colorNeutralForegroundOnBrand}))`,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: `var(--2545, var(--2546, ${tokens.colorBrandBackgroundHover}))`,
    },
    ':hover:active': {
      color: `var(--2547, var(--2548, ${tokens.colorNeutralForegroundOnBrand}))`,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: `var(--2549, var(--2550, ${tokens.colorBrandBackgroundPressed}))`,
    },
  },
});

/**
 * Apply styling to the TeachingPopoverCarouselFooterButton slots based on the state
 */
export const useTeachingPopoverCarouselFooterButtonStyles_unstable = (
  state: TeachingPopoverCarouselFooterButtonState,
): TeachingPopoverCarouselFooterButtonState => {
  'use no memo';

  const styles = useStyles();
  const { navType, popoverAppearance } = state;

  // Apply underlying fluent Button styles
  state = {
    ...state,
    ...useButtonStyles_unstable(state),
  };

  state.root.className = mergeClasses(
    teachingPopoverCarouselFooterButtonClassNames.root,
    styles.root,
    navType === 'prev' && popoverAppearance === 'brand' && styles.brandPrevious,
    navType === 'next' && popoverAppearance === 'brand' && styles.brandNext,
    state.root.className,
  );

  return state;
};
