'use client';

import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { GriffelStyle } from '@griffel/react';
import { semanticTokenVar, useIsVisualRefreshEnabled } from '@fluentui/visual-refresh-preview';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

const iconSpacingVar = '--fui-Button__icon--spacing';

const buttonSpacingSmall = '3px';
const buttonSpacingSmallWithIcon = '1px';
const buttonSpacingMedium = '5px';
const buttonSpacingLarge = '8px';
const buttonSpacingLargeWithIcon = '7px';

/* Firefox has box shadow sizing issue at some zoom levels
 * this will ensure the inset boxShadow is always uniform
 * without affecting other browser platforms
 */
const boxShadowStrokeWidthThinMoz = `calc(${tokens.strokeWidthThin} + 0.25px)`;

const useRootBaseClassName = makeResetStyles({
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  textDecorationLine: 'none',
  verticalAlign: 'middle',

  margin: 0,
  overflow: 'hidden',

  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

  fontFamily: tokens.fontFamilyBase,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    borderColor: tokens.colorNeutralStroke1Hover,
    color: tokens.colorNeutralForeground1Hover,

    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    borderColor: tokens.colorNeutralStroke1Pressed,
    color: tokens.colorNeutralForeground1Pressed,

    outlineStyle: 'none',
  },

  padding: `${buttonSpacingMedium} ${tokens.spacingHorizontalM}`,
  minWidth: '96px',
  borderRadius: tokens.borderRadiusMedium,

  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,

  // Transition styles

  transitionDuration: tokens.durationFaster,
  transitionProperty: 'background, border, color',
  transitionTimingFunction: tokens.curveEasyEase,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  // High contrast styles

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
    borderColor: tokens.colorStrokeFocus2,
    borderRadius: tokens.borderRadiusMedium,
    borderWidth: '1px',
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2}
      inset
    `,
    zIndex: 1,
  }),

  // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
  '@supports (-moz-appearance:button)': {
    ...createCustomFocusIndicatorStyle({
      boxShadow: `0 0 0 ${boxShadowStrokeWidthThinMoz} ${tokens.colorStrokeFocus2}
      inset
    `,
    }),
  },
});

const useIconBaseClassName = makeResetStyles({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',

  fontSize: '20px',
  height: '20px',
  width: '20px',

  [iconSpacingVar]: tokens.spacingHorizontalSNudge,
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
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },

    ':hover:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('HighlightText'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',

      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Hover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForeground2BrandHover,
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Pressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForeground2BrandPressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        color: 'Highlight',

        [`& .${buttonClassNames.icon}`]: {
          color: 'Highlight',
        },
      },
      ':hover:active': {
        color: 'Highlight',

        [`& .${buttonClassNames.icon}`]: {
          color: 'Highlight',
        },
      },
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: tokens.colorTransparentBackground,
        color: 'Highlight',
      },
      ':hover:active': {
        backgroundColor: tokens.colorTransparentBackground,
        color: 'Highlight',
      },
    },
  },

  // Shape variations
  circular: { borderRadius: tokens.borderRadiusCircular },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: { borderRadius: tokens.borderRadiusNone },

  // Size variations
  small: {
    minWidth: '64px',
    padding: `${buttonSpacingSmall} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,

    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  smallWithIcon: {
    paddingBottom: buttonSpacingSmallWithIcon,
    paddingTop: buttonSpacingSmallWithIcon,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    minWidth: '96px',
    padding: `${buttonSpacingLarge} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusMedium,

    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeWithIcon,
    paddingTop: buttonSpacingLargeWithIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      [`& .${buttonClassNames.icon}`]: {
        color: 'GrayText',
      },

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },

      ':hover': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',

        [`& .${buttonClassNames.icon}`]: {
          color: 'GrayText',
        },
      },

      ':hover:active': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',

        [`& .${buttonClassNames.icon}`]: {
          color: 'GrayText',
        },
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
    },
  },
  primary: {
    ...shorthands.borderColor('transparent'),

    ':hover': {
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      ...shorthands.borderColor('transparent'),
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useRootFocusStyles = makeStyles({
  // Shape variations
  circular: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusCircular }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusNone }),

  // Primary styles
  primary: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(tokens.colorStrokeFocus2),
      boxShadow: `${tokens.shadow2}, 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,  0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralForegroundOnBrand} inset`,
      ':hover': {
        boxShadow: `${tokens.shadow2}, 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset`,
        ...shorthands.borderColor(tokens.colorStrokeFocus2),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${tokens.colorStrokeFocus2} inset,  0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralForegroundOnBrand} inset`,
        ':hover': {
          boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${tokens.colorStrokeFocus2} inset`,
        },
      }),
    },
  },

  // Size variations
  small: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusSmall }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusLarge }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: buttonSpacingSmallWithIcon,

    minWidth: '24px',
    maxWidth: '24px',
  },
  medium: {
    padding: buttonSpacingMedium,

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    padding: buttonSpacingLargeWithIcon,

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconStyles = makeStyles({
  // Size variations
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',

    [iconSpacingVar]: tokens.spacingHorizontalXS,
  },
  medium: {
    /* defined in base styles */
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

export type VisualRefreshAppearanceName = 'base' | NonNullable<ButtonProps['appearance']>;

type VisualRefreshAppearanceVariant = VisualRefreshAppearanceName | 'base' | 'neutral' | 'brand';

const visualRefreshAppearanceAlias: Record<
  VisualRefreshAppearanceVariant,
  'neutral' | 'brand' | 'outline' | 'subtle' | 'transparent'
> = {
  base: 'neutral',
  neutral: 'neutral',
  secondary: 'neutral',
  brand: 'brand',
  primary: 'brand',
  outline: 'outline',
  subtle: 'subtle',
  transparent: 'transparent',
};

type SemanticTokenName = Parameters<typeof semanticTokenVar>[0];

const getSemanticTokenValue = (token: string) => semanticTokenVar(token as SemanticTokenName);
const createVisualRefreshAppearanceStyles = (appearance: VisualRefreshAppearanceVariant): GriffelStyle => {
  const tokenGroup = visualRefreshAppearanceAlias[appearance] ?? 'neutral';
  const foregroundTokenBase = `foreground/ctrl/${tokenGroup}`;
  const backgroundTokenBase = `background/ctrl/${tokenGroup}`;
  const borderTokenBase = `borderColor/ctrl/${tokenGroup}`;

  return {
    color: getSemanticTokenValue(`${foregroundTokenBase}/rest`),
    backgroundColor: getSemanticTokenValue(`${backgroundTokenBase}/rest`),
    ...shorthands.borderColor(getSemanticTokenValue(`${borderTokenBase}/rest`)),
    ':hover': {
      color: getSemanticTokenValue(`${foregroundTokenBase}/hover`),
      backgroundColor: getSemanticTokenValue(`${backgroundTokenBase}/hover`),
      ...shorthands.borderColor(getSemanticTokenValue(`${borderTokenBase}/hover`)),
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        // color: tokens.colorNeutralForeground2BrandHover,
      },
    },
    ':hover:active': {
      color: getSemanticTokenValue(`${foregroundTokenBase}/pressed`),
      backgroundColor: getSemanticTokenValue(`${backgroundTokenBase}/pressed`),
      ...shorthands.borderColor(getSemanticTokenValue(`${borderTokenBase}/pressed`)),
    },
    ':disabled': {
      color: getSemanticTokenValue(`${foregroundTokenBase}/disabled`),
      backgroundColor: getSemanticTokenValue(`${backgroundTokenBase}/disabled`),
      ...shorthands.borderColor(getSemanticTokenValue(`${borderTokenBase}/disabled`)),
    },
  };
};

type VisualRefreshInteractionState = 'rest' | 'hover' | 'pressed' | 'disabled';

export type VisualRefreshAppearanceStateTokens = {
  foreground: Record<VisualRefreshInteractionState, string>;
  background: Record<VisualRefreshInteractionState, string>;
  border: Record<VisualRefreshInteractionState, string>;
};

const resolveVisualRefreshAppearanceVariant = (
  appearance?: VisualRefreshAppearanceName,
): VisualRefreshAppearanceVariant => {
  if (!appearance) {
    return 'secondary';
  }
  return appearance;
};

export const getVisualRefreshAppearanceStateTokens = (
  appearance?: VisualRefreshAppearanceName,
): VisualRefreshAppearanceStateTokens => {
  const variant = resolveVisualRefreshAppearanceVariant(appearance);
  const tokenGroup = visualRefreshAppearanceAlias[variant] ?? 'neutral';
  const foregroundTokenBase = `foreground/ctrl/${tokenGroup}`;
  const backgroundTokenBase = `background/ctrl/${tokenGroup}`;
  const borderTokenBase = `borderColor/ctrl/${tokenGroup}`;

  const foreground = {
    rest: getSemanticTokenValue(`${foregroundTokenBase}/rest`),
    hover: getSemanticTokenValue(`${foregroundTokenBase}/hover`),
    pressed: getSemanticTokenValue(`${foregroundTokenBase}/pressed`),
    disabled: getSemanticTokenValue(`${foregroundTokenBase}/disabled`),
  };

  const background = {
    rest: getSemanticTokenValue(`${backgroundTokenBase}/rest`),
    hover: getSemanticTokenValue(`${backgroundTokenBase}/hover`),
    pressed: getSemanticTokenValue(`${backgroundTokenBase}/pressed`),
    disabled: getSemanticTokenValue(`${backgroundTokenBase}/disabled`),
  };

  const border = {
    rest: getSemanticTokenValue(`${borderTokenBase}/rest`),
    hover: getSemanticTokenValue(`${borderTokenBase}/hover`),
    pressed: getSemanticTokenValue(`${borderTokenBase}/pressed`),
    disabled: getSemanticTokenValue(`${borderTokenBase}/disabled`),
  };

  if (appearance === 'primary' || appearance === 'subtle' || appearance === 'transparent') {
    border.rest = 'transparent';
    border.hover = 'transparent';
    border.pressed = 'transparent';
    border.disabled = 'transparent';
  }

  return { foreground, background, border };
};

const useVisualRefreshStyles = makeStyles({
  base: createVisualRefreshAppearanceStyles('base'),

  // Appearance variations
  outline: createVisualRefreshAppearanceStyles('outline'),
  primary: createVisualRefreshAppearanceStyles('primary'),
  secondary: {
    // same as base
  },
  subtle: createVisualRefreshAppearanceStyles('subtle'),
  transparent: createVisualRefreshAppearanceStyles('transparent'),

  small: {
    minHeight: semanticTokenVar('size/ctrl/sm'),
    height: semanticTokenVar('size/ctrl/sm'),

    padding: `${semanticTokenVar('padding/ctrl/vertical/sm')} ${semanticTokenVar('padding/ctrl/horizontal/sm')}`,
    borderRadius: semanticTokenVar('corner/ctrl/sm'),

    fontSize: semanticTokenVar('fontSize/ctrl/sm'),
    fontWeight: semanticTokenVar('fontWeight/ctrl/sm'),
    lineHeight: semanticTokenVar('lineHeight/ctrl/sm'),
  },
  medium: {
    minHeight: semanticTokenVar('size/ctrl/md'),
    height: semanticTokenVar('size/ctrl/md'),

    padding: `${semanticTokenVar('padding/ctrl/vertical/md')} ${semanticTokenVar('padding/ctrl/horizontal/md')}`,
    borderRadius: semanticTokenVar('corner/ctrl/md'),

    fontSize: semanticTokenVar('fontSize/ctrl/md'),
    fontWeight: semanticTokenVar('fontWeight/ctrl/md'),
    lineHeight: semanticTokenVar('lineHeight/ctrl/md'),
  },
  large: {
    minHeight: semanticTokenVar('size/ctrl/lg'),
    height: semanticTokenVar('size/ctrl/lg'),

    padding: `${semanticTokenVar('padding/ctrl/vertical/lg')} ${semanticTokenVar('padding/ctrl/horizontal/lg')}`,
    borderRadius: semanticTokenVar('corner/ctrl/lg'),

    fontSize: semanticTokenVar('fontSize/ctrl/lg'),
    fontWeight: semanticTokenVar('fontWeight/ctrl/lg'),
    lineHeight: semanticTokenVar('lineHeight/ctrl/lg'),
  },
});

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  'use no memo';

  const isVisualRefreshEnabled = useIsVisualRefreshEnabled();
  const visualRefreshStyles = useVisualRefreshStyles();

  const rootBaseClassName = useRootBaseClassName();
  const iconBaseClassName = useIconBaseClassName();

  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  const visualRefreshStylesRecord = visualRefreshStyles as unknown as Record<string, string>;
  const visualRefreshSlots: Array<string | undefined> = ['root', appearance, shape, size];
  const visualRefreshOverrides = isVisualRefreshEnabled
    ? mergeClasses(...visualRefreshSlots.map(slot => (slot ? visualRefreshStylesRecord[slot] : undefined)))
    : undefined;

  state.root.className = mergeClasses(
    buttonClassNames.root,
    rootBaseClassName,

    appearance && rootStyles[appearance],

    rootStyles[size],
    icon && size === 'small' && rootStyles.smallWithIcon,
    icon && size === 'large' && rootStyles.largeWithIcon,
    rootStyles[shape],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
    appearance === 'primary' && rootFocusStyles.primary,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,

    isVisualRefreshEnabled && visualRefreshOverrides,
    isVisualRefreshEnabled && visualRefreshStyles[size],
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      buttonClassNames.icon,
      iconBaseClassName,
      !!state.root.children && iconStyles[iconPosition],
      iconStyles[size],
      state.icon.className,
    );
  }
  return state;
};
