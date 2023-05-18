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

/**
 * Base styles shared by Tag/TagButton
 */
export const useTagBaseStyles = makeStyles({
  media: {
    ...shorthands.gridArea('media'),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalS,
  },
  icon: {
    ...shorthands.gridArea('media'),
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalXXS,
  },
  primaryText: {
    gridColumnStart: 'primary',
    gridRowStart: 'primary',
    gridRowEnd: 'secondary',
    ...typographyStyles.body1,
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
    whiteSpace: 'nowrap',
  },
  primaryTextWithSecondaryText: {
    ...shorthands.gridArea('primary'),
    ...typographyStyles.caption1,
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
    paddingLeft: tokens.spacingHorizontalS,
  },
  rootWithoutDismiss: {
    paddingRight: tokens.spacingHorizontalS,
  },

  dismissIcon: {
    ...shorthands.gridArea('dismissIcon'),
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalSNudge,
  },

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

const useSmallTagStyles = makeStyles({
  root: {
    height: '24px',
  },
  dismissIcon: {
    fontSize: '16px',
  },
  primaryText: typographyStyles.caption1,
});

const useExtraSmallTagStyles = makeStyles({
  root: {
    height: '20px',
  },
  rootWithoutMedia: {
    paddingLeft: tokens.spacingHorizontalSNudge,
  },
  rootWithoutDismiss: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  icon: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  dismissIcon: {
    fontSize: '12px',
    paddingRight: tokens.spacingHorizontalXS,
  },
  primaryText: typographyStyles.caption1,
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const baseStyles = useTagBaseStyles();
  const resetButtonStyles = useResetButtonStyles();
  const styles = useTagStyles();

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
    state.size === 'extra-small' && !state.media && !state.icon && extraSmallStyles.rootWithoutMedia,
    state.size === 'extra-small' && !state.dismissIcon && extraSmallStyles.rootWithoutDismiss,

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(tagClassNames.media, baseStyles.media, state.media.className);
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      tagClassNames.icon,
      baseStyles.icon,
      state.size === 'extra-small' && extraSmallStyles.icon,
      state.icon.className,
    );
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,
      baseStyles.primaryText,
      state.secondaryText && baseStyles.primaryTextWithSecondaryText,

      state.size === 'small' && smallStyles.primaryText,
      state.size === 'extra-small' && extraSmallStyles.primaryText,

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

      state.size === 'small' && smallStyles.dismissIcon,
      state.size === 'extra-small' && extraSmallStyles.dismissIcon,

      state.dismissIcon.className,
    );
  }

  return state;
};
