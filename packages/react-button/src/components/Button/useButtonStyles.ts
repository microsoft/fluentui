import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ButtonState } from './Button.types';

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
  base: theme => ({
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'middle',

    margin: 0,

    maxWidth: '280px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    background: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground1,

    borderColor: theme.colorNeutralStroke1,
    borderStyle: 'solid',
    borderWidth: theme.strokeWidthThin,

    fontFamily: theme.fontFamilyBase,

    outline: 'none',

    ':hover': {
      background: theme.colorNeutralBackground1Hover,
      borderColor: theme.colorNeutralStroke1Hover,
      color: theme.colorNeutralForeground1,

      cursor: 'pointer',
    },

    ':active': {
      background: theme.colorNeutralBackground1Pressed,
      borderColor: theme.colorNeutralStroke1Pressed,
      color: theme.colorNeutralForeground1,

      outline: 'none',
    },
  }),
  small: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.smaller,
    padding: `0 ${buttonSpacing.medium}`,

    height: '24px',
    minWidth: '64px',

    borderRadius: theme.borderRadiusSmall,

    fontSize: theme.fontSizeBase200,
    fontWeight: theme.fontWeightRegular,
    lineHeight: theme.lineHeightBase200,
  }),
  medium: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.large}`,

    height: '32px',
    minWidth: '96px',

    borderRadius: theme.borderRadiusMedium,

    fontSize: theme.fontSizeBase300,
    fontWeight: theme.fontWeightSemibold,
    lineHeight: theme.lineHeightBase300,
  }),
  large: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.larger}`,

    height: '40px',
    minWidth: '96px',

    borderRadius: theme.borderRadiusMedium,

    fontSize: theme.fontSizeBase400,
    fontWeight: theme.fontWeightSemibold,
    lineHeight: theme.lineHeightBase400,
  }),
  block: {
    maxWidth: '100%',
    width: '100%',
  },
  circular: theme => ({
    borderRadius: theme.borderRadiusCircular,
  }),
  outline: theme => ({
    background: theme.colorTransparentBackground,

    ':hover': {
      background: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      background: theme.colorTransparentBackgroundPressed,
    },
  }),
  primary: theme => ({
    background: theme.colorBrandBackground,
    borderColor: 'transparent',
    color: theme.colorNeutralForegroundOnBrand,

    ':hover': {
      background: theme.colorBrandBackgroundHover,
      borderColor: 'transparent',
      color: theme.colorNeutralForegroundOnBrand,
    },

    ':active': {
      background: theme.colorBrandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.colorNeutralForegroundOnBrand,
    },
  }),
  subtle: theme => ({
    background: theme.colorSubtleBackground,
    borderColor: 'transparent',
    color: theme.colorNeutralForeground2,

    ':hover': {
      background: theme.colorSubtleBackgroundHover,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      background: theme.colorSubtleBackgroundPressed,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
  square: theme => ({
    borderRadius: theme.borderRadiusNone,
  }),
  transparent: theme => ({
    background: theme.colorTransparentBackground,
    borderColor: 'transparent',
    color: theme.colorNeutralForeground2,

    ':hover': {
      background: theme.colorTransparentBackgroundHover,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      background: theme.colorTransparentBackgroundPressed,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
  disabled: theme => ({
    background: theme.colorNeutralBackgroundDisabled,
    borderColor: theme.colorNeutralStrokeDisabled,
    color: theme.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      background: theme.colorNeutralBackgroundDisabled,
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',
    },

    ':active': {
      background: theme.colorNeutralBackgroundDisabled,
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',
    },
  }),
  disabledOutline: theme => ({
    background: theme.colorTransparentBackground,

    ':hover': {
      background: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      background: theme.colorTransparentBackgroundPressed,
    },
  }),
  disabledPrimary: {
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'transparent',
    },

    ':active': {
      borderColor: 'transparent',
    },
  },
  disabledSubtle: {
    background: 'none',
    borderColor: 'transparent',

    ':hover': {
      background: 'none',
      borderColor: 'transparent',
    },

    ':active': {
      background: 'none',
      borderColor: 'transparent',
    },
  },
  disabledTransparent: {
    background: 'none',
    borderColor: 'transparent',

    ':hover': {
      background: 'none',
      borderColor: 'transparent',
    },

    ':active': {
      background: 'none',
      borderColor: 'transparent',
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
    borderColor: 'transparent',
    outline: '2px solid transparent',
    boxShadow: `
      ${theme.shadow4},
      0 0 0 2px ${theme.colorStrokeFocus2}
    `,
    zIndex: 1,
  })),
  circular: createCustomFocusIndicatorStyle(theme => ({
    borderRadius: theme.borderRadiusCircular,
  })),
  primary: createCustomFocusIndicatorStyle(theme => ({
    borderColor: theme.colorNeutralForegroundOnBrand,
    boxShadow: `${theme.shadow2}, 0 0 0 2px ${theme.colorStrokeFocus2}`,
  })),
  square: createCustomFocusIndicatorStyle(theme => ({
    borderRadius: theme.borderRadiusNone,
  })),
});

const useRootIconOnlyStyles = makeStyles({
  small: {
    padding: buttonSpacing.smaller,

    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    padding: buttonSpacing.smaller,

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    padding: buttonSpacing.small,

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
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
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  state.className = mergeClasses(
    rootStyles.base,
    rootFocusStyles.base,
    rootStyles[state.size],
    state.block && rootStyles.block,
    state.shape === 'square' && rootStyles.square,
    state.shape === 'square' && rootFocusStyles.square,
    state.shape === 'circular' && rootStyles.circular,
    state.shape === 'circular' && rootFocusStyles.circular,
    state.appearance === 'outline' && rootStyles.outline,
    state.appearance === 'primary' && rootStyles.primary,
    state.appearance === 'primary' && rootFocusStyles.primary,
    state.appearance === 'subtle' && rootStyles.subtle,
    state.appearance === 'transparent' && rootStyles.transparent,
    (state.disabled || state.disabledFocusable) && rootStyles.disabled,
    (state.disabled || state.disabledFocusable) && state.appearance === 'outline' && rootStyles.disabledOutline,
    (state.disabled || state.disabledFocusable) && state.appearance === 'primary' && rootStyles.disabledPrimary,
    (state.disabled || state.disabledFocusable) && state.appearance === 'subtle' && rootStyles.disabledSubtle,
    (state.disabled || state.disabledFocusable) && state.appearance === 'transparent' && rootStyles.disabledTransparent,
    state.iconOnly && rootIconOnlyStyles[state.size],
    state.className,
  );

  state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);

  return state;
};
