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
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorTransparentBackground),
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
  },
  brandPrevious: {
    // In brand, this is always 'NeutralForegroundOnBrand'
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    ':hover': {
      color: tokens.colorNeutralForegroundOnBrand,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ':hover:active': {
      color: tokens.colorNeutralForegroundOnBrand,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: tokens.colorBrandBackgroundPressed,
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
