import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, mergeClasses, unstableMakeResetStyles } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

const iconSpacingVar = '--fui-Button__icon--spacing';

const useBaseStyles = unstableMakeResetStyles({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
  verticalAlign: 'middle',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  margin: 0,

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  fontFamily: tokens.fontFamilyBase,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    borderColor: tokens.colorNeutralStroke1Hover,
    color: tokens.colorNeutralForeground1Hover,
    cursor: 'pointer',

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ':hover:active': {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    borderColor: tokens.colorNeutralStroke1Pressed,
    color: tokens.colorNeutralForeground1Pressed,
    outlineStyle: 'none',

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalM}`,
  height: '32px',
  minWidth: '96px',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  borderRadius: tokens.borderRadiusMedium,

  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,

  // High contrast styles
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  '@media (forced-colors: active)': {
    ':focus': {
      borderColor: 'ButtonText',
    },

    ':hover': {
      backgroundColor: 'HighlightText',
      borderColor: 'Highlight',
      color: 'Highlight',
      forcedColorAdjust: 'none',
    },

    ':hover:active': {
      backgroundColor: 'HighlightText',
      borderColor: 'Highlight',
      color: 'Highlight',
      forcedColorAdjust: 'none',
    },
  },

  // Focus styles
  ...createCustomFocusIndicatorStyle({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    borderColor: 'transparent',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    borderRadius: tokens.borderRadiusMedium,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    outline: `${tokens.strokeWidthThick} solid transparent`,
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 2px ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },
  primary: {
    backgroundColor: tokens.colorBrandBackground,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: 'transparent',
    color: tokens.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
      color: tokens.colorNeutralForegroundOnBrand,
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: 'transparent',
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
      color: tokens.colorNeutralForeground2BrandHover,
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: 'transparent',
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
      color: tokens.colorNeutralForeground2BrandHover,
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },

  // Shape variations
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },

  // Size variations
  small: {
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalS),

    height: '24px',
    minWidth: '64px',

    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalL),

    height: '40px',
    minWidth: '96px',

    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: tokens.colorNeutralStrokeDisabled,
    color: tokens.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: tokens.colorNeutralStrokeDisabled,
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: tokens.colorNeutralStrokeDisabled,
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
    },
  },

  // High contrast styles
  highContrast: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '@media (forced-colors: active)': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'GrayText',
      color: 'GrayText',

      ':focus': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @griffel/no-shorthands
        borderColor: 'GrayText',
      },

      ':hover': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @griffel/no-shorthands
        borderColor: 'GrayText',
        color: 'GrayText',
      },

      ':hover:active': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @griffel/no-shorthands
        borderColor: 'GrayText',
        color: 'GrayText',
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },
  primary: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: 'transparent',

    ':hover': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: 'transparent',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: 'transparent',

    ':hover': {
      backgroundColor: 'transparent',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      backgroundColor: 'transparent',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: 'transparent',

    ':hover': {
      backgroundColor: 'transparent',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ':hover:active': {
      backgroundColor: 'transparent',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'transparent',
    },
  },
});

const useRootFocusStyles = makeStyles({
  // Shape variations
  circular: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  }),

  // Primary styles
  primary: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    boxShadow: `${tokens.shadow2}, 0 0 0 2px ${tokens.colorStrokeFocus2}`,
  }),

  // Size variations
  small: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  }),
  large: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    ...shorthands.padding(tokens.spacingHorizontalXS),

    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    ...shorthands.padding(tokens.spacingHorizontalXS),

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    ...shorthands.padding(tokens.spacingHorizontalSNudge),

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconStyles = makeStyles({
  // Base styles
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },

  // Size variations
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',

    [iconSpacingVar]: tokens.spacingHorizontalXS,
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',

    [iconSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',

    [iconSpacingVar]: tokens.spacingHorizontalSNudge,
  },

  // Icon position variations
  before: {
    marginRight: `var(${iconSpacingVar})`,
  },
  after: {
    marginLeft: `var(${iconSpacingVar})`,
  },
});

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const baseStyles = useBaseStyles();
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, shape, size } = state;

  state.root.className = mergeClasses(
    buttonClassNames.root,

    // Root styles
    baseStyles,
    appearance && rootStyles[appearance],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rootStyles[size],
    rootStyles[shape],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
    appearance === 'primary' && rootFocusStyles.primary,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      buttonClassNames.icon,
      iconStyles.base,
      state.root.children !== undefined && state.root.children !== null && iconStyles[iconPosition],
      iconStyles[size],
      state.icon.className,
    );
  }

  return state;
};
