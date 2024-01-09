import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { TeachingPopoverButtonSlots, TeachingPopoverButtonState } from './TeachingPopoverButton.types';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverButtonClassNames: SlotClassNames<TeachingPopoverButtonSlots> = {
  root: 'fui-TeachingPopoverButton',
  icon: 'fui-TeachingPopoverButton__icon',
};

const useStyles = makeStyles({
  brandPrimary: {
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
  },
  brandPrimaryCarousel: {
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

export const useTeachingPopoverButtonStyles_unstable = (
  state: TeachingPopoverButtonState,
): TeachingPopoverButtonState => {
  const { popoverAppearance, totalPages } = state;

  const isCarousel = totalPages > 1;
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverButtonClassNames.root, state.root.className);
  if (state.icon) {
    state.icon.className = mergeClasses(teachingPopoverButtonClassNames.icon, state.icon.className);
  }

  useButtonStyles_unstable(state);
  if (state.buttonType === 'primary') {
    if (popoverAppearance === 'brand') {
      state.root.className = mergeClasses(
        state.root.className,
        isCarousel ? styles.brandPrimaryCarousel : styles.brandPrimary,
      );
    }
  } else {
    if (popoverAppearance === 'brand') {
      state.root.className = mergeClasses(
        state.root.className,
        isCarousel ? styles.brandSecondaryCarousel : styles.brandSecondary,
      );
    }
  }
  return state;
};
