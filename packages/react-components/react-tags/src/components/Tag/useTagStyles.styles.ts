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
 * Inner horizontal space left and right of Tag
 */
const tagSpacingMedium = '7px';
const tagSpacingSmall = '5px';
const tagSpacingExtraSmall = '5px';

const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

const useRootStyles = makeStyles({
  base: {
    // TODO use makeResetStyle when styles are settled

    // reset default button style:
    fontFamily: 'inherit',
    ...shorthands.padding(0),
    appearance: 'button',
    textAlign: 'unset',

    display: 'inline-grid',
    alignItems: 'center',
    gridTemplateAreas: `
    "media primary   dismissIcon"
    "media secondary dismissIcon"
    `,
    boxSizing: 'border-box',
    width: 'fit-content',

    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
  },

  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':hover': {
      cursor: 'pointer',
      [`& .${tagClassNames.dismissIcon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${tagClassNames.dismissIcon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      [`& .${tagClassNames.dismissIcon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${tagClassNames.dismissIcon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ':hover': {
      cursor: 'pointer',
      [`& .${tagClassNames.dismissIcon}`]: {
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
    ':hover:active': {
      [`& .${tagClassNames.dismissIcon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },

  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    }),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    }),
  },

  medium: {
    height: '32px',
  },
  small: {
    height: '24px',
  },
  'extra-small': {
    height: '20px',
  },
});

const useRootDisabledStyles = makeStyles({
  filled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
});

/**
 * Styles for root slot when Tag is without leading media/icon
 */
const useRootWithoutMediaStyles = makeStyles({
  medium: {
    paddingLeft: tagSpacingMedium,
  },
  small: {
    paddingLeft: tagSpacingSmall,
  },
  'extra-small': {
    paddingLeft: tagSpacingExtraSmall,
  },
});
/**
 * Styles for root slot when Tag is without dismiss icon
 */
const useRootWithoutDismissStyles = makeStyles({
  medium: {
    paddingRight: tagSpacingMedium,
  },
  small: {
    paddingRight: tagSpacingSmall,
  },
  'extra-small': {
    paddingRight: tagSpacingExtraSmall,
  },
});

export const useIconStyles = makeStyles({
  base: {
    ...shorthands.gridArea('media'),
    display: 'flex',
  },
  medium: {
    paddingLeft: tagSpacingMedium,
    paddingRight: tokens.spacingHorizontalXS,
    width: mediumIconSize,
    fontSize: mediumIconSize,
  },
  small: {
    paddingLeft: tagSpacingSmall,
    paddingRight: tokens.spacingHorizontalXXS,
    width: smallIconSize,
    fontSize: smallIconSize,
  },
  'extra-small': {
    paddingLeft: tagSpacingExtraSmall,
    paddingRight: tokens.spacingHorizontalXXS,
    width: extraSmallIconSize,
    fontSize: extraSmallIconSize,
  },
});

export const useMediaStyles = makeStyles({
  base: {
    ...shorthands.gridArea('media'),
    display: 'flex',
    paddingLeft: '1px',
  },
  medium: {
    paddingRight: tokens.spacingHorizontalS,
  },
  small: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  'extra-small': {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
});

const useDismissIconStyles = makeStyles({
  base: {
    ...shorthands.gridArea('dismissIcon'),
    display: 'flex',
  },
  medium: {
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tagSpacingMedium,
    fontSize: mediumIconSize,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tagSpacingSmall,
    fontSize: smallIconSize,
  },
  'extra-small': {
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tagSpacingExtraSmall,
    fontSize: extraSmallIconSize,
  },
});

export const usePrimaryTextStyles = makeStyles({
  base: {
    whiteSpace: 'nowrap',
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
  },

  medium: {
    ...typographyStyles.body1,
  },
  small: {
    ...typographyStyles.caption1,
  },
  'extra-small': {
    ...typographyStyles.caption1,
  },

  withoutSecondaryText: {
    gridColumnStart: 'primary',
    gridRowStart: 'primary',
    gridRowEnd: 'secondary',
    paddingBottom: tokens.spacingHorizontalXXS,
  },
  withSecondaryText: {
    ...shorthands.gridArea('primary'),
    ...typographyStyles.caption1,
    marginTop: '-2px',
  },
});

export const useSecondaryTextStyles = makeStyles({
  base: {
    ...shorthands.gridArea('secondary'),
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
    ...typographyStyles.caption2,
    whiteSpace: 'nowrap',
  },
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootWithoutMediaStyles = useRootWithoutMediaStyles();
  const rootWithoutDismissStyles = useRootWithoutDismissStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const dismissIconStyles = useDismissIconStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextStyles = useSecondaryTextStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    tagClassNames.root,

    rootStyles.base,

    state.disabled ? rootDisabledStyles[appearance] : rootStyles[appearance],
    rootStyles[shape],
    rootStyles[size],

    !state.media && !state.icon && rootWithoutMediaStyles[size],
    !state.dismissIcon && rootWithoutDismissStyles[size],

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(
      tagClassNames.media,
      mediaStyles.base,
      mediaStyles[size],
      state.media.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(tagClassNames.icon, iconStyles.base, iconStyles[size], state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,

      primaryTextStyles.base,
      primaryTextStyles[size],

      state.secondaryText ? primaryTextStyles.withSecondaryText : primaryTextStyles.withoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagClassNames.secondaryText,
      secondaryTextStyles.base,
      state.secondaryText.className,
    );
  }
  if (state.dismissIcon) {
    state.dismissIcon.className = mergeClasses(
      tagClassNames.dismissIcon,
      dismissIconStyles.base,
      dismissIconStyles[size],
      state.dismissIcon.className,
    );
  }

  return state;
};
