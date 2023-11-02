import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { TeachingBubbleButtonState } from './TeachingBubbleButton.types';
import { makeStyles, mergeClasses } from '@griffel/react';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { tokens } from '@fluentui/react-theme';
import { useTeachingBubbleContext_unstable } from '../../teachingBubbleContext';

const useStyles = makeStyles({
  brandPrimary: {
    borderBlockColor: tokens.colorNeutralForegroundOnBrand,
    borderInlineColor: tokens.colorNeutralForegroundOnBrand,
  },
  brandPrimaryCarousel: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
    borderBlockColor: tokens.colorTransparentBackground,
    borderInlineColor: tokens.colorTransparentBackground,
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
  },
  brandSecondary: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
  },
  brandSecondaryCarousel: {
    // In brand, this is always 'NeutralForegroundOnBrand'
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    borderBlockColor: tokens.colorNeutralForegroundOnBrand,
    borderInlineColor: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      color: tokens.colorNeutralForegroundOnBrand,
      borderBlockColor: tokens.colorNeutralForegroundOnBrand,
      borderInlineColor: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ':hover:active': {
      color: tokens.colorNeutralForegroundOnBrand,
      borderBlockColor: tokens.colorNeutralForegroundOnBrand,
      borderInlineColor: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackgroundPressed,
    },
  },
});

export const useTeachingBubbleButtonStyles_unstable = (state: TeachingBubbleButtonState): TeachingBubbleButtonState => {
  const appearance = usePopoverContext_unstable(context => context.appearance);
  const totalPages = useTeachingBubbleContext_unstable(context => context.totalPages);
  const isCarousel = totalPages > 1;
  const styles = useStyles();

  useButtonStyles_unstable(state);
  if (state.buttonType === 'primary') {
    if (appearance === 'brand') {
      state.root.className = mergeClasses(
        state.root.className,
        isCarousel ? styles.brandPrimaryCarousel : styles.brandPrimary,
      );
    }
  } else {
    if (appearance === 'brand') {
      state.root.className = mergeClasses(
        state.root.className,
        isCarousel ? styles.brandSecondaryCarousel : styles.brandSecondary,
      );
    }
  }
  return state;
};
