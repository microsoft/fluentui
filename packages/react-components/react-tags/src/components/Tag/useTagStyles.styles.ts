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
    alignSelf: 'center',
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalS,
  },
  icon: {
    ...shorthands.gridArea('media'),
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: '6px',
    paddingRight: '2px',
  },
  primaryText: {
    gridColumnStart: 'primary',
    gridRowStart: 'primary',
    gridRowEnd: 'secondary',
    ...typographyStyles.body1,
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
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
    paddingLeft: '2px',
    paddingRight: '6px',
  },

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

const useSmallTagStyles = makeStyles({
  root: {
    height: '24px',
  },
  // TODO add additional styles for sizes
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const baseStyles = useTagBaseStyles();
  const resetButtonStyles = useResetButtonStyles();
  const styles = useTagStyles();
  const smallStyles = useSmallTagStyles();

  state.root.className = mergeClasses(
    tagClassNames.root,
    resetButtonStyles.resetButton,

    styles.root,
    state.shape === 'circular' && styles.rootCircular,
    !state.media && !state.icon && styles.rootWithoutMedia,
    !state.dismissIcon && styles.rootWithoutDismiss,

    state.size === 'small' && smallStyles.root,

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(tagClassNames.media, baseStyles.media, state.media.className);
  }
  if (state.icon) {
    state.icon.className = mergeClasses(tagClassNames.icon, baseStyles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,
      baseStyles.primaryText,
      state.secondaryText && baseStyles.primaryTextWithSecondaryText,
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
      state.dismissIcon.className,
    );
  }

  return state;
};
