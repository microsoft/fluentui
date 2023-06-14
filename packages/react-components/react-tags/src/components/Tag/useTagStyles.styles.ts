import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  media: 'fui-Tag__media',
  icon: 'fui-Tag__icon',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
  dismissIcon: 'fui-Tag__dismissIcon',
};

export const tagSpacingMedium = '7px';
export const tagSpacingSmall = '5px';

/**
 * Base styles shared by Tag/TagButton
 */
export const useTagBaseStyles = makeStyles({
  media: {
    ...shorthands.gridArea('media'),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1px',
    paddingRight: tokens.spacingHorizontalS,
  },
  icon: {
    ...shorthands.gridArea('media'),
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: tagSpacingMedium,
    paddingRight: tokens.spacingHorizontalXS,
    width: '20px',
    fontSize: '20px',
  },
  primaryText: {
    gridColumnStart: 'primary',
    gridRowStart: 'primary',
    gridRowEnd: 'secondary',
    ...typographyStyles.body1,
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
    whiteSpace: 'nowrap',
    paddingBottom: tokens.spacingHorizontalXXS,
  },
  primaryTextWithSecondaryText: {
    ...shorthands.gridArea('primary'),
    ...typographyStyles.caption1,
    paddingBottom: tokens.spacingHorizontalNone,
    marginTop: '-2px',
  },
  secondaryText: {
    ...shorthands.gridArea('secondary'),
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
    ...typographyStyles.caption2,
    whiteSpace: 'nowrap',
  },
});

export const useResetButtonStyles = makeStyles({
  resetButton: {
    color: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    appearance: 'button',
    textAlign: 'unset',
    backgroundColor: 'transparent',
  },
});

const useTagStyles = makeStyles({
  root: {
    // TODO use makeResetStyle when styles are settled
    display: 'inline-grid',
    alignItems: 'center',
    gridTemplateRows: '1fr auto auto 1fr',
    gridTemplateAreas: `
    "media .         dismissIcon"
    "media primary   dismissIcon"
    "media secondary dismissIcon"
    "media .         dismissIcon"
    `,

    boxSizing: 'border-box',
    height: '32px',
    width: 'fit-content',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),

    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      },
      { enableOutline: true },
    ),

    ':hover': {
      cursor: 'pointer',
    },
  },
  rootCircular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
    }),
  },
  rootWithoutMedia: {
    paddingLeft: tagSpacingMedium,
  },
  rootWithoutDismiss: {
    paddingRight: tagSpacingMedium,
  },

  dismissIcon: {
    ...shorthands.gridArea('dismissIcon'),
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tagSpacingMedium,
  },

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

const useSharedSmallTagStyles = makeStyles({
  rootWithoutMedia: {
    paddingLeft: tagSpacingSmall,
  },
  rootWithoutDismiss: {
    paddingRight: tagSpacingSmall,
  },

  media: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  icon: {
    paddingLeft: tagSpacingSmall,
    paddingRight: tokens.spacingHorizontalXXS,
  },
  dismissIcon: {
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tagSpacingSmall,
  },
  primaryText: typographyStyles.caption1,
});

const useSmallTagStyles = makeStyles({
  root: {
    height: '24px',
  },
  icon: {
    width: '16px',
    fontSize: '16px',
  },
  dismissIcon: {
    fontSize: '16px',
  },
});

const useExtraSmallTagStyles = makeStyles({
  root: {
    height: '20px',
  },
  icon: {
    width: '12px',
    fontSize: '12px',
  },
  dismissIcon: {
    fontSize: '12px',
  },
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const baseStyles = useTagBaseStyles();
  const resetButtonStyles = useResetButtonStyles();
  const styles = useTagStyles();

  const sharedSmallStyles = useSharedSmallTagStyles();
  const smallStyles = useSmallTagStyles();
  const extraSmallStyles = useExtraSmallTagStyles();

  state.root.className = mergeClasses(
    tagClassNames.root,
    resetButtonStyles.resetButton,

    styles.root,
    state.shape === 'circular' && styles.rootCircular,
    !state.media && !state.icon && styles.rootWithoutMedia,
    !state.dismissIcon && styles.rootWithoutDismiss,

    state.size === 'small' && smallStyles.root,
    state.size === 'extra-small' && extraSmallStyles.root,

    (state.size === 'small' || state.size === 'extra-small') &&
      !state.media &&
      !state.icon &&
      sharedSmallStyles.rootWithoutMedia,
    (state.size === 'small' || state.size === 'extra-small') &&
      !state.dismissIcon &&
      sharedSmallStyles.rootWithoutDismiss,

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(
      tagClassNames.media,
      baseStyles.media,
      (state.size === 'small' || state.size === 'extra-small') && sharedSmallStyles.media,
      state.media.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      tagClassNames.icon,
      baseStyles.icon,
      (state.size === 'small' || state.size === 'extra-small') && sharedSmallStyles.icon,
      state.size === 'small' && smallStyles.icon,
      state.size === 'extra-small' && extraSmallStyles.icon,
      state.icon.className,
    );
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,
      baseStyles.primaryText,
      state.secondaryText && baseStyles.primaryTextWithSecondaryText,

      (state.size === 'small' || state.size === 'extra-small') && sharedSmallStyles.primaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagClassNames.secondaryText,
      baseStyles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissIcon) {
    state.dismissIcon.className = mergeClasses(
      tagClassNames.dismissIcon,
      styles.dismissIcon,

      (state.size === 'small' || state.size === 'extra-small') && sharedSmallStyles.dismissIcon,
      state.size === 'small' && smallStyles.dismissIcon,
      state.size === 'extra-small' && extraSmallStyles.dismissIcon,

      state.dismissIcon.className,
    );
  }

  return state;
};
