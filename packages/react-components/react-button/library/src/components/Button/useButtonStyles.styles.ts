import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

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

  backgroundColor: `var(--ctrl-token-Button-1, var(--semantic-token-Button-2, ${tokens.colorNeutralBackground1}))`,
  color: `var(--ctrl-token-Button-3, var(--semantic-token-Button-4, ${tokens.colorNeutralForeground1}))`,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

  fontFamily: `var(--ctrl-token-Button-5, var(--semantic-token-Button-6, ${tokens.fontFamilyBase}))`,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: `var(--ctrl-token-Button-7, var(--semantic-token-Button-8, ${tokens.colorNeutralBackground1Hover}))`,
    borderColor: `var(--ctrl-token-Button-9, var(--semantic-token-Button-10, ${tokens.colorNeutralStroke1Hover}))`,
    color: `var(--ctrl-token-Button-11, var(--semantic-token-Button-12, ${tokens.colorNeutralForeground1Hover}))`,

    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: `var(--ctrl-token-Button-13, var(--semantic-token-Button-14, ${tokens.colorNeutralBackground1Pressed}))`,
    borderColor: `var(--ctrl-token-Button-15, var(--semantic-token-Button-16, ${tokens.colorNeutralStroke1Pressed}))`,
    color: `var(--ctrl-token-Button-17, var(--semantic-token-Button-18, ${tokens.colorNeutralForeground1Pressed}))`,

    outlineStyle: 'none',
  },

  padding: `${buttonSpacingMedium} ${tokens.spacingHorizontalM}`,
  minWidth: '96px',
  borderRadius: `var(--ctrl-token-Button-19, var(--semantic-token-Button-20, ${tokens.borderRadiusMedium}))`,

  fontSize: `var(--ctrl-token-Button-21, var(--semantic-token-Button-22, ${tokens.fontSizeBase300}))`,
  fontWeight: `var(--ctrl-token-Button-23, var(--semantic-token-Button-24, ${tokens.fontWeightSemibold}))`,
  lineHeight: `var(--ctrl-token-Button-25, var(--semantic-token-Button-26, ${tokens.lineHeightBase300}))`,

  // Transition styles

  transitionDuration: `var(--ctrl-token-Button-27, var(--semantic-token-Button-28, ${tokens.durationFaster}))`,
  transitionProperty: 'background, border, color',
  transitionTimingFunction: `var(--ctrl-token-Button-29, var(--semantic-token-Button-30, ${tokens.curveEasyEase}))`,

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
    borderColor: `var(--ctrl-token-Button-31, var(--semantic-token-Button-32, ${tokens.colorStrokeFocus2}))`,
    borderRadius: `var(--ctrl-token-Button-33, var(--semantic-token-Button-34, ${tokens.borderRadiusMedium}))`,
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

  [iconSpacingVar]: `var(--ctrl-token-Button-35, var(--semantic-token-Button-36, ${tokens.spacingHorizontalSNudge}))`,
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: `var(--ctrl-token-Button-37, var(--semantic-token-Button-38, ${tokens.colorTransparentBackground}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-39, var(--semantic-token-Button-40, ${tokens.colorTransparentBackgroundHover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-41, var(--semantic-token-Button-42, ${tokens.colorTransparentBackgroundPressed}))`,
    },
  },
  primary: {
    backgroundColor: `var(--ctrl-token-Button-43, var(--semantic-token-Button-44, ${tokens.colorBrandBackground}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--ctrl-token-Button-45, var(--semantic-token-Button-46, ${tokens.colorNeutralForegroundOnBrand}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-47, var(--semantic-token-Button-48, ${tokens.colorBrandBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-Button-49, var(--semantic-token-Button-50, ${tokens.colorNeutralForegroundOnBrand}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-51, var(--semantic-token-Button-52, ${tokens.colorBrandBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-Button-53, var(--semantic-token-Button-54, ${tokens.colorNeutralForegroundOnBrand}))`,
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
    backgroundColor: `var(--ctrl-token-Button-55, var(--semantic-token-Button-56, ${tokens.colorSubtleBackground}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--ctrl-token-Button-57, var(--semantic-token-Button-58, ${tokens.colorNeutralForeground2}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-59, var(--semantic-token-Button-60, ${tokens.colorSubtleBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-Button-61, var(--semantic-token-Button-62, ${tokens.colorNeutralForeground2Hover}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--ctrl-token-Button-63, var(--semantic-token-Button-64, ${tokens.colorNeutralForeground2BrandHover}))`,
      },
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-65, var(--semantic-token-Button-66, ${tokens.colorSubtleBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-Button-67, var(--semantic-token-Button-68, ${tokens.colorNeutralForeground2Pressed}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--ctrl-token-Button-69, var(--semantic-token-Button-70, ${tokens.colorNeutralForeground2BrandPressed}))`,
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
    backgroundColor: `var(--ctrl-token-Button-71, var(--semantic-token-Button-72, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--ctrl-token-Button-73, var(--semantic-token-Button-74, ${tokens.colorNeutralForeground2}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-75, var(--semantic-token-Button-76, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-Button-77, var(--semantic-token-Button-78, ${tokens.colorNeutralForeground2BrandHover}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-79, var(--semantic-token-Button-80, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-Button-81, var(--semantic-token-Button-82, ${tokens.colorNeutralForeground2BrandPressed}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: `var(--ctrl-token-Button-83, var(--semantic-token-Button-84, ${tokens.colorTransparentBackground}))`,
        color: 'Highlight',
      },
      ':hover:active': {
        backgroundColor: `var(--ctrl-token-Button-85, var(--semantic-token-Button-86, ${tokens.colorTransparentBackground}))`,
        color: 'Highlight',
      },
    },
  },

  // Shape variations
  circular: { borderRadius: `var(--ctrl-token-Button-87, var(--semantic-token-Button-88, ${tokens.borderRadiusCircular}))` },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: { borderRadius: `var(--ctrl-token-Button-89, var(--semantic-token-Button-90, ${tokens.borderRadiusNone}))` },

  // Size variations
  small: {
    minWidth: '64px',
    padding: `${buttonSpacingSmall} ${tokens.spacingHorizontalS}`,
    borderRadius: `var(--ctrl-token-Button-91, var(--semantic-token-Button-92, ${tokens.borderRadiusMedium}))`,

    fontSize: `var(--ctrl-token-Button-93, var(--semantic-token-Button-94, ${tokens.fontSizeBase200}))`,
    fontWeight: `var(--ctrl-token-Button-95, var(--semantic-token-Button-96, ${tokens.fontWeightRegular}))`,
    lineHeight: `var(--ctrl-token-Button-97, var(--semantic-token-Button-98, ${tokens.lineHeightBase200}))`,
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
    borderRadius: `var(--ctrl-token-Button-99, var(--semantic-token-Button-100, ${tokens.borderRadiusMedium}))`,

    fontSize: `var(--ctrl-token-Button-101, var(--semantic-token-Button-102, ${tokens.fontSizeBase400}))`,
    fontWeight: `var(--ctrl-token-Button-103, var(--semantic-token-Button-104, ${tokens.fontWeightSemibold}))`,
    lineHeight: `var(--ctrl-token-Button-105, var(--semantic-token-Button-106, ${tokens.lineHeightBase400}))`,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeWithIcon,
    paddingTop: buttonSpacingLargeWithIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: `var(--ctrl-token-Button-107, var(--semantic-token-Button-108, ${tokens.colorNeutralBackgroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: `var(--ctrl-token-Button-109, var(--semantic-token-Button-110, ${tokens.colorNeutralForegroundDisabled}))`,

    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: `var(--ctrl-token-Button-111, var(--semantic-token-Button-112, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-113, var(--semantic-token-Button-114, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--ctrl-token-Button-115, var(--semantic-token-Button-116, ${tokens.colorNeutralForegroundDisabled}))`,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--ctrl-token-Button-117, var(--semantic-token-Button-118, ${tokens.colorNeutralForegroundDisabled}))`,
      },
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-119, var(--semantic-token-Button-120, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--ctrl-token-Button-121, var(--semantic-token-Button-122, ${tokens.colorNeutralForegroundDisabled}))`,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--ctrl-token-Button-123, var(--semantic-token-Button-124, ${tokens.colorNeutralForegroundDisabled}))`,
      },
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },

      ':hover': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },

      ':hover:active': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: `var(--ctrl-token-Button-125, var(--semantic-token-Button-126, ${tokens.colorTransparentBackground}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-127, var(--semantic-token-Button-128, ${tokens.colorTransparentBackground}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-129, var(--semantic-token-Button-130, ${tokens.colorTransparentBackground}))`,
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
    backgroundColor: `var(--ctrl-token-Button-131, var(--semantic-token-Button-132, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-133, var(--semantic-token-Button-134, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-135, var(--semantic-token-Button-136, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: `var(--ctrl-token-Button-137, var(--semantic-token-Button-138, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--ctrl-token-Button-139, var(--semantic-token-Button-140, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-Button-141, var(--semantic-token-Button-142, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useRootFocusStyles = makeStyles({
  // Shape variations
  circular: createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-Button-143, var(--semantic-token-Button-144, ${tokens.borderRadiusCircular}))` }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-Button-145, var(--semantic-token-Button-146, ${tokens.borderRadiusNone}))` }),

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
  small: createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-Button-147, var(--semantic-token-Button-148, ${tokens.borderRadiusSmall}))` }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-Button-149, var(--semantic-token-Button-150, ${tokens.borderRadiusLarge}))` }),
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

    [iconSpacingVar]: `var(--ctrl-token-Button-151, var(--semantic-token-Button-152, ${tokens.spacingHorizontalXS}))`,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',

    [iconSpacingVar]: `var(--ctrl-token-Button-153, var(--semantic-token-Button-154, ${tokens.spacingHorizontalSNudge}))`,
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
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const iconBaseClassName = useIconBaseClassName();

  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

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
