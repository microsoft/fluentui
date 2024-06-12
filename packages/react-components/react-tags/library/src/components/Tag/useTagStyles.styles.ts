import { GriffelResetStyle, makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
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

const baseStyles: GriffelResetStyle = {
  // reset default button style:
  fontFamily: 'inherit',
  padding: '0px',
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

  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
};

const useRootRoundedBaseClassName = makeResetStyles({
  ...baseStyles,

  borderRadius: `var(--ctrl-token-Tag-2443, var(--semantic-token-Tag-2444, ${tokens.borderRadiusMedium}))`,
  ...createCustomFocusIndicatorStyle({
    borderRadius: `var(--ctrl-token-Tag-2445, var(--semantic-token-Tag-2446, ${tokens.borderRadiusMedium}))`,
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
  }),

  /**
   * Pseudo element to draw the border for windows high contrast mode -
   * when Tag is with secondary text, primary text has negative margin that covers the border.
   */
  '@media (forced-colors: active)': {
    position: 'relative',
    '::before': {
      content: '""',
      borderTop: `${tokens.strokeWidthThin} solid`,
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      borderTopLeftRadius: `var(--ctrl-token-Tag-2447, var(--semantic-token-Tag-2448, ${tokens.borderRadiusMedium}))`,
      borderTopRightRadius: `var(--ctrl-token-Tag-2449, var(--semantic-token-Tag-2450, ${tokens.borderRadiusMedium}))`,
    },
  },
});

const useRootCircularBaseClassName = makeResetStyles({
  ...baseStyles,

  borderRadius: `var(--ctrl-token-Tag-2451, var(--semantic-token-Tag-2452, ${tokens.borderRadiusCircular}))`,
  ...createCustomFocusIndicatorStyle({
    borderRadius: `var(--ctrl-token-Tag-2453, var(--semantic-token-Tag-2454, ${tokens.borderRadiusCircular}))`,
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
  }),

  /**
   * Pseudo element to draw the border for windows high contrast mode -
   * when Tag is with secondary text, primary text has negative margin that covers the border.
   */
  '@media (forced-colors: active)': {
    position: 'relative',
    '::before': {
      content: '""',
      borderTop: `${tokens.strokeWidthThin} solid`,
      borderLeft: `${tokens.strokeWidthThin} solid`,
      borderRight: `${tokens.strokeWidthThin} solid`,
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      borderRadius: `var(--ctrl-token-Tag-2455, var(--semantic-token-Tag-2456, ${tokens.borderRadiusCircular}))`,
    },
  },
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: `var(--ctrl-token-Tag-2457, var(--semantic-token-Tag-2458, ${tokens.colorNeutralBackground3}))`,
    color: `var(--ctrl-token-Tag-2459, var(--semantic-token-Tag-2460, ${tokens.colorNeutralForeground2}))`,
  },
  outline: {
    backgroundColor: `var(--ctrl-token-Tag-2461, var(--semantic-token-Tag-2462, ${tokens.colorSubtleBackground}))`,
    color: `var(--ctrl-token-Tag-2463, var(--semantic-token-Tag-2464, ${tokens.colorNeutralForeground2}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  brand: {
    backgroundColor: `var(--ctrl-token-Tag-2465, var(--semantic-token-Tag-2466, ${tokens.colorBrandBackground2}))`,
    color: `var(--ctrl-token-Tag-2467, var(--semantic-token-Tag-2468, ${tokens.colorBrandForeground2}))`,
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
    backgroundColor: `var(--ctrl-token-Tag-2469, var(--semantic-token-Tag-2470, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--ctrl-token-Tag-2471, var(--semantic-token-Tag-2472, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-Tag-2473, var(--semantic-token-Tag-2474, ${tokens.colorSubtleBackground}))`,
    color: `var(--ctrl-token-Tag-2475, var(--semantic-token-Tag-2476, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-Tag-2477, var(--semantic-token-Tag-2478, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--ctrl-token-Tag-2479, var(--semantic-token-Tag-2480, ${tokens.colorNeutralForegroundDisabled}))`,
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
    gridArea: 'media',
    display: 'flex',
  },
  medium: {
    paddingLeft: tagSpacingMedium,
    paddingRight: `var(--ctrl-token-Tag-2481, var(--semantic-token-Tag-2482, ${tokens.spacingHorizontalXS}))`,
    width: mediumIconSize,
    fontSize: mediumIconSize,
  },
  small: {
    paddingLeft: tagSpacingSmall,
    paddingRight: `var(--ctrl-token-Tag-2483, var(--semantic-token-Tag-2484, ${tokens.spacingHorizontalXXS}))`,
    width: smallIconSize,
    fontSize: smallIconSize,
  },
  'extra-small': {
    paddingLeft: tagSpacingExtraSmall,
    paddingRight: `var(--ctrl-token-Tag-2485, var(--semantic-token-Tag-2486, ${tokens.spacingHorizontalXXS}))`,
    width: extraSmallIconSize,
    fontSize: extraSmallIconSize,
  },
});

export const useMediaStyles = makeStyles({
  base: {
    gridArea: 'media',

    display: 'flex',
    paddingLeft: '1px',
  },
  medium: {
    paddingRight: `var(--ctrl-token-Tag-2487, var(--semantic-token-Tag-2488, ${tokens.spacingHorizontalS}))`,
  },
  small: {
    paddingRight: `var(--ctrl-token-Tag-2489, var(--semantic-token-Tag-2490, ${tokens.spacingHorizontalSNudge}))`,
  },
  'extra-small': {
    paddingRight: `var(--ctrl-token-Tag-2491, var(--semantic-token-Tag-2492, ${tokens.spacingHorizontalSNudge}))`,
  },
});

const useDismissIconStyles = makeStyles({
  base: {
    gridArea: 'dismissIcon',

    display: 'flex',

    // windows high contrast:
    '@media (forced-colors: active)': {
      ':hover': {
        color: 'Highlight',
      },
      ':active': {
        color: 'Highlight',
      },
    },
  },
  medium: {
    paddingLeft: `var(--ctrl-token-Tag-2493, var(--semantic-token-Tag-2494, ${tokens.spacingHorizontalXS}))`,
    paddingRight: tagSpacingMedium,
    fontSize: mediumIconSize,
  },
  small: {
    paddingLeft: `var(--ctrl-token-Tag-2495, var(--semantic-token-Tag-2496, ${tokens.spacingHorizontalXXS}))`,
    paddingRight: tagSpacingSmall,
    fontSize: smallIconSize,
  },
  'extra-small': {
    paddingLeft: `var(--ctrl-token-Tag-2497, var(--semantic-token-Tag-2498, ${tokens.spacingHorizontalXXS}))`,
    paddingRight: tagSpacingExtraSmall,
    fontSize: extraSmallIconSize,
  },

  filled: {
    ':hover': {
      cursor: 'pointer',
      color: `var(--ctrl-token-Tag-2499, var(--semantic-token-Tag-2500, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      color: `var(--ctrl-token-Tag-2501, var(--semantic-token-Tag-2502, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
  },
  outline: {
    ':hover': {
      cursor: 'pointer',
      color: `var(--ctrl-token-Tag-2503, var(--semantic-token-Tag-2504, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      color: `var(--ctrl-token-Tag-2505, var(--semantic-token-Tag-2506, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
  },
  brand: {
    ':hover': {
      cursor: 'pointer',
      color: `var(--ctrl-token-Tag-2507, var(--semantic-token-Tag-2508, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      color: `var(--ctrl-token-Tag-2509, var(--semantic-token-Tag-2510, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
  },
});

export const usePrimaryTextStyles = makeStyles({
  base: {
    whiteSpace: 'nowrap',
    paddingLeft: `var(--ctrl-token-Tag-2511, var(--semantic-token-Tag-2512, ${tokens.spacingHorizontalXXS}))`,
    paddingRight: `var(--ctrl-token-Tag-2513, var(--semantic-token-Tag-2514, ${tokens.spacingHorizontalXXS}))`,
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
    paddingBottom: `var(--ctrl-token-Tag-2515, var(--semantic-token-Tag-2516, ${tokens.spacingHorizontalXXS}))`,
  },
  withSecondaryText: {
    gridArea: 'primary',

    ...typographyStyles.caption1,
    marginTop: '-2px',
  },
});

export const useSecondaryTextBaseClassName = makeResetStyles({
  gridArea: 'secondary',
  paddingLeft: `var(--ctrl-token-Tag-2517, var(--semantic-token-Tag-2518, ${tokens.spacingHorizontalXXS}))`,
  paddingRight: `var(--ctrl-token-Tag-2519, var(--semantic-token-Tag-2520, ${tokens.spacingHorizontalXXS}))`,
  ...typographyStyles.caption2,
  whiteSpace: 'nowrap',
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  'use no memo';

  const rootRoundedBaseClassName = useRootRoundedBaseClassName();
  const rootCircularBaseClassName = useRootCircularBaseClassName();

  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootWithoutMediaStyles = useRootWithoutMediaStyles();
  const rootWithoutDismissStyles = useRootWithoutDismissStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const dismissIconStyles = useDismissIconStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    tagClassNames.root,

    shape === 'rounded' ? rootRoundedBaseClassName : rootCircularBaseClassName,

    state.disabled ? rootDisabledStyles[appearance] : rootStyles[appearance],
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
      secondaryTextBaseClassName,
      state.secondaryText.className,
    );
  }
  if (state.dismissIcon) {
    state.dismissIcon.className = mergeClasses(
      tagClassNames.dismissIcon,
      dismissIconStyles.base,
      dismissIconStyles[size],
      !state.disabled && dismissIconStyles[appearance],
      state.dismissIcon.className,
    );
  }

  return state;
};
