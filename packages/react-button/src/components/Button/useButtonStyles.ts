import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ButtonState } from './Button.types';

export const buttonClassName = 'fui-Button';

// TODO: These are named in design specs but not hoisted to global/alias yet.
//       We're tracking these here to determine how we can hoist them.
export const buttonSpacing = {
  smallest: '2px',
  smaller: '4px',
  small: '6px',
  medium: '8px',
  large: '12px',
  larger: '16px',
};

const useRootStyles = makeStyles({
  // Base styles
  base: theme => ({
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'middle',

    ...shorthands.margin(0),

    maxWidth: '280px',

    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground1,
    ...shorthands.border(theme.strokeWidthThin, 'solid', theme.colorNeutralStroke1),

    fontFamily: theme.fontFamilyBase,

    outlineStyle: 'none',

    ':hover': {
      backgroundColor: theme.colorNeutralBackground1Hover,
      ...shorthands.borderColor(theme.colorNeutralStroke1Hover),
      color: theme.colorNeutralForeground1,

      cursor: 'pointer',
    },

    ':active': {
      backgroundColor: theme.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(theme.colorNeutralStroke1Pressed),
      color: theme.colorNeutralForeground1,

      outlineStyle: 'none',
    },
  }),

  // Block styles
  block: {
    maxWidth: '100%',
    width: '100%',
  },

  // Appearance variations
  outline: theme => ({
    backgroundColor: theme.colorTransparentBackground,

    ':hover': {
      backgroundColor: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      backgroundColor: theme.colorTransparentBackgroundPressed,
    },
  }),
  primary: theme => ({
    backgroundColor: theme.colorBrandBackground,
    ...shorthands.borderColor('transparent'),
    color: theme.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: theme.colorBrandBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForegroundOnBrand,
    },

    ':active': {
      backgroundColor: theme.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForegroundOnBrand,
    },
  }),
  subtle: theme => ({
    backgroundColor: theme.colorSubtleBackground,
    ...shorthands.borderColor('transparent'),
    color: theme.colorNeutralForeground2,

    ':hover': {
      backgroundColor: theme.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      backgroundColor: theme.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
  transparent: theme => ({
    backgroundColor: theme.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),
    color: theme.colorNeutralForeground2,

    ':hover': {
      backgroundColor: theme.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      backgroundColor: theme.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),

  // Shape variations
  circular: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusCircular),
  }),
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusNone),
  }),

  // Size variations
  small: theme => ({
    ...shorthands.gap(buttonSpacing.smaller),
    ...shorthands.padding('0', buttonSpacing.medium),

    height: '24px',
    minWidth: '64px',

    ...shorthands.borderRadius(theme.borderRadiusSmall),

    fontSize: theme.fontSizeBase200,
    fontWeight: theme.fontWeightRegular,
    lineHeight: theme.lineHeightBase200,
  }),
  medium: theme => ({
    ...shorthands.gap(buttonSpacing.small),
    ...shorthands.padding('0', buttonSpacing.large),

    height: '32px',
    minWidth: '96px',

    ...shorthands.borderRadius(theme.borderRadiusMedium),

    fontSize: theme.fontSizeBase300,
    fontWeight: theme.fontWeightSemibold,
    lineHeight: theme.lineHeightBase300,
  }),
  large: theme => ({
    ...shorthands.gap(buttonSpacing.small),
    ...shorthands.padding('0', buttonSpacing.larger),

    height: '40px',
    minWidth: '96px',

    ...shorthands.borderRadius(theme.borderRadiusMedium),

    fontSize: theme.fontSizeBase400,
    fontWeight: theme.fontWeightSemibold,
    lineHeight: theme.lineHeightBase400,
  }),
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: theme => ({
    backgroundColor: theme.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(theme.colorNeutralStrokeDisabled),
    color: theme.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      backgroundColor: theme.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(theme.colorNeutralStrokeDisabled),
      color: theme.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',
    },

    ':active': {
      backgroundColor: theme.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(theme.colorNeutralStrokeDisabled),
      color: theme.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',
    },
  }),

  // Appearance variations
  outline: theme => ({
    backgroundColor: theme.colorTransparentBackground,

    ':hover': {
      backgroundColor: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      backgroundColor: theme.colorTransparentBackgroundPressed,
    },
  }),
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
  // base: theme => createFocusOutlineStyle(theme),
  // circular: theme =>
  //  createFocusOutlineStyle(theme, { style: { outlineRadius: theme.global.borderRadius.circular } }),
  // primary: theme => createFocusOutlineStyle(theme, { style: { outlineOffset: '2px' } }),
  // square: theme => createFocusOutlineStyle(theme, { style: { outlineRadius: theme.global.borderRadius.none } }),

  base: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderColor('transparent'),
    outlineColor: 'transparent',
    outlineWidth: '2px',
    outlineStyle: 'solid',
    boxShadow: `
      ${theme.shadow4},
      0 0 0 2px ${theme.colorStrokeFocus2}
    `,
    zIndex: 1,
  })),

  circular: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderRadius(theme.borderRadiusCircular),
  })),
  rounded: {},
  // Primary styles
  primary: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderColor(theme.colorNeutralForegroundOnBrand),
    boxShadow: `${theme.shadow2}, 0 0 0 2px ${theme.colorStrokeFocus2}`,
  })),
  square: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderRadius(theme.borderRadiusNone),
  })),

  // Size variations
  small: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderRadius(theme.borderRadiusSmall),
  })),
  medium: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderRadius(theme.borderRadiusMedium),
  })),
  large: createCustomFocusIndicatorStyle(theme => ({
    ...shorthands.borderRadius(theme.borderRadiusLarge),
  })),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    ...shorthands.padding(buttonSpacing.smaller),

    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    ...shorthands.padding(buttonSpacing.smaller),

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    ...shorthands.padding(buttonSpacing.small),

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

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, block, disabled, disabledFocusable, iconOnly, shape, size } = state;

  state.root.className = mergeClasses(
    buttonClassName,

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
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[size], state.icon.className);
  }

  return state;
};
