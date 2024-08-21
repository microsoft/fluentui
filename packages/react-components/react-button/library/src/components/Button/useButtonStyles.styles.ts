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

  backgroundColor: `var(--1, var(--2, ${tokens.colorNeutralBackground1}))`,
  color: `var(--3, var(--4, ${tokens.colorNeutralForeground1}))`,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

  fontFamily: `var(--5, var(--6, ${tokens.fontFamilyBase}))`,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: `var(--7, var(--8, ${tokens.colorNeutralBackground1Hover}))`,
    borderColor: `var(--9, var(--10, ${tokens.colorNeutralStroke1Hover}))`,
    color: `var(--11, var(--12, ${tokens.colorNeutralForeground1Hover}))`,

    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: `var(--13, var(--14, ${tokens.colorNeutralBackground1Pressed}))`,
    borderColor: `var(--15, var(--16, ${tokens.colorNeutralStroke1Pressed}))`,
    color: `var(--17, var(--18, ${tokens.colorNeutralForeground1Pressed}))`,

    outlineStyle: 'none',
  },

  padding: `${buttonSpacingMedium} ${tokens.spacingHorizontalM}`,
  minWidth: '96px',
  borderRadius: `var(--19, var(--20, ${tokens.borderRadiusMedium}))`,

  fontSize: `var(--21, var(--22, ${tokens.fontSizeBase300}))`,
  fontWeight: `var(--23, var(--24, ${tokens.fontWeightSemibold}))`,
  lineHeight: `var(--25, var(--26, ${tokens.lineHeightBase300}))`,

  // Transition styles

  transitionDuration: `var(--27, var(--28, ${tokens.durationFaster}))`,
  transitionProperty: 'background, border, color',
  transitionTimingFunction: `var(--29, var(--30, ${tokens.curveEasyEase}))`,

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
    borderColor: `var(--31, var(--32, ${tokens.colorStrokeFocus2}))`,
    borderRadius: `var(--33, var(--34, ${tokens.borderRadiusMedium}))`,
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

  [iconSpacingVar]: `var(--35, var(--36, ${tokens.spacingHorizontalSNudge}))`,
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: `var(--37, var(--38, ${tokens.colorTransparentBackground}))`,

    ':hover': {
      backgroundColor: `var(--39, var(--40, ${tokens.colorTransparentBackgroundHover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--41, var(--42, ${tokens.colorTransparentBackgroundPressed}))`,
    },
  },
  primary: {
    backgroundColor: `var(--43, var(--44, ${tokens.colorBrandBackground}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--45, var(--46, ${tokens.colorNeutralForegroundOnBrand}))`,

    ':hover': {
      backgroundColor: `var(--47, var(--48, ${tokens.colorBrandBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--49, var(--50, ${tokens.colorNeutralForegroundOnBrand}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--51, var(--52, ${tokens.colorBrandBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--53, var(--54, ${tokens.colorNeutralForegroundOnBrand}))`,
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
    backgroundColor: `var(--55, var(--56, ${tokens.colorSubtleBackground}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--57, var(--58, ${tokens.colorNeutralForeground2}))`,

    ':hover': {
      backgroundColor: `var(--59, var(--60, ${tokens.colorSubtleBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--61, var(--62, ${tokens.colorNeutralForeground2Hover}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--63, var(--64, ${tokens.colorNeutralForeground2BrandHover}))`,
      },
    },

    ':hover:active': {
      backgroundColor: `var(--65, var(--66, ${tokens.colorSubtleBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--67, var(--68, ${tokens.colorNeutralForeground2Pressed}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--69, var(--70, ${tokens.colorNeutralForeground2BrandPressed}))`,
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
    backgroundColor: `var(--71, var(--72, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--73, var(--74, ${tokens.colorNeutralForeground2}))`,

    ':hover': {
      backgroundColor: `var(--75, var(--76, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--77, var(--78, ${tokens.colorNeutralForeground2BrandHover}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    ':hover:active': {
      backgroundColor: `var(--79, var(--80, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--81, var(--82, ${tokens.colorNeutralForeground2BrandPressed}))`,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: `var(--83, var(--84, ${tokens.colorTransparentBackground}))`,
        color: 'Highlight',
      },
      ':hover:active': {
        backgroundColor: `var(--85, var(--86, ${tokens.colorTransparentBackground}))`,
        color: 'Highlight',
      },
    },
  },

  // Shape variations
  circular: {
    borderRadius: `var(--87, var(--88, ${tokens.borderRadiusCircular}))`,
  },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: { borderRadius: `var(--89, var(--90, ${tokens.borderRadiusNone}))` },

  // Size variations
  small: {
    minWidth: '64px',
    padding: `${buttonSpacingSmall} ${tokens.spacingHorizontalS}`,
    borderRadius: `var(--91, var(--92, ${tokens.borderRadiusMedium}))`,

    fontSize: `var(--93, var(--94, ${tokens.fontSizeBase200}))`,
    fontWeight: `var(--95, var(--96, ${tokens.fontWeightRegular}))`,
    lineHeight: `var(--97, var(--98, ${tokens.lineHeightBase200}))`,
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
    borderRadius: `var(--99, var(--100, ${tokens.borderRadiusMedium}))`,

    fontSize: `var(--101, var(--102, ${tokens.fontSizeBase400}))`,
    fontWeight: `var(--103, var(--104, ${tokens.fontWeightSemibold}))`,
    lineHeight: `var(--105, var(--106, ${tokens.lineHeightBase400}))`,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeWithIcon,
    paddingTop: buttonSpacingLargeWithIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: `var(--107, var(--108, ${tokens.colorNeutralBackgroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: `var(--109, var(--110, ${tokens.colorNeutralForegroundDisabled}))`,

    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: `var(--111, var(--112, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':hover': {
      backgroundColor: `var(--113, var(--114, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--115, var(--116, ${tokens.colorNeutralForegroundDisabled}))`,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--117, var(--118, ${tokens.colorNeutralForegroundDisabled}))`,
      },
    },

    ':hover:active': {
      backgroundColor: `var(--119, var(--120, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--121, var(--122, ${tokens.colorNeutralForegroundDisabled}))`,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: `var(--123, var(--124, ${tokens.colorNeutralForegroundDisabled}))`,
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
    backgroundColor: `var(--125, var(--126, ${tokens.colorTransparentBackground}))`,

    ':hover': {
      backgroundColor: `var(--127, var(--128, ${tokens.colorTransparentBackground}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--129, var(--130, ${tokens.colorTransparentBackground}))`,
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
    backgroundColor: `var(--131, var(--132, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--133, var(--134, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--135, var(--136, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: `var(--137, var(--138, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--139, var(--140, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--141, var(--142, ${tokens.colorTransparentBackground}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useRootFocusStyles = makeStyles({
  // Shape variations
  circular: createCustomFocusIndicatorStyle({
    borderRadius: `var(--143, var(--144, ${tokens.borderRadiusCircular}))`,
  }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({
    borderRadius: `var(--145, var(--146, ${tokens.borderRadiusNone}))`,
  }),

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
  small: createCustomFocusIndicatorStyle({
    borderRadius: `var(--147, var(--148, ${tokens.borderRadiusSmall}))`,
  }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({
    borderRadius: `var(--149, var(--150, ${tokens.borderRadiusLarge}))`,
  }),
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

    [iconSpacingVar]: `var(--151, var(--152, ${tokens.spacingHorizontalXS}))`,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',

    [iconSpacingVar]: `var(--153, var(--154, ${tokens.spacingHorizontalSNudge}))`,
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
