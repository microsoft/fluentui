import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};
/**
 * @deprecated Use `buttonClassNames.root` instead.
 */
export const buttonClassName = buttonClassNames.root;

const useRootStyles = makeStyles({
  // Base styles
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'middle',

    ...shorthands.margin(0),

    maxWidth: '280px',

    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),

    fontFamily: tokens.fontFamilyBase,

    outlineStyle: 'none',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      color: tokens.colorNeutralForeground1,

      cursor: 'pointer',
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      color: tokens.colorNeutralForeground1,

      outlineStyle: 'none',
    },
  },

  // Block styles
  block: {
    maxWidth: '100%',
    width: '100%',
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':active': {
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

    ':active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
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
    },

    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
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
    ...shorthands.gap('4px'),
    ...shorthands.padding('0', '8px'),

    height: '24px',
    minWidth: '64px',

    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    ...shorthands.gap('6px'),
    ...shorthands.padding('0', '12px'),

    height: '32px',
    minWidth: '96px',

    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    ...shorthands.gap('6px'),
    ...shorthands.padding('0', '16px'),

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
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },
  primary: {
    ...shorthands.borderColor('transparent'),

    ':hover': {
      ...shorthands.borderColor('transparent'),
    },

    ':active': {
      ...shorthands.borderColor('transparent'),
    },
  },
  subtle: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },

    ':active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },

    ':active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useRootFocusStyles = makeStyles({
  // TODO: `overflow: 'hidden'` on the root does not pay well with `position: absolute`
  // used by the outline pseudo-element. Need to introduce a text container for children and set
  // overflow there so that default focus outline can work
  //
  // base: createFocusOutlineStyle(),
  // circular: createFocusOutlineStyle({ style: { outlineRadius: tokens.global.borderRadius.circular } }),
  // primary: createFocusOutlineStyle({ style: { outlineOffset: '2px' } }),
  // square: createFocusOutlineStyle({ style: { outlineRadius: tokens.global.borderRadius.none } }),

  base: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor('transparent'),
    outlineColor: 'transparent',
    outlineWidth: '2px',
    outlineStyle: 'solid',
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 2px ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),

  circular: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  }),
  rounded: {},
  // Primary styles
  primary: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    boxShadow: `${tokens.shadow2}, 0 0 0 2px ${tokens.colorStrokeFocus2}`,
  }),
  square: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  }),

  // Size variations
  small: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  }),
  medium: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  }),
  large: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    ...shorthands.padding('4px'),

    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    ...shorthands.padding('4px'),

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    ...shorthands.padding('6px'),

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
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
});

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const {
    appearance,
    // eslint-disable-next-line deprecation/deprecation
    block,
    disabled,
    disabledFocusable,
    iconOnly,
    shape,
    size,
  } = state;

  state.root.className = mergeClasses(
    buttonClassNames.root,

    // Root styles
    rootStyles.base,
    block && rootStyles.block,
    appearance && rootStyles[appearance],
    rootStyles[size],
    rootStyles[shape],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
    rootFocusStyles.base,
    appearance === 'primary' && rootFocusStyles.primary,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(buttonClassNames.icon, iconStyles.base, iconStyles[size], state.icon.className);
  }

  return state;
};
