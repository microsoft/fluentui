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
    color: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2527, var(--semantic-token-TeachingPopoverCarouselFooterButton-2528, ${tokens.colorBrandForeground1}))`,
    backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2529, var(--semantic-token-TeachingPopoverCarouselFooterButton-2530, ${tokens.colorNeutralForegroundOnBrand}))`,
    ...shorthands.borderColor(tokens.colorTransparentBackground),
    ':hover': {
      color: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2531, var(--semantic-token-TeachingPopoverCarouselFooterButton-2532, ${tokens.colorCompoundBrandForeground1Hover}))`,
      backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2533, var(--semantic-token-TeachingPopoverCarouselFooterButton-2534, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
    ':hover:active': {
      color: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2535, var(--semantic-token-TeachingPopoverCarouselFooterButton-2536, ${tokens.colorCompoundBrandForeground1Pressed}))`,
      backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2537, var(--semantic-token-TeachingPopoverCarouselFooterButton-2538, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
  },
  brandPrevious: {
    // In brand, this is always 'NeutralForegroundOnBrand'
    color: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2539, var(--semantic-token-TeachingPopoverCarouselFooterButton-2540, ${tokens.colorNeutralForegroundOnBrand}))`,
    backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2541, var(--semantic-token-TeachingPopoverCarouselFooterButton-2542, ${tokens.colorBrandBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    ':hover': {
      color: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2543, var(--semantic-token-TeachingPopoverCarouselFooterButton-2544, ${tokens.colorNeutralForegroundOnBrand}))`,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2545, var(--semantic-token-TeachingPopoverCarouselFooterButton-2546, ${tokens.colorBrandBackgroundHover}))`,
    },
    ':hover:active': {
      color: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2547, var(--semantic-token-TeachingPopoverCarouselFooterButton-2548, ${tokens.colorNeutralForegroundOnBrand}))`,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselFooterButton-2549, var(--semantic-token-TeachingPopoverCarouselFooterButton-2550, ${tokens.colorBrandBackgroundPressed}))`,
    },
  },
});

/**
 * Apply styling to the TeachingPopoverCarouselFooterButton slots based on the state
 */
export const useTeachingPopoverCarouselFooterButtonStyles_unstable = (
  state: TeachingPopoverCarouselFooterButtonState,
): TeachingPopoverCarouselFooterButtonState => {
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
